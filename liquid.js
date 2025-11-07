class Liquid {
    /*
    Liquid particle class used for tracking position and path
    */

    // Private variables
    #x;
    #y;
    #direction;
    #velocity;
    #last_update;
    #updates

    // Public variables

    // Constructor
    /*
    in {x} = x coordinate as a float
    in {y} = float as a float
    in {direction} = direction in degrees E = 0, N = 90, S = 270. Invalid range 90 - 270 exclusively
    in {velocity} = velocity as a float 
    */
    constructor(x, y, direction, velocity){
        this.#x = [x]; // array to keep track of all previous positions
        this.#y = [y]; // array to keep track of all previous positions
        if (direction < 270 && direction > 90) {
            this.#direction = 0;
            console.log("Liquid Constructor Warning: invalid direction set. changing to default.");
        } else this.#direction = direction;
        if (velocity <= 0) {
            this.#velocity = 1;
            console.log("Liquid Constructor Warning: invalid velocity set. changing to default.");
        } else this.#velocity = velocity;
        this.#last_update = Date.now();
        this.#updates = 0;
    }

    // Getters
    getCoord(){
        return (this.#x, this.#y);
    }

    getDirection(){
        return this.#direction;
    }

    getVelocity(){
        return this.#velocity;
    }

    getLastUpdate(){
        return this.#last_update
    }

    // Class methods
    update(){
        // time since last update in seconds
        let time_delta = (Date.now() - this.#last_update) / 1000.0;
        let new_x = this.#x[this.#updates] + Math.cos(this.#direction) * this.#velocity * time_delta;
        let new_y = this.#y[this.#updates] + Math.cos(this.#direction) * this.#velocity * time_delta;

        this.#last_update = this.#time.getSeconds();
        this.#updates += 1;
        this.#x.push(new_x);
        this.#y.push(new_y);
    }

    // Static functions
    /*
    in {start} = x value for all liquid particles
    in {top} = y value for top of wall
    in {bot} = y value for bottom of wall
    in {direction} = direction of every liquid particle
    in {velocity} = velocity of every liquid particle
    */
    static wall(start, top, bot, count, direction, velocity){
        if (direction < 270 && direction > 90) {
            console.log("Liquid.wall Error: invalid direction set.");
            return null;
        }
        if (velocity <= 0) {
            console.log("Liquid.wall Error: invalid velocity set.");
            return null;
        }
        let liquid_wall = [];
        let delta = top - bot;
        for (let i = 0; i < count; i++) {
            let y = i * delta / (count - 1) + bot;
            liquid_wall.push(new Liquid(start, y, direction, velocity));
        }
        return liquid_wall;
    }   
}