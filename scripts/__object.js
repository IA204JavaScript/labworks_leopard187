import * as THREE from "./three.module.js";
import { getCamera } from "./__camera.js";


export class Object {
    #id
    #type
    #position
    #rotation
    #mesh
    #material
    #geometry

    constructor(id = "unknownObj", type="cube") {
        this.#id = id;
        this.#type = type;
        this.#position = new THREE.Vector3(0.0, 0.0, 0.0);
        this.#rotation = new THREE.Quaternion(0.0, 1.0, 0.0, 0.0);
        this.#mesh = null;
        this.#material = null;
        this.#geometry = null;
    }

    respawnObject() {
        let dist = getCamera().getDistance();

        let x = Math.random() * (dist * 1.5) - dist * 0.75;
        let y = Math.random() * (dist * 1.5) - dist * 0.75;
        let z = Math.random() * (dist * 1.5) - dist * 0.75;

        this.#position.set(x, y, z);
    }

    initRenderable(scene) {
        if(this.#type === "cube")
            this.#geometry = new THREE.BoxGeometry(1, 1, 1);

        if(this.#type === "cylinder")
            this.#geometry = new THREE.CylinderGeometry(0.5, 0.5, 1.0);

        if(this.#type === "sphere")
            this.#geometry = new THREE.SphereGeometry(0.5);

        let col = Math.floor(Math.random() * 0xffffff);
        let specPower = Math.random() * 100;
        let spec = Math.floor(Math.random() * 0xffffff);

        this.#material = new THREE.MeshPhongMaterial({
            color: col,
            specular: spec,
            shininess: specPower
        });
  
        this.#mesh = new THREE.Mesh(this.#geometry, this.#material);
        scene.add(this.#mesh);
    }

    remove(scene) {
        scene.remove(this.#mesh);
        //this.mesh.dispose();
        this.#material.dispose();
        this.#geometry.dispose();
    }

    getID() {
        return this.#id;
    }

    getType() {
        return this.#type;
    }

    getParsedType() {
        const map = {
            "cube" : "Куб",
            "cylinder" : "Цилиндр",
            "sphere" : "Сфера",
        };
        return map[this.type];
    }

    getPosition() {
        return this.#position;
    }

    getRotation() {
        return this.#rotation;
    }

    update() {
        const p = this.#position;
        const q = this.#rotation;

        this.#mesh.position.set(p.x, p.y, p.z);
        this.#mesh.quaternion.set(q.x, q.y, q.z, q.w);
    }
}

