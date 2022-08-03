import { AvatarManager } from './avatar/AvatarManager.js';
import { SeatManager } from './avatar/SeatManager.js';
import { RoomManager } from './room/RoomManager.js';
import { MoveManager } from './lib/playerControl/MoveManager.js';
// import { Sky } from './lib/Sky.js';
import {Blur}from'./Blur.js'
import {MyUI} from "./MyUI.js"
class Main {

    constructor() {

        this.VR = false;
        this.showFPS = true;
        this.fpsInterval;
        this.scene = new THREE.Scene();
        this.camera;
        this.renderer;
        this.stereoEffect;
        this.winWidth = window.innerWidth;
        this.winHeight = window.innerHeight;

        this.roomManager;
        this.seatManager;
        this.avatarManager

        this.initCamera();
        this.initLight();
        this.initRenderer();


    }

    async initScene() {

        let scope = this;

        //this.roomManager = new RoomManager(this.camera);
        this.seatManager = new SeatManager();
        this.avatarManager = new AvatarManager(this.seatManager.positions, this.camera);
        window.c=this.camera

        //this.scene.add(this.roomManager.room);
        this.scene.add(this.seatManager.chairs);
        this.scene.add(this.avatarManager.avatar);

        //生成天空盒子
        this.scene.background = new THREE.CubeTextureLoader()
        .setPath( './sky/' )
        .load( ["home1_right.jpg","home1_left.jpg",  "home1_top.jpg", "home1_bottom.jpg", "home1_front.jpg", "home1_back.jpg"] );
        // .load( ["home1_left.jpg", "home1_right.jpg", "home1_top.jpg", "home1_bottom.jpg", "home1_front.jpg", "home1_back.jpg"] );


        // 加载顺序
        await this.avatarManager.init();
        await this.avatarManager.createSuperLowAvatar(); // 人物低模
        await this.avatarManager.createLowAvatar(); // 人物低模
        // //开始加载建筑模型
        this.roomManager = new RoomManager(this.camera);
        this.scene.add(this.roomManager.room);
        this.roomManager.loadNextResource(); // 会议室其他
        this.avatarManager.createMediumAvatar(); // 人物中模
        this.avatarManager.createHighAvatar(); // 人物高模

        new THREE.GLTFLoader().load("assets/model/room/Stadium_00.gltf", (glb) => {
            var scene=glb.scene.children[0]
            scene.scale.set(0.03,0.03,0.03)
            scope.scene.add(scene)
            this.roomManager.room.visible=false
        });
        
        
        new Blur(()=>{
            var myVideoManager = new VideoManager();
            myVideoManager.init();
            myVideoManager.setPlay()
            scope.createUI()
            //scope.preview()
            
        })




    }
    createUI(){
      //开始设置UI界面
      var ui=new MyUI()
      var inf1 = {
          'goal':0,
          'south':1,
          'north':2,
          'upper':3
        }
      var config = [
          {boardPos:[118.7,75,104.9]},
          {boardPos:[-196.3,90,58.4]},
          {boardPos:[59.9,100,-33.3]},
          {boardPos:[79.3,90,-92.4]},
          {boardPos:[0,0,0]}
        ]
        var width=window.innerWidth
        var height=window.innerHeight
        var names1=Object.keys(inf1)
        for(let i=0; i<names1.length; i++){
          new ui.Button(names1[i], "#D4D80B", '#DAA520', '#FFFACD',
              height/60, 10,//size,radius,
              width/12, height/20,
              width/96,(13.5-i)*(height/15),()=>{
                console.log("inf",names1[i])
                // if(names1[i]==="外景")
                //   self.playerControl.mode=1
                // else 
                //   self.playerControl.mode=0
                var id = inf1[names1[i]]
                //console.log(id)
                window.c.position.copy(camera_pos[id])
                window.c.lookAt(camera_rot[id])
                // this.wanderControl.wander = false
              });
        }
        var Vector3=THREE.Vector3
        var camera_pos = [
          new Vector3( -0.7400343181071783,  9.718239787414317, 169.34761528254484),
          new Vector3( -162.68168725619105,  31.26025425315106,  100.63366229746079),
          new Vector3(178.94541626045418,  42.061065448625605,  -11.110832513115913),
          new Vector3(9.34175647392836,  207.76879152103572,  -12.10688779256698),
        ]
        var camera_rot = [
          new Vector3(-0.2601206104024833, 0.03248614167513133,  0.008644473026735171),
          new Vector3(-0.4674049841338932,  -0.9086817950634039,  -0.37883135154320663),
          new Vector3(-2.189391044618577, 1.0594966505357175,  2.2553196728503258),
          new Vector3(-1.5689219369616383,  0.05647282313255556,  1.5375998325732279),
        ]
            //inf1
  var strs=Object.keys(inf1)
  var nums=Object.values(inf1)
  for(var i=0;i<config.length;i++){
    if(!config[i].boardPos[0]&&!config[i].boardPos[1]&&!config[i].boardPos[2])
      continue;
    config[i].boardName=strs[i]
    var camera_pos0=camera_pos[ nums[i] ]
    var camera_rot0=camera_rot[ nums[i] ]
    config[i].camera=[
      camera_pos0.x,
      camera_pos0.y,
      camera_pos0.z,
      camera_rot0.x,
      camera_rot0.y,
      camera_rot0.z]
  }
    }

