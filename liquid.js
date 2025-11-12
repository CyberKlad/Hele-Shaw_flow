class Liquid {
    /*
    Liquid particle class used for tracking vertices and indices of liquid flow points
    */

    // Private variables
    #verts; // [x1, y1, z1, r1, g1, b1, a1, x2, y2,..]
    #indices;
    #stride;
    #color_offset;
    #vert_offset;

    // Public variables (None ATM)

    constructor() {
        this.#stride = 7; // number of floats in 1 vertex
        this.#color_offset = 3; // index of first color value
        this.#vert_offset = 0; // index of first vertex value

        // 100 x 100 grid point in a window going from -1 to 1 for both x and y
        const rows = 50;
        const cols = 1000;
        const left = -1.1;
        const right = 1.1;
        const bot = -1.1;
        const top = 1.1;

        // spacing based on above info
        const row_spacing = (right - left) / (cols - 1);
        const col_spacing = (top - bot) / (rows - 1);

        // set verts and indices
        this.#verts = [];
        this.#indices = [];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                let x = col * row_spacing + left;
                let y = top - row * col_spacing;
                this.#verts.push(x, y, 0, 0, 0, 1, 1); // z = 0, RGBA = Blue
                this.#indices.push(row * cols + col); 
            }
            this.#indices.push(0xFFFF); // snip the indices gl.LINE_STRIP
        }
    }

    // Getters
    getVerts() {
        return this.#verts;
    }

    getIndices() {
        return this.#indices;
    }

    getStride() {
        return this.#stride * 4; // times 4 for the the bytes in a gl.FLOAT
    }

    getColorOffset() {
        return this.#color_offset * 4; // times 4 for the the bytes in a gl.FLOAT
    }

    getVertOffset() {
        return this.#vert_offset * 4; // times 4 for the the bytes in a gl.FLOAT
    }

    // Class methods
    addSink(x, y) {
        const mag = 0.1;
        // iterate over all of the verts
        for (let vert = 0; vert < this.#verts.length; vert += this.#stride) {
            let x_dif = x - this.#verts[vert];
            let y_dif = y - this.#verts[vert+1];

            let rad = Math.atan2(y_dif, x_dif); // angel of force
            let distance = Math.sqrt(x_dif * x_dif + y_dif * y_dif);
            // inverse square of distance to calculate force
            let force = mag / distance / distance;
            if (force > mag) force = mag;
            if (force > distance) force = distance;
            this.#verts[vert] += force * Math.cos(rad);
            this.#verts[vert+1] += force * Math.sin(rad);
        }
    }

    addSource(x, y) {
        const mag = 0.1;
        // iterate over all of the verts
        for (let vert = 0; vert < this.#verts.length; vert += this.#stride) {
            let x_dif = this.#verts[vert] - x;
            let y_dif = this.#verts[vert+1] - y;

            let rad = Math.atan2(y_dif, x_dif); // angel of force
            let distance = Math.sqrt(x_dif * x_dif + y_dif * y_dif);
            // inverse square of distance to calculate force
            let force = mag / distance / distance;
            if (force > mag) force = mag; 
            this.#verts[vert] += force * Math.cos(rad);
            this.#verts[vert+1] += force * Math.sin(rad);
        }
    }

    createAndLoadVertex(gpu) {
        let current_buffer = gpu.getParameter(gpu.ARRAY_BUFFER_BINDING);
    
        let handle = gpu.createBuffer();
        gpu.bindBuffer(gpu.ARRAY_BUFFER, handle);
        gpu.bufferData(gpu.ARRAY_BUFFER, new Float32Array(this.#verts), gpu.STATIC_DRAW);

        gpu.bindBuffer(gpu.ARRAY_BUFFER, current_buffer);

        return handle;     
    }

    createAndLoadIndices(gpu) {
        let current_buffer = gpu.getParameter(gpu.ELEMENT_ARRAY_BUFFER_BINDING);
    
        let handle = gpu.createBuffer();
        gpu.bindBuffer(gpu.ELEMENT_ARRAY_BUFFER, handle);
        gpu.bufferData(gpu.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.#indices), gpu.STATIC_DRAW);

        gpu.bindBuffer(gpu.ELEMENT_ARRAY_BUFFER, current_buffer);

        return handle;    
    }

    // Static functions (WIP) 
}