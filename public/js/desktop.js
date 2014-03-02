

(function(){
    var orientEvent = document.createEvent('Event');
    orientEvent.initEvent('orient');

    socket.on('orient', function(data){
        orientEvent.data = data;
        document.dispatchEvent(orientEvent);
    });

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
    camera.position.z = 30;

    //Lighting
    var ambient = new THREE.AmbientLight( 0x101010 );
    scene.add( ambient );

    var directionalLight1 = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight1.position.set( 1, 2, 3 ).normalize();
    scene.add( directionalLight1 );

    var directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.25 );
    directionalLight2.position.set( -2, -2, -3 ).normalize();
    scene.add( directionalLight2 );

    //The Box
    var geometry = new THREE.CubeGeometry(30,10,10,20,20,20);
    var material = new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.SmoothShading } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );


    //Init renderer and run
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var r = 0;
    function render() {
        requestAnimationFrame(render);

//        camera.position.x += ( mouseX/10 - camera.position.x ) * .5;
//        camera.position.y += ( -mouseY/10 - camera.position.y ) * .5;

        camera.lookAt( scene.position );

//        r += 0.05;
//        if (parseInt(r*100) % 10 == 0) {
//            console.log(mouseX, mouseY);
//        }

//            cube.rotation.x += 0.01;
//            cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    render();

    document.addEventListener('orient', onOrient, false);
    function onOrient(evt) {
//        console.log('onOrient: ', evt.data);
        cube.rotation.x = evt.data.beta * 0.01;
        cube.rotation.z = evt.data.gamma * 0.01;
    }


//    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
//    function onDocumentMouseMove( event ) {
//        mouseX = ( event.clientX - windowHalfX );
//        mouseY = ( event.clientY - windowHalfY );
//    }

})();

window.addEventListener('load', function(event){

});
