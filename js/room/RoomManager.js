import { ResourceLoader } from './ResourceLoader.js';

class RoomManager{

    constructor (camera) {
        
        this.room = new THREE.Object3D();
        this.room.scale.set(3,3,3);
        this.url = "assets/room_split/";
        this.camera = camera;
        this.roomScene;

    }

    async loadFirstResource() {

        return

    }

    async loadNextResource() {

        // const json = await this.loadJSON(`${this.url}test.json`);
        // const list = json.list;
        // const mapsIndex = json.mapsIndex;
        var scope=this;


        const modelLoader = new THREE.GLTFLoader();    
        for(var i=536;i<=543;i++){
            modelLoader.load(this.url+i+".glb", gltf => {
                scope.room.add(gltf.scene.children[0])
            } );
        }
        setTimeout(()=>{
            for(var i=0;i<=50;i++){
                modelLoader.load(this.url+i+".glb", gltf => {
                    scope.room.add(gltf.scene.children[0])
                } );
            }
        },100)
        setTimeout(()=>{
            for(var i=51;i<=250;i++){
                modelLoader.load(this.url+i+".glb", gltf => {
                    scope.room.add(gltf.scene.children[0])
                } );
            }
        },500)
        // setTimeout(()=>{
        //     for(var i=251;i<=535;i++){
        //         modelLoader.load(this.url+i+".glb", gltf => {
        //             scope.room.add(gltf.scene.children[0])
        //         } );
        //     }
        // },2500)

        // for(var i=0;i<544;i++){
        //     modelLoader.load(this.url+i+".glb", gltf => {
        //         scope.room.add(gltf.scene.children[0])
        //     } );
        // }

        // setTimeout(()=>{
        //     console.log("开始加载贴图")
        //     for(var id in meshs){
        //         var arr=meshs[id]

        //     }
        //     for(var id in config0){
        //         var number=config0[id]
        //         var texture=new THREE.TextureLoader().load(
        //             this.url+number+".jpg"
        //         )
        //         texture.wrapS = THREE.RepeatWrapping;
        //         texture.wrapT = THREE.RepeatWrapping;
        //         var material = new THREE.MeshBasicMaterial({ map: texture });
        //         //var t=await loadTexture( this.url+number+".jpg" )
        //         console.log(material)
        //         var arr=meshs[id]

        //         for(var k=0;k<arr.length;k++)
        //             arr[k].material=material


        //     }
        // },1000)




        // {
        //     var flag=0
        //     var test_config={}
        //     function next(){
        //         if(flag>=544){
        //             console.log(test_config)
        //             return
        //         }
        //         // console.log(scope.url+flag+".gltf")
        //         modelLoader.load(scope.url+flag+".gltf", gltf => {
        //             //console.log( gltf );
        //             var node=gltf.scene.children[0]
        //             test_config[node.name]=flag
        //             console.log(flag)
        //             flag++
        //             next()
        //         } );
        //     }next()
        // }
        



        // this.roomScene.traverse(node => { // 设置material
        //     if (node instanceof THREE.Mesh) {

        //         node.receiveShadow = true; // 阴影
        //         const textureIndex = parseInt(list[node.name]);
        //         if (mapsIndex[textureIndex]) {
        //             this.loadTexture(`${this.url}ConferenceRoom${textureIndex}.jpg`).then(texture => {
        //                 texture.wrapS = THREE.RepeatWrapping;
        //                 texture.wrapT = THREE.RepeatWrapping;
        //                 node.material = new THREE.MeshBasicMaterial({ map: texture });
        //             })
        //         }

        //     }
        // });

    }

    async loadOtherResource() {

        const resourceLoader = new ResourceLoader(
            this.url,
            this.camera,
            gltf => { }
        );
        this.room.add(resourceLoader.object);

    }


    loadGLB( path ) {

        return new Promise( (resolve, reject) => { 
            const modelLoader = new THREE.GLTFLoader();
            modelLoader.load( path, gltf => {
                resolve( gltf );
            } );
        } );

    }

    loadJSON( path ) {

        return new Promise( (resolve, reject) => { 
            const loader = new THREE.FileLoader();
            loader.load( path, data => {
                const json = JSON.parse( data );
                resolve( json );
            } );
        } );

    }

    loadTexture( path ) {

        return new Promise( (resolve, reject) => {
            new THREE.TextureLoader().load(
                path,
                texture => { // onLoad
                    resolve( texture );
                }, 
                null, // onProgress
                error => reject( error ) // onError
            )
        });
        
    }

}

export { RoomManager };
