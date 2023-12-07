import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );



const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshStandardMaterial( { color: 0xFFA500 } );
const cube = new THREE.Mesh( geometry, material );
cube.castShadow = true; //default is false
cube.receiveShadow = false; //default


scene.add( cube );

camera.position.z = 6;

const dir_light = new THREE.DirectionalLight(0xffffff, 5);
dir_light.position.set(1, 10, 10).normalize();
dir_light.castShadow = true; 
scene.add(dir_light);


dir_light.shadow.mapSize.width = 512; // default
dir_light.shadow.mapSize.height = 512; // default
dir_light.shadow.camera.near = 0.2; // default
dir_light.shadow.camera.far = 900; // default


const light = new THREE.PointLight( 0xFFA500);
light.position.set( 10, 0, 25 );
scene.add( light );


const plane_geo = new THREE.PlaneGeometry( 4, 4);
const plane_mat = new THREE.MeshStandardMaterial( {color: 0xfff332, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( plane_geo, plane_mat );
plane.rotateX(Math.PI / 180 * -80);
plane.position.set(0, -1, 0);
plane.receiveShadow = true;


scene.add( plane );

renderer.physicallyCorrectLights = true;


function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();

/*
// dat gui
let gui = new dat.GUI();
//dat.GUI.toggleHide();


let cameraGui = gui.addFolder("camera position");
cameraGui.add(camera.position, 'x');
cameraGui.add(camera.position, 'y');
cameraGui.add(camera.position, 'z');
cameraGui.open();


let lightGui = gui.addFolder("light position");
lightGui.add(dir_light.position, 'x');
lightGui.add(dir_light.position, 'y');
lightGui.add(dir_light.position, 'z');
lightGui.open();

let cubeGui = gui.addFolder("cube position");
cubeGui.add(cube.position, 'x');
cubeGui.add(cube.position, 'y');
cubeGui.add(cube.position, 'z');
cubeGui.open();

let planeGui = gui.addFolder("plane position");
planeGui.add(plane.position, 'x');
planeGui.add(plane.position, 'y');
planeGui.add(plane.position, 'z');
planeGui.open();

*/