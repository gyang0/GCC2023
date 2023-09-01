var BOILERPLATE = (function(){
    /**
     * Creates a shader given a type and source code
     * @param gl - The WebGL2 context
     * @param type - Type of shader (gl.VERTEX_SHADER or gl.FRAGMENT_SHADER)
     * @param source - Source code for shader
     */ 
	function createShader(gl, type, source){
		var shader = gl.createShader(type);
		gl.shaderSource(shader, source);
		gl.compileShader(shader);

		var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if(!success){
           console.log("createShader(): " + gl.getShaderInfoLog(shader));
            return undefined;
        }

		return shader;
	}


    /**
     * Creates a program from the shader source codes
     * @param gl - The WebGL2 context
     * @param vertexShader - Source code for the vertex shader
     * @param fragmentShader - Source code for the fragment shader
     */ 
	function createProgram(gl, vertexShader, fragmentShader){
		var program = gl.createProgram();
		gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        var success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if(!success){
            console.log("createProgram(): " + gl.getProgramInfoLog(program));
            return undefined;
        }

        return program;
	}


    /**
     * The boring-and-hard stuff
     * Creating the screen, making the shaders, etc.
     * 
     * @param gl - The WebGL2 context
     * @param vertexShaderSource - Source code for vertex shader
     * @param fragmentShaderSource - Source code for fragment shader
     * @param canvas - The 2D canvas context
     */ 
	function init(gl, vertexShaderSource, fragmentShaderSource, canvas){
		var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

        // Link shaders
        var program = createProgram(gl, vertexShader, fragmentShader);

        var positionAttribLocation = gl.getAttribLocation(program, "a_position");
        var positionBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        // These coordinates form a rectangle (made up of two triangles)
        // That rectangle is the screen. Individual pixels will be colored later.
        var positions = [
            -1, -1,  1, -1,  1,  1,
            -1, -1,  1,  1, -1,  1
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        var vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        gl.enableVertexAttribArray(positionAttribLocation);
        gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, false, 0, 0);

        // Canvas
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.useProgram(program);
        gl.bindVertexArray(vao);


        // Set screen size
        var u_resolutionLoc = gl.getUniformLocation(program, "u_resolution");
        gl.uniform2f(u_resolutionLoc, canvas.width, canvas.height);
	}


    /**
     * Fireworks
     * @param gl - The WebGL2 context
     */
	function run(gl){
    	gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
	}


	return {
		createShader: createShader,
		createProgram: createProgram,
		init: init,
		run: run
	};
})();