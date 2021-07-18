'use strict';

//Convierte los /// a ---
const pathStringify = (pathUrl = "") => {
    return pathUrl.replace(new RegExp(/\//gi), '-');
}

const getPath = () => {
    if (localStorage.length > 0) {
        return localStorage.getItem("session_path");
    }
    savePath('/');
    return localStorage.getItem("session_path");

}

const savePath = (path) => {
    localStorage.setItem("session_path", path);
}

export {
    pathStringify,
    savePath,
    getPath
}