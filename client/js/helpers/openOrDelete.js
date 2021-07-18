'use strict';

import { getPath, pathStringify } from "./pathController.js";
import { getDir, getFile } from "../controllers/getController.js";
import { deleteDir, deleteFile } from "../controllers/deleteController.js";

const DirOpenOrDelete = async (name, bool) => {
    const path = pathStringify(`${getPath()}-${name}`);
    if (!bool) {
        getDir(path);
    } else {
        if(confirm(`Estas seguro de eliminar el directorio ${name}?`)){
            deleteDir(name);
        }
    }

}

const fileOpenOrDelete = async (name, bool) => {
    if (!bool) {
        getFile(name);
    } else {
        if(confirm(`Estas seguro de elimnar ${name}`)){
            deleteFile(name);
        }
    }

}

export {
    DirOpenOrDelete,
    fileOpenOrDelete
}