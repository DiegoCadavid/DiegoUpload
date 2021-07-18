'use strict'

import { pathStringify, getPath } from "../helpers/pathController.js";
import { NavColor, removeIcon } from "../view/render.js";
import { getDir } from "./getController.js";


let deleteBool = false;

const DeleteSwith = () => {
    deleteBool = !deleteBool;

    if (deleteBool) {
        NavColor('rgb(107, 41, 41)');
    } else {
        NavColor('rgb(65, 65, 65)');
    }
}


const deleteAllFilesDir = async () => {
    if(confirm('Estas seguro de vaciar el directorio?')){
        const path = pathStringify(getPath());
        
        const url = `/delete/dir/all/${path}`;
        
        axios.delete(url)
        .then(res => {
            console.log(res);
            getDir(path,true);
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
    }
}

const deleteDir = (name) => {
    const path = pathStringify(getPath());
    const url = `/delete/${path}-${name}`;

    axios.delete(url)
        .then(res => {
            console.log(res);
            removeIcon(name);
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                alert('No se puede eliminar el directorio')
            }
        });
}

const deleteFile = async (name) => {
    const path = pathStringify(getPath());

    axios.delete(`/delete/${path}/${name}`)
        .then((res) => {
            removeIcon(name);
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                alert('No se puede eliminar el archivo')
            }
        })
}



export {
    deleteAllFilesDir,
    DeleteSwith,
    deleteBool,
    deleteFile,
    deleteDir
}