    preview() {
        let movePath = [
            [-145.67,127.24,201.57,   -0.98585,-0.42482,-0.55668,200],
            [-91.99,47.68,-120.65,-2.44649,-0.73367,-2.63231,600],
            [135.29,20.23,-142.86,-1.16107,-1.34939,-1.15196,600],
            [140.22,24.26,131.4,-1.16107,-1.34939,-1.15196,2400],
            [87.74,21.47,189.88,-0.31755,0.59461,0.18207,200],
            [-145.67,127.24,201.57,-0.98585,-0.42482,-0.55668,200],
        ];

        let funcArr = new Array( movePath.length );
        funcArr[3] = function() { 
        }
        funcArr[ movePath.length - 1 ] = function() {
        }
        new MoveManager(this.camera, movePath, funcArr);

    }

    initCamera() {

        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.camera.position.set( -145.67,127.24,201.57);
        this.camera.rotation.set( -0.98585,-0.42482,-0.55668 );

    }

    initLight() {

        const ambientLight = new THREE.AmbientLight( 0xffffff , 1 );
        this.scene.add( ambientLight );

        const pointLight = new THREE.PointLight( 0xffffff, 1 );
        pointLight.position.set( 0, 40.97, 0 );
        pointLight.rotation.set( 0, Math.PI / 2, 0 );

        pointLight.castShadow = true;
        pointLight.shadow.camera.near = 1200;
        pointLight.shadow.camera.far = 2500;
        pointLight.shadow.bias = 0.0001;

        pointLight.shadow.mapSize.width = this.winWidth;
        pointLight.shadow.mapSize.height = this.winHeight;

        this.scene.add( pointLight );
    }

    initRenderer() {

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( this.winWidth, this.winHeight );
        document.body.appendChild( this.renderer.domElement );

        // this.renderer.shadowMap.enabled = true;
        // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.autoClear = false;
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        if ( this.VR ) this.stereoEffect = new THREE.StereoEffect( this.renderer );

    }

    render() {

        let scope = this;
        let frameIndex = 0, frameIndexPre = 0;
        const tag = document.getElementById("fps");
        window.tag=tag
        //tag.style.visibility='hidden';

        render();
        
        if (this.showFPS) this.fpsInterval = setInterval(computeFPS, 1000);

        function render() {
            frameIndex++;
            if( scope.avatarManager ) scope.avatarManager.updateLOD();
            if( scope.VR ) scope.stereoEffect.render(scope.scene, scope.camera);
            else scope.renderer.render(scope.scene, scope.camera);
            if ( window.innerWidth != scope.winWidth || window.innerHeight != scope.winHeight ) onResize();
            requestAnimationFrame( render );
        }
        // setTimeout(()=>{
        //     scope.avatarManager.updateLOD();
        //     console.log("scope.avatarManager.updateLOD();")
        // },1500)

        function computeFPS() {
            tag.innerHTML = (frameIndex - frameIndexPre);
            frameIndexPre = frameIndex;
        }

        function onResize() {
            scope.winWidth = window.innerWidth;
            scope.winHeight = window.innerHeight;

            scope.camera.aspect = scope.winWidth / scope.winHeight;
            scope.camera.updateProjectionMatrix();

            scope.renderer.setSize( scope.winWidth, scope.winHeight );
        }

    }

    stopShowFPS() {

        this.showFPS = false;
        clearInterval(this.fpsInterval);

    }
}

export { Main };
