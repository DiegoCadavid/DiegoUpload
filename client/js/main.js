'use strict';

import { deleteAllFilesDir, DeleteSwith } from "./controllers/deleteController.js";
import { getDir } from "./controllers/getController.js";
import { createDir, Upload } from "./controllers/postController.js";

import { getPath, savePath } from "./helpers/pathController.js";
import { menuOpen } from "./view/render.js";


//Evita el recargado de la pagina
document.getElementById('formid').addEventListener('submit', (e) => {
    e.preventDefault();
});
document.getElementById('formdir').addEventListener('submit', (e) => {
    e.preventDefault();
});

// savePath('/'); //Guarda la app apenas inicializa para crear el objecto se session

getDir(getPath()); //Obtiene los directorios apenas se ejecuta la app
menuOpen(document.getElementById('panelCreateDir'), false); //Apenas inicia la app oculta el creador de dir

//Navegar directorio
document.getElementById('buttonSearch').addEventListener('click', () => getDir(getPath()));


// //Eliminar archivos
document.getElementById('buttonDeleteDir').addEventListener('click', () => {
    deleteAllFilesDir();
})    

//Ocular creador de dir
document.getElementById('buttonCreateDir').addEventListener('click', () => {
    menuOpen(document.getElementById('panelCreateDir'), true);
})

//Ocular creador de dir
document.getElementById('cancelCreateDir').addEventListener('click', () => {
    menuOpen(document.getElementById('panelCreateDir'), false);
})

//Crear div
document.getElementById('confirmCreateDir').addEventListener('click', () => {
    createDir( document.getElementById('createDirText').value );
})

//Subir archivos
document.getElementById('buttonUpload').addEventListener('click', () => {
    document.getElementById('uploadFileElement').click(); //Simular type file input
});

// Elimnar  directorios
document.getElementById('uploadFileElement').addEventListener('change', (e) => {
    Upload(e);
});

//Activar eliminador de ficheros
document.getElementById('buttonDeleteFile').addEventListener('click', () => {
    DeleteSwith();
})
