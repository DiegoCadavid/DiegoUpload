'use strict'

import { getPath, pathStringify, savePath } from "../helpers/pathController.js";
import { createIcons } from "../view/render.js";


const getDir = async (path = "-") => {
    const newPath = pathStringify(path);

       await axios.get(`${newPath}`)
            .then( ( getRes ) => {
                savePath(getRes.data.pathParsed);
                createIcons(getRes.data.files,true); //Creamos iconos con los datos del directorio
            })
            .catch((error) => {
                console.log(error);
                alert('Error');
                getDir('-');
            });
    };


const getFile = (name) => {
    const path = pathStringify(getPath());

    axios({
        url: `/${path}/${name}`, //your url
        method: 'GET',
        responseType: 'blob', // important
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        console.log(url);
        const link = document.createElement('a');
        link.href = url;

        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
    });
}

const backDir = async () => {
    const path = getPath();
    let arrPath = path.split('/');

    if (arrPath.length > 2) {

        arrPath.pop();

        const newPath = arrPath.join('-');
        getDir(newPath);
    } else {
        alert('Directorio principal ¬ _¬')
    }
}

export {
    getDir,
    backDir,
    getFile
}