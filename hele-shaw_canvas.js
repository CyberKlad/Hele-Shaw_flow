function drawHeleShaw(){
    let hs_canvas = document.getElementById('hele-shaw_canvas');
    let hs = hs_canvas.getContext('webgl2');

    let vertex_source = `#version 300 es
    precision mediump float;

    in vec3 coordinates;
    in vec4 color;

    out vec4 v_color;

    void main(void) { 
        gl_Position = vec4(coordinates, 1.0);
        v_color = color;
    }`

    let fragment_source = `#version 300 es
    precision mediump float;

    in vec4 v_color;

    out vec4 f_color;

    void main(void){
        f_color = v_color;
    }`

    // create program
    let program = hs.createProgram() 

    // compile vertex shader
    let vertex_shader = hs.createShader(hs.VERTEX_SHADER);
    hs.shaderSource(vertex_shader, vertex_source);
    hs.compileShader(vertex_shader);

    // compile fragment shader
    let frag_shader = hs.createShader( hs.FRAGMENT_SHADER );
    hs.shaderSource( frag_shader, fragment_source );
    hs.compileShader( frag_shader );

    // attach and link shaders
    hs.attachShader( program, vertex_shader );
    hs.attachShader( program, frag_shader );
    hs.linkProgram( program );

    // select program
    hs.useProgram(program);

    // defaults
    hs.clearColor( 100/255.0, 100/255.0, 100/255.0, 1.0 );
    hs.enable( hs.DEPTH_TEST );
    hs.enable( hs.BLEND );

    // create liquid
    let Water = new Liquid();

    let current_array_buf = 0;
    let attrib_location = 0;

    // Render loop
    function render(now){
        // Request another animation frame before starting
        window.requestAnimationFrame(render);

        // clear previous window
        hs.clear(hs.COLOR_BUFFER_BIT | hs.DEPTH_BUFFER_BIT);

        // bind indices
        hs.bindBuffer( hs.ELEMENT_ARRAY_BUFFER, Water.createAndLoadIndices(hs));

        // bind coordinates
        attrib_location = hs.getAttribLocation(program, "coordinates");
        current_array_buf = hs.getParameter(hs.ARRAY_BUFFER_BINDING);
        hs.bindBuffer(hs.ARRAY_BUFFER, Water.createAndLoadVertex(hs));
        hs.enableVertexAttribArray(attrib_location);
        hs.vertexAttribPointer(attrib_location, 3, hs.FLOAT, false, 28, 0);
        hs.bindBuffer(hs.ARRAY_BUFFER, current_array_buf);

        // bind color
        attrib_location = hs.getAttribLocation(program, "color");
        current_array_buf = hs.getParameter(hs.ARRAY_BUFFER_BINDING);
        hs.bindBuffer(hs.ARRAY_BUFFER, Water.createAndLoadVertex(hs));
        hs.enableVertexAttribArray(attrib_location);
        hs.vertexAttribPointer(attrib_location, 4, hs.FLOAT, false, 28, 12);
        hs.bindBuffer(hs.ARRAY_BUFFER, current_array_buf);

        // draw lines
        hs.drawElements( hs.LINE_STRIP, Water.getIndices.length, hs.UNSIGNED_SHORT, 0 );
    }
    window.requestAnimationFrame(render);
}

drawHeleShaw();
