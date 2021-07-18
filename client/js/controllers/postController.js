'use strict'

import { getPath, pathStringify } from "../helpers/pathController.js";
import { createIcons, menuOpen } from "../view/render.js";

//Crear directorios
const createDir = async (name = null) => {
    const path = pathStringify(getPath());

    if (!name) {
        return alert('Debes introducir un nombre ¬.¬ imbecil');
    }

    const url = `/upload/${path}/${name}`;

    axios.post(url)
        .then(res => {
            console.log(res);
            createIcons([name]);
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                alert('Ya existe un directorio con ese nombre')
            }
        });

    menuOpen(document.getElementById('panelCreateDir'), false);

}

const Upload = async(e = event) => {
    const path = pathStringify(getPath());
    const data = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
        if (!document.getElementById(e.target.files[i].name)) {
            data.append('uploadFile', e.target.files[i]);
        } 
    }

    const url = `/upload/${path}`;

    if (!data.entries().next().done) {

        axios.post(url, data)
            .then(res => {
                const names = new Array();

                Object.keys(e.target.files).forEach(i => {
                    if (!document.getElementById(e.target.files[i].name)) {
                        data.append('uploadFile', e.target.files[i]);
                        names.push(e.target.files[i].name)
                    }
                });

                createIcons(names);
            })
            .catch((error) => {
                if (error.response) {
                    console.log('ERROR  ',error.response);
                }
            });
    } else {
        alert('ERROR');
    }
}


export {
    Upload,
    createDir
}