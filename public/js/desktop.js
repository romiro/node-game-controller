socket.on('orient', function(data){
    log(data);
});

(function(){
    var height = window.innerHeight;
    var width = window.innerWidth;

    var mouseX = 0, mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    var render_canvas = 1, render_gl = 1;
    var has_gl = 0;

    var bcanvas = document.getElementById( "rcanvas" );
    var bwebgl = document.getElementById( "rwebgl" );

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
    camera.position.z = 15;

    var ambient = new THREE.AmbientLight( 0x101010 );
    scene.add( ambient );

    var directionalLight = new THREE.DirectionalLight( 0xff7777, 0.5 );
    directionalLight.position.set( 1, 1, 2 ).normalize();
    scene.add( directionalLight );

    var pointLight = new THREE.PointLight( 0xffaa00, 10 );
    pointLight.position.set( 0, 0, 0 );
    scene.add( pointLight );

    var sphere = new THREE.SphereGeometry( 100, 16, 8, 1 );
    var lightMesh = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) );
    lightMesh.scale.set( 0.5, 0.5, 0.5 );
    lightMesh.position = pointLight.position;
    scene.add( lightMesh );


    var geometry = new THREE.CubeGeometry(10,10,10,20,20,20);
    var material = new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.SmoothShading } );

    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );



    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var r = 0;
    function render() {
        requestAnimationFrame(render);

        camera.position.x += ( mouseX/10 - camera.position.x ) * .5;
        camera.position.y += ( -mouseY/10 - camera.position.y ) * .5;

        camera.lookAt( scene.position );

        lightMesh.position.x = 200 * Math.cos( r );
        lightMesh.position.z = 200 * Math.sin( r );
        lightMesh.position.y = Math.sin(r*10) * 15;

        r += 0.05;
        if (parseInt(r*100) % 10 == 0) {
            console.log(mouseX, mouseY);
        }

    //        cube.rotation.x += 0.01;
    //        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    render();

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );

    function onDocumentMouseMove( event ) {

        mouseX = ( event.clientX - windowHalfX );
        mouseY = ( event.clientY - windowHalfY );
//        console.log('X',event.clientX ,windowHalfX,mouseX);
//        console.log('Y',event.clientY ,windowHalfY,mouseY);
    }

})();
window.addEventListener('load', function(event){

});
