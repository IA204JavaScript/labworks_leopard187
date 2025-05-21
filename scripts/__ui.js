import { getGlobalRenderer } from "./__render.js";
import { Object } from "./__object.js";
import { getLighting } from "./__light.js";


const ambnResetBtn = document.getElementById("ambnResetBtn");
const diffResetBtn = document.getElementById("diffResetBtn");
//const specResetBtn = document.getElementById("specResetBtn");
const dirResetBtn  = document.getElementById("dirResetBtn");
const addButton  = document.getElementById("addButton");
const table = document.getElementById("objectTable");
const ambientRGB = document.getElementById("ambientRGB");
const diffuseRGB = document.getElementById("diffuseRGB");


export function updateUI() {
    const objects = getGlobalRenderer().getObjects();
    
    const tableBody = document.getElementById("tableBody");

    tableBody.innerHTML = ""; 
    
    for(let i = 0; i < objects.length; i++)
    {
        let obj = objects[i];

        const tr = document.createElement("tr");
        tr.dataset.id = obj.getID();

        tr.innerHTML = `
        <td>${obj.getID()}</td>
        <td>${obj.getParsedType()}</td>
        <td>
            <button class="deleteButton" data-id="${obj.getID()}">X</button>
        </td>
        `

        tableBody.appendChild(tr);
    }
}


export function initUI() {
    ambnResetBtn.addEventListener("click", function(event) {
        document.getElementById("ambientRGB").value = "#404040";
        getLighting().resetAmbientColor();
    });


    diffResetBtn.addEventListener("click", function(event) {
        document.getElementById("diffuseRGB").value = "#ffffff";
        getLighting().resetDiffuseColor();
    });
    

    dirResetBtn.addEventListener("click", function(event) {
        document.getElementById("lightDirX").value = 0.2;
        document.getElementById("lightDirY").value = 0.8;
        document.getElementById("lightDirZ").value = 0.4;
        getLighting().resetDirection();
    });


    addButton.addEventListener("click", function(event) {
        const id = document.getElementById("objIdInput").value;
        const type = document.getElementById("objectSelect").value;
        
        if(!id) {
            alert("Введите название объекта!")
            return;
        }

        if(getGlobalRenderer().getObjects().find(obj => obj.getID() === id) !== undefined) {
            alert("Введите другое название объекта!")
            return;
        }

        getGlobalRenderer().addObject(id, type);
        updateUI();
    });


    table.addEventListener("click", function(event) {
        if (event.target.classList.contains("deleteButton")) {
            const id = event.target.dataset.id;
            getGlobalRenderer().removeObject(id);
            updateUI()
        }
    })

    ambientRGB.addEventListener("input", function(event) {
        let color = parseInt(ambientRGB.value.replace("#", ""), 16);
        getLighting().setAmbientColor(color);
    })

    diffuseRGB.addEventListener("input", function(event) {
        let color = parseInt(diffuseRGB.value.replace("#", ""), 16);
        getLighting().setDiffuseColor(color);
    })

}
