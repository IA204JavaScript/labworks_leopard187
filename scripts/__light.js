import { Vec3, Color } from "./__mymath.js";


class Light {
    #ambientLight
    #diffuseLight
    #direction

    constructor () {
        this.#ambientLight = 0x404040;
        this.#diffuseLight = 0xffffff;
        this.#direction = new Vec3(0.2, 0.08, 0.4);
    }

    getAmbientColor() {
        return this.#ambientLight;
    }

    getDiffuseColor() {
        return this.#diffuseLight;
    }

    setAmbientColor(rgb) {
        this.#ambientLight = rgb;
    }

    setDiffuseColor(rgb) {
        this.#diffuseLight = rgb;
    }

    resetAmbientColor() {
        this.#ambientLight = 0x404040;
    }

    resetDiffuseColor() {
        this.#diffuseLight = 0xffffff;
    }

    getDirection() {
        return this.#direction;
    }

    updateDirection(x, y, z) {
        this.#direction.set(x, y, z);
    }

    resetDirection() {
        this.#direction.set(0.2, 0.8, 0.4);
    }

    updateLight() {
        
    }

    updateDirection() {
        this.#direction.x = document.getElementById("lightDirX").value;
        this.#direction.y = document.getElementById("lightDirY").value;
        this.#direction.z = document.getElementById("lightDirZ").value;
    }
}


const lighting = new Light();


export function getLighting() {
    return lighting;
} 