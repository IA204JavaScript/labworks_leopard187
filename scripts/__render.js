import * as THREE from "./three.module.js";
import * as Lighting from "./__light.js"
import * as Camera from "./__camera.js";
import { Object } from "./__object.js"
import { updateUI } from "./__ui.js";


const renderTarget = document.getElementById("renderTargetOutput");


class Render {
    #scene
    #renderer
    #camera
    #objects

    constructor() {
        this.#scene = new THREE.Scene();
        this.#renderer = new THREE.WebGLRenderer();
        this.#camera = new THREE.PerspectiveCamera(75, renderTarget.clientWidth / renderTarget.clientHeight, 0.1, 1000);
        this.#objects = [];
    }

    getRenderer() {
        return this.#renderer;
    }

    getCamera() {
        return this.#camera;
    }

    resizeTargets(width, height) {
        this.#camera.aspect = width / height;
        this.#camera.updateProjectionMatrix();
        this.#renderer.setSize(width, height);
    }

    initRender() {
        renderTarget.appendChild(this.#renderer.domElement);
        this.#renderer.setSize(renderTarget.clientWidth, renderTarget.clientHeight);

        this.ambient = new THREE.AmbientLight(0x404040);
        this.diffuse = new THREE.DirectionalLight(0xffffff);

        this.#scene.add(this.ambient);
        this.#scene.add(this.diffuse);

        this.addObject("initial", "sphere");
        updateUI();
    }

    update() {
        const eye = Camera.getCamera().getEye();
        const focus = Camera.getCamera().getFocus();
        
        this.#camera.position.set(eye.x, eye.y, eye.z);
        this.#camera.lookAt(focus.x, focus.y, focus.z);

        const light = Lighting.getLighting();
        light.updateDirection();
        light.updateLight();

        const dir = light.getDirection();
        this.diffuse.position.set(dir.x, dir.y, dir.z);

        this.ambient.color.setHex(light.getAmbientColor());
        this.diffuse.color.setHex(light.getDiffuseColor());

        this.#objects.forEach(element => {
            element.update();
        });
    }

    draw() {
        this.#renderer.render(this.#scene, this.#camera);
    }

    addObject(id, type) {
        const object = new Object(id, type);
        object.initRenderable(this.#scene);
        object.respawnObject();
        this.#objects.push(object);
    }

    removeObject(id) {
        let object = this.#objects.find(obj => obj.getID() === id);
        object.remove(this.#scene);
        this.#objects = this.#objects.filter(obj => obj.getID() !== id);
    }

    getObjects() {
        return this.#objects;
    }
}


const mainRender = new Render();
mainRender.initRender();


export function getGlobalRenderer() {
    return mainRender;
}


window.addEventListener("resize", function(event) {
    const width  = renderTarget.clientWidth;
    const height = renderTarget.clientHeight;
    mainRender.resizeTargets(width, height);
})


export function workRender() {
    requestAnimationFrame(workRender);
    mainRender.update();
    mainRender.draw();
}