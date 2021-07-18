//Cambia los simbolos ( ---  por  ///)
const parsePath = (path = "") => {
    return path.replace(new RegExp(/-/gi), '/');
}

module.exports = parsePath;