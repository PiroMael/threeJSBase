import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import Stats from 'three/examples/jsm/libs/stats.module';
let controls;
let InPortal = false;
let moveForward = false;
			let moveBackward = false;
			let moveLeft = false;
			let moveRight = false;
const createScene = () => {
  const stats = Stats()



    const canva = document.getElementById("bg");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight , 0.1,1000);
    const loader = new GLTFLoader();
    const clock = new THREE.Clock();
    const clock2 = new THREE.Clock();
  
    
    const params = {
      exposure: 0.945,
      bloomStrength: 2.373,
      bloomThreshold: 0,
      bloomRadius:1
    };
    
    
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg'), antialias: true ,alpha: true
        
      });
      
      
        renderer.setSize(window.innerWidth, window.innerHeight);
        /* renderer.outputEncoding = THREE.sRGBEncoding; */
        
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type=THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ReinhardToneMapping;
        renderer.toneMappingExposure=0.9485;
			
        renderer.physicallyCorrectLights = true;
        renderer.alpha = true;


        const composer = new EffectComposer( renderer );

        const renderPass = new RenderPass( scene, camera );
        composer.addPass( renderPass );

          

          const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
          bloomPass.threshold = params.bloomThreshold;
          bloomPass.strength = params.bloomStrength;
          bloomPass.radius = params.bloomRadius;
          
          composer.addPass( bloomPass );

      
        function teleport(){
          if (camera.position.x>=-5.7 && camera.position.x<=3.85 && camera.position.z>=-2.6 && camera.position.z<=1.83){
            window.location.href = "https://thepurpulearkportal.herokuapp.com/wall";
          }
        }
      


       

        controls = new FirstPersonControls( camera, renderer.domElement );

		controls.movementSpeed = 40;
		controls.lookSpeed = 0.045;
		controls.lookVertical = false;
        controls.enableZoom = false;
        
       
        
        //controls.update() must be called after any manual changes to the camera's transform
        camera.position.set( 0, 16, 150 );
        

         
        
        function animate() {
          
          requestAnimationFrame( animate );
          
          
          render();
          stats.update();
          teleport(); 
        }
        
        function render() {
          controls.update(clock2.getDelta() );
          composer.render();
            
        }
        

animate();


}




const initHomePage = () => {

  if (document.querySelector('#bg')) {
    createScene();
  }
}


export { initHomePage };