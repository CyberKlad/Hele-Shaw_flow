class Liquid {
    /*
    Liquid particle class used for tracking position and path
    */

    // Private variables
    #verts; // [x1, y1, z1, r1, g1, b1, a1, x2, y2,..]
    #indices;
    #stride;
    #color_offset;
    #vert_offset;

    // Public variables

    // Constructor
    /*
    in {x} = x coordinate as a float
    in {y} = float as a float
    in {direction} = direction in degrees E = 0, N = 90, S = 270. Invalid range 90 - 270 exclusively
    in {velocity} = velocity as a float 
    */
    constructor() {
        this.#stride = 7; // number of floats in 1 vertex
        this.#color_offset = 3; // index of first color value
        this.#vert_offset = 0; // index of first vertex value
        // 100 x 100 grid point in a window going from -1 to 1 for both x and y
        const rows = 100;
        const cols = 100;
        const left = -1.0;
        const right = 1.0;
        const bot = -1.0;
        const top = 1.0;

        const row_spacing = (right - left) / (rows - 1);
        const col_spacing = (right - left) / (cols - 1);
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
        const mag = 0.001;
        // iterate over all of the verts
        for (let vert = 0; vert < this.#verts.length; vert += this.#stride) {
            let x_dif = x - this.#verts[vert];
            let y_dif = y - this.#verts[vert+1];

            let rad = Math.atan2(y_dif, x_dif); // angel of force
            let distance = Math.sqrt(x_dif * x_dif + y_dif * y_dif);
            let force = 1 * mag / distance * distance;
            this.#verts[vert] += force * Math.cos(rad);
            this.#verts[vert] += force * Math.sin(rad);
        }
    }

    addSource(x, y) {
        const mag = 0.001;
        // iterate over all of the verts
        for (let vert = 0; vert < this.#verts.length; vert += this.#stride) {
            let x_dif = x - this.#verts[vert];
            let y_dif = y - this.#verts[vert+1];

            let rad = Math.atan2(y_dif, x_dif); // angel of force
            let distance = Math.sqrt(x_dif * x_dif + y_dif * y_dif);
            let force = 1 * mag / distance * distance;
            this.#verts[vert] += force * Math.cos(rad);
            this.#verts[vert] += force * Math.sin(rad);
        }
    }

    // Static functions (WIP) 
}