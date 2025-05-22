import { getCamera } from "./__camera.js";


const mouseState = {
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0,
    diffX: 0,
    diffY: 0,
    pressed: false
}


export function initControls() {
    
    const renderTarget = document.getElementById("renderTargetOutput");

    renderTarget.addEventListener("wheel", function(event) {
        let dist = getCamera().getDistance();

        if(event.deltaY > 0) dist += 0.25;
        if(event.deltaY < 0) dist -= 0.25;
        
        getCamera().setDistance(dist);
        getCamera().update(0, 0);
    });


    renderTarget.addEventListener("mouseup", function(event) {
        mouseState.pressed = false;
    });


    renderTarget.addEventListener("mousedown", function(event) {
        mouseState.pressed = true;
    });


    renderTarget.addEventListener("mousemove", function(event) {
        mouseState.prevX = mouseState.x;
        mouseState.prevY = mouseState.y;

        mouseState.x = event.screenX;
        mouseState.y = event.screenY;

        if(event.buttons === 4 && mouseState.pressed) {
            let diffX = mouseState.x - mouseState.prevX;
            let diffY = mouseState.y - mouseState.prevY;
            mouseState.diffX = diffX;
            mouseState.diffY = diffY;
            getCamera().update(diffX, diffY);
        }
    });
}


export function getMouseState() {

}