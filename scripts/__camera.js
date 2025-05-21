import { Vec3 } from "./__mymath.js";


class Camera {
    constructor() {
        this.dist = 5.0;
        this.eye = new Vec3(0.0, 0.0, this.dist);
        this.focus = new Vec3(0.0, 0.0, 0.0);
        this.up = new Vec3(0.0, 1.0, 0.0);
        this.right = this.focus.cross(this.up);
        this.angleY = 0.0;
        this.angleXZ = 0.0;
    }

    getEye() {
        return this.eye;
    }

    getFocus() {
        return this.focus;
    }

    getUp() {
        return this.up;
    }

    getRight() {
        return this.right;
    }

    getDistance() {
        return this.dist;
    }

    setDistance(dist) {
        this.dist = dist;
    }

    update(mouseMovedX, mouseMovedY) {
        let d = this.dist;
        let py = 0.0;
        let px = 0.0;
        let pz = 0.0;
        let radius = 0.0;

        this.angleY += mouseMovedY * 0.0025;
        this.angleXZ += mouseMovedX * 0.0025;

        py = Math.sin(this.angleY) * d;
        radius = Math.cos(this.angleY);

        px = Math.sin(-this.angleXZ) * d * radius;
        pz = Math.cos(this.angleXZ) * d * radius;

        this.eye.set(px, py, pz);
    }
}


const camera = new Camera();


export function getCamera() {
    return camera;
}