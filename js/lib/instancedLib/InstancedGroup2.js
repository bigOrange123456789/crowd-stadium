class InstancedGroup2 {

    constructor(
        instanceCount,
        originMesh,
        animationUrl,
        textureUrl,
        textureCount,
        camera,
        positions
    ) {

        // this.mesh;
        this.instanceCount = instanceCount;
        this.originMesh = originMesh;
        this.animationUrl = animationUrl;
        this.textureUrl = textureUrl;
        this.textureCount = textureCount;
        this.camera = camera;
        this.position1=positions[0];
        this.position2=positions[1];

        this.clock = new THREE.Clock();
        this.ifAnimated = animationUrl;
        this.dummy = new THREE.Object3D();

        // matrix
        this.mcol0;
        this.mcol1;
        this.mcol2;
        this.mcol3;

        this.speed; // 动画速度
        this.animationType; // 动画类型
        this.textureType; // 身体贴图类型 vec4
        this.textureFaceType; // 面部贴图类型 vec4
        this.bodyScale; // 身体各部位缩放比例

        // body 每个身体部位对应的贴图uv坐标位置
        this.body = {
            head: [],
            hand: [],
            bottom: []
        }

        // shader
        if (this.ifAnimated) this.vertURL = "shader/mdediumVerxtexShader.vert";
        else this.vertURL = "shader/lowVertexShader.vert"
        this.fragURL = "shader/highFragmentShader.frag";

    }

    async init() {

        this.originMesh.geometry = this.originMesh.geometry.toNonIndexed();

        this.mcol0 = new THREE.InstancedBufferAttribute(new Float32Array(this.instanceCount * 3), 3);
        this.mcol1 = new THREE.InstancedBufferAttribute(new Float32Array(this.instanceCount * 3), 3);
        this.mcol2 = new THREE.InstancedBufferAttribute(new Float32Array(this.instanceCount * 3), 3);
        this.mcol3 = new THREE.InstancedBufferAttribute(new Float32Array(this.instanceCount * 3), 3);
        this.textureType = new THREE.InstancedBufferAttribute(new Uint8Array(this.instanceCount * 4), 4);
        this.textureFaceType = new THREE.InstancedBufferAttribute(new Uint8Array(this.instanceCount * 4), 4);
        if (this.ifAnimated) {
            this.speed = new THREE.InstancedBufferAttribute(new Float32Array(this.instanceCount), 1);
            this.animationType = new THREE.InstancedBufferAttribute(new Uint8Array(this.instanceCount), 1);
            this.bodyScale = new THREE.InstancedBufferAttribute(new Float32Array(this.instanceCount * 4), 4);
        }

        for (let i = 0; i < this.instanceCount; i++) {
            this.reset(i);
        }

        const material = await this.initMaterial();
        const geometry = this.initGeometry();
        const mesh = new THREE.InstancedMesh(geometry, material, this.instanceCount);
        mesh.castShadow = true; // 阴影
        mesh.receiveShadow = true;
        mesh.frustumCulled = false;
        this.mesh = mesh;

        return mesh;

    }

    async initMaterial() {

        const textureData = await this.loadTexture(this.textureUrl);
        const vertexShader = await this.loadShader(this.vertURL);
        const fragmentShader = await this.loadShader(this.fragURL);

        console.log("textureData",textureData)

        let material = new THREE.RawShaderMaterial();
        material.vertexShader = vertexShader;
        material.fragmentShader = fragmentShader;

        let uniforms = {
            textureCount: { value: this.textureCount },
            textureData: { value: textureData },
            headUV: { value: new THREE.Vector4(...this.body.head) },
            handUV: { value: new THREE.Vector4(...this.body.hand) },
            bottomUV: { value: new THREE.Vector4(...this.body.bottom) }
        };
        if (this.ifAnimated) {
            uniforms.time = { value: 0 };
            uniforms.boneCount = { value: 0 };
            uniforms.animationFrameCount = { value: 0 };
            uniforms.animationTexture = { value: new THREE.DataTexture(new Float32Array([0,0,0]), 1, 1, THREE.RGBFormat, THREE.FloatType) };
            uniforms.animationTextureLength = { value: 0 };
            this.initAnimation(uniforms); // 异步加载动画数据
        }
        material.uniforms = uniforms;
        material.side=2//双面渲染

        return material;

    }

    async initAnimation(uniforms) {

        const animations = await this.loadJSON(this.animationUrl);
        const boneCount = this.originMesh.skeleton.bones.length;
        const animationData = animations.animation.flat();
        const animationDataLength = animations.config.reduce((prev, cur) => prev + cur, 0); // sum
        const animationTextureLength = THREE.MathUtils.ceilPowerOfTwo( Math.sqrt(animationDataLength / 3) );

        uniforms.animationTexture.value.dispose();
        uniforms.time = { value: 0 };
        uniforms.boneCount = { value: boneCount };
        uniforms.animationFrameCount = { value: animations.config[0] / boneCount / 12 };
        uniforms.animationTexture = { value: this.array2Texture(animationData, animationTextureLength) }; // 将动画数据保存为图片Texture格式
        uniforms.animationTextureLength = { value: animationTextureLength };
        
        let scope = this;
        
        updateAnimation();

        function updateAnimation() {
            let time = Math.floor(10 * scope.clock.getElapsedTime());
            uniforms.time = { value: time % 60000 };
            uniforms.cameraPosition = { value: scope.camera.position };
            requestAnimationFrame(updateAnimation);
        }

    }

    initGeometry() {

        let geometry = new THREE.InstancedBufferGeometry();
        geometry.instanceCount = this.instanceCount;
        geometry.setAttribute('position', this.originMesh.geometry.attributes.position);
        //geometry.setAttribute('position', this.position1);
        geometry.setAttribute('position2', this.position2);
        geometry.setAttribute('inUV', this.originMesh.geometry.attributes.uv);
        geometry.setAttribute('normal', this.originMesh.geometry.attributes.normal);
        if (this.ifAnimated) {
            geometry.setAttribute('skinIndex', this.originMesh.geometry.attributes.skinIndex);
            geometry.setAttribute('skinWeight', this.originMesh.geometry.attributes.skinWeight);
            geometry.setAttribute('speed', this.speed);
            geometry.setAttribute('animationIndex', this.animationType);
            geometry.setAttribute('bodyScale', this.bodyScale);
        }

        geometry.setAttribute('mcol0', this.mcol0);
        geometry.setAttribute('mcol1', this.mcol1);
        geometry.setAttribute('mcol2', this.mcol2);
        geometry.setAttribute('mcol3', this.mcol3);

        geometry.setAttribute('textureIndex', this.textureType);
        geometry.setAttribute('textureFaceIndex', this.textureFaceType);

        return geometry;

    }

    loadJSON( path ) {

        return new Promise( (resolve, reject) => { 
            const animationLoader = new THREE.FileLoader();
            animationLoader.load( path, data => {
                const animationData = JSON.parse( data );
                resolve( animationData );
            } );
        } );

    }

    loadTexture(path) {

        return new Promise((resolve, reject)=> {
            new THREE.TextureLoader().load(
                path,
                texture => { // onLoad
                    texture.flipY = false;
                    resolve(texture);
                }, 
                null, // onProgress
                error => reject(error) // onError
            )
        });
        
    }

    loadShader(path) {

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onload =  () => resolve(xhr.responseText);
            xhr.onerror =  event => reject(event);
            xhr.open('GET', path);
            xhr.overrideMimeType("text/html;charset=utf-8");
            xhr.send();
        });

    }

    array2Texture(array, length) {

        let data = new Float32Array(length * length * 3); // RGB:3 RGBA:4
        data.set(array);
        let texture = new THREE.DataTexture(data, length, length, THREE.RGBFormat, THREE.FloatType);
        texture.needsUpdate = true;
        return texture;

    }

    getMatrix(avatarIndex) {

        let matrix = new THREE.Matrix4();
        matrix.set(
            this.mcol0.array[3 * avatarIndex], this.mcol1.array[3 * avatarIndex], this.mcol2.array[3 * avatarIndex], this.mcol3.array[3 * avatarIndex],
            this.mcol0.array[3 * avatarIndex + 1], this.mcol1.array[3 * avatarIndex + 1], this.mcol2.array[3 * avatarIndex + 1], this.mcol3.array[3 * avatarIndex + 1],
            this.mcol0.array[3 * avatarIndex + 2], this.mcol1.array[3 * avatarIndex + 2], this.mcol2.array[3 * avatarIndex + 2], this.mcol3.array[3 * avatarIndex + 2],
            0, 0, 0, 1
        );
        return matrix;
    }

    getPosition(avatarIndex) {

        return [this.mcol3.array[3 * avatarIndex], this.mcol3.array[3 * avatarIndex + 1], this.mcol3.array[3 * avatarIndex + 2]];

    }

    getRotation(avatarIndex) {

        let mat4 = this.getMatrix(avatarIndex);
        let position = new THREE.Vector3();
        let quaternion = new THREE.Quaternion();
        let scale = new THREE.Vector3();
        mat4.decompose(position, quaternion, scale);

        let euler = new THREE.Euler(0, 0, 0, 'XYZ');
        euler.setFromQuaternion(quaternion);
        return [euler.x, euler.y, euler.z];

    }

    getScale(avatarIndex) {

        let mat4 = this.getMatrix(avatarIndex);
        let position = new THREE.Vector3();
        let quaternion = new THREE.Quaternion();
        let scale = new THREE.Vector3();
        mat4.decompose(position, quaternion, scale);
        return [scale.x, scale.y, scale.z];

    }

    reset(avatarIndex) {

        this.mcol0.setXYZ(avatarIndex, 0.1, 0, 0);
        this.mcol1.setXYZ(avatarIndex, 0, 0.1, 0);
        this.mcol2.setXYZ(avatarIndex, 0, 0, 0.1);
        this.mcol3.setXYZ(avatarIndex, 0, 0, 0);

    }

    setMatrix(avatarIndex, matrix) {

        this.mcol0.array[3 * avatarIndex] = matrix.elements[0];
        this.mcol0.array[3 * avatarIndex + 1] = matrix.elements[1];
        this.mcol0.array[3 * avatarIndex + 2] = matrix.elements[2];

        this.mcol1.array[3 * avatarIndex] = matrix.elements[4];
        this.mcol1.array[3 * avatarIndex + 1] = matrix.elements[5];
        this.mcol1.array[3 * avatarIndex + 2] = matrix.elements[6];

        this.mcol2.array[3 * avatarIndex] = matrix.elements[8];
        this.mcol2.array[3 * avatarIndex + 1] = matrix.elements[9];
        this.mcol2.array[3 * avatarIndex + 2] = matrix.elements[10];

        this.mcol3.array[3 * avatarIndex] = matrix.elements[12];
        this.mcol3.array[3 * avatarIndex + 1] = matrix.elements[13];
        this.mcol3.array[3 * avatarIndex + 2] = matrix.elements[14];

    }

    setPosition(avatarIndex, pos) {

        this.mcol3.array[3 * avatarIndex] = pos[0];
        this.mcol3.array[3 * avatarIndex + 1] = pos[1];
        this.mcol3.array[3 * avatarIndex + 2] = pos[2];

    }

    setRotation(avatarIndex, rot) {
        
        let mat4 = this.getMatrix(avatarIndex);
        let position = new THREE.Vector3();
        let quaternion = new THREE.Quaternion();
        let scale = new THREE.Vector3();
        mat4.decompose(position, quaternion, scale);

        this.dummy.scale.set(scale.x, scale.y, scale.z);
        this.dummy.rotation.set(rot[0], rot[1], rot[2]);
        this.dummy.position.set(position.x, position.y, position.z);
        this.dummy.updateMatrix();

        this.setMatrix(avatarIndex, this.dummy.matrix);

    }

    setScale(avatarIndex, size) {

        let mat4 = this.getMatrix(avatarIndex);
        let position = new THREE.Vector3();
        let quaternion = new THREE.Quaternion();
        let scale = new THREE.Vector3();
        mat4.decompose(position, quaternion, scale);
        let euler = new THREE.Euler(0, 0, 0, 'XYZ');
        euler.setFromQuaternion(quaternion);

        this.dummy.scale.set(size[0], size[1], size[2]);
        this.dummy.rotation.set(euler.x, euler.y, euler.z);
        this.dummy.position.set(position.x, position.y, position.z);
        this.dummy.updateMatrix();

        this.setMatrix(avatarIndex, this.dummy.matrix);
        
    }

    setTexture(avatarIndex, type) { // 设置贴图类型
        
        this.textureType.array[avatarIndex * 4] = type[0]; // 大部分区域
        this.textureType.array[avatarIndex * 4 + 1] = type[1]; // 头部和手部
        this.textureType.array[avatarIndex * 4 + 2] = type[2]; // 裤子
        this.textureType.array[avatarIndex * 4 + 3] = type[3];
        this.textureType.needsUpdate = true;

    }

    setFaceTexture(avatarIndex, type) { // 设置贴图类型
        this.textureFaceType.needsUpdate = true;
        this.textureFaceType.array[avatarIndex * 4] = type[0]; // 大部分区域
        this.textureFaceType.array[avatarIndex * 4 + 1] = type[1]; // 头部和手部
        this.textureFaceType.array[avatarIndex * 4 + 2] = type[2]; // 裤子
        this.textureFaceType.array[avatarIndex * 4 + 3] = type[3];
        console.log(this.textureFaceType)
        //this.textureFaceType.needsUpdate = true;

    }

    setBodyScale(avatarIndex, scale) { // 设置身体部位缩放
        
        if (this.ifAnimated) {
            this.bodyScale.array[avatarIndex * 4] = scale[0]; 
            this.bodyScale.array[avatarIndex * 4 + 1] = scale[1]; 
            this.bodyScale.array[avatarIndex * 4 + 2] = scale[2]; 
            this.bodyScale.array[avatarIndex * 4 + 3] = scale[3];
            this.bodyScale.needsUpdate = true;
        }

    }

    setAnimation(avatarIndex, type) { // 设置动画类型

        if (this.ifAnimated) {
            this.animationType.array[avatarIndex] = type;
        }

    }

    setSpeed(avatarIndex, speed) { // 设置动画速度

        if (this.ifAnimated) {
            this.speed.array[avatarIndex] = speed;
        }

    }

    update() {

        this.mcol0.needsUpdate = true;
        this.mcol1.needsUpdate = true;
        this.mcol2.needsUpdate = true;
        this.mcol3.needsUpdate = true;
        this.textureType.needsUpdate = true;
        if (this.ifAnimated) {
            this.animationType.needsUpdate = true;
            this.speed.needsUpdate = true;
            this.bodyScale.needsUpdate = true;
        }
        
    }

    move(avatarIndex, dPos) {

        let pos = this.getPosition(avatarIndex);
        this.setPosition(avatarIndex, [pos[0] + dPos[0], pos[1] + dPos[1], pos[2] + dPos[2]]);

    }
    rotation(avatarIndex, dRot) {

        let rot = this.getRotation(avatarIndex);
        this.setRotation(avatarIndex, [rot[0] + dRot[0], rot[1] + dRot[1], rot[2] + dRot[2]]);

    }

}

export { InstancedGroup2 }