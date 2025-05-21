export class Color {
    constructor(_r = 0, _g = 0, _b = 0) {
        this.r = _r;
        this.g = _g;
        this.b = _b;
    }

    set(_r, _g, _b) {
        this.r = _r;
        this.g = _g;
        this.b = _b;
    }
}


export class Vec3 {

    constructor(_x = 0.0, _y = 0.0, _z = 0.0) {
        this.x = _x;
        this.y = _y;
        this.z = _z;
    }

    set(_x, _y, _z) {
        this.x = _x;
        this.y = _y;
        this.z = _z;
    }

    length() {
        let x = this.x;
        let y = this.y;
        let z = this.z;
        return Math.sqrt(x*x + y*y + z*z);
    }

    normalize() {
        let l = 1.0 / this.length()
        his.x *= l;
        his.y *= l;
        his.z *= l;
    }

    normalized() {
        let l = 1.0 / this.length()
        let x = this.x * l;
        let y = this.y * l;
        let z = this.z * l;
        return new Vector3(x, y, z);
    }

    cross(other) {
        const v1 = this;
        const v2 = other;
        let x = v1.y * v2.z - v1.z * v2.y;
        let y = v1.z * v2.x - v1.x * v2.z;
        let z = v1.x * v2.y - v1.y * v2.x;
        return new Vec3(x, y, z);
    }

    dot(other) {
        return this.x * other.x + this.y * other.y + this.z * other.z; 
    }
}