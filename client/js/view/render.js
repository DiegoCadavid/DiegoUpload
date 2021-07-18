'use strict'

import { deleteBool } from '../controllers/deleteController.js';
import { backDir } from '../controllers/getController.js';
import { DirOpenOrDelete, fileOpenOrDelete } from '../helpers/openOrDelete.js'
import { getPath, pathStringify } from '../helpers/pathController.js';


const content = document.getElementById('content');
const Carpetcontent = document.getElementById('leftContent');


const ext = ['jpg', 'mp3', 'mp4', 'pdf', 'png', 'txt', 'doc', 'docx', 'zip', 'ppt', 'avi', 'gif', 'jfif', 'jpeg', 'rar'];
const previewExt = ['jpg', 'png', 'jfif', 'jpeg', 'gif'];

const createIcons = (names = [], clear = false) => {
    if (clear) {
        content.innerHTML = "";
        Carpetcontent.innerHTML = "";

        const pCreated = document.createElement('p')
        let url = document.createTextNode(getPath().replace('/', 'upload'));
        pCreated.appendChild(url);
        content.appendChild(pCreated);

        if (getPath().replace('/', 'upload') != 'upload') {
            //Crea una carpeta que sirve para nevegar entre directorios
            const carpetBackButton = document.createElement('button');

            carpetBackButton.style.backgroundImage = `url(./images/backdir.png)`;

            const carpetBackP = document.createElement('p');
            const carpetnameNode = document.createTextNode('Atras');
            carpetBackP.appendChild(carpetnameNode);

            carpetBackButton.appendChild(carpetBackP);

            carpetBackButton.addEventListener('click', backDir);

            Carpetcontent.appendChild(carpetBackButton);
        }


    }

    names.forEach((name, i) => {

        const buttonCreated = document.createElement('button');

        const idAttribute = document.createAttribute('id');
        idAttribute.value = name;
        buttonCreated.setAttributeNode(idAttribute);


        const pCreated = document.createElement('p');
        const nameNode = document.createTextNode(name.length > 10 ? name.substring(0, 10).concat("...") : name);

        pCreated.appendChild(nameNode);
        buttonCreated.appendChild(pCreated);
        buttonCreated.style.backgroundImage = "url(./images/loading.gif)"

        const extFile = (/[.]/.exec(name)) ? /[^.]+$/.exec(name)[0] : undefined; //No entiendo xD
        buttonCreated.className = 'buttonIcon';

        if (extFile) {
            content.appendChild(buttonCreated);

            if (ext.includes(extFile)) {
                if (previewExt.includes(extFile)) {
                    const path = pathStringify(getPath());
                    axios({
                        url: `preview/${path}/${name}`, //your url
                        method: 'GET',
                        responseType: 'arraybuffer', // important
                    }).then((response) => {
                        // const url = URL.createObjectURL(new Blob([response.data]));
                        const url = URL.createObjectURL(new Blob([new Uint8Array(response.data)]));
                        buttonCreated.style.backgroundImage = `url(${url})`;
                    })


                } else {
                    buttonCreated.style.backgroundImage = `url(./images/${extFile}.png)`;
                }

            } else {
                buttonCreated.style.backgroundImage = `url(./images/default.png)`;
            }

            document.getElementById(name).addEventListener('click', () => {
                fileOpenOrDelete(name, deleteBool);
            })

        } else {
            Carpetcontent.appendChild(buttonCreated);

            buttonCreated.style.backgroundImage = `url(./images/folder.png)`
            document.getElementById(name).addEventListener('click', () => {
                DirOpenOrDelete(name, deleteBool);
            })
        }

    })
}



const removeIcon = (name) => {
    const icon = document.getElementById(name);
    icon.remove();
}

//Open menu
const menuOpen = (canvas, bool) => {
    const panelCreator = canvas;
    if (bool) {
        panelCreator.style.display = 'block';
    } else {
        panelCreator.style.display = "none";
    }
}

const NavColor = (color) => {
    document.getElementById('mainContent').style.setProperty('--navColor', color);
}



export {
    createIcons,
    removeIcon,
    menuOpen,
    NavColor
}


