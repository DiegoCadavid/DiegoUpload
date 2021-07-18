const { Router } = require('express');
const fs = require('fs');
const fsExtra = require('fs-extra')
require('colors');
const parsePath =  require('../helpers/parsePath');


const router = Router();

//Elimnar archivos

router.delete('/delete/:path', (req, res) => {
    const pathParsed = parsePath(req.params.path);

    try {
        fs.rmdirSync(`./${process.env.DIR}/${pathParsed}`, { recursive: true });
        console.log(`directorio Elimniado ./${process.env.DIR}/${pathParsed}`.red);

        return res.status(200).send("Directorio eliminado");
    } catch (error) {
        console.log('Error al eliminar el directorio'.bgRed.white, error)
        return res.status(400).send('No existe ese directorio');
    }
})

router.delete('/delete/:path/:file', (req, res) => {
    const pathParse = parsePath(req.params.path);

    try {
        fs.rmSync(`./${process.env.DIR}/${pathParse}/${req.params.file}`);
        console.log(`Archivo eliminado ./${process.env.DIR}/${pathParse}/${req.params.file}`.red);

        res.status(200).send('Archivo eliminado');
    } catch (error) {
        console.log('Error al eliminar un archivo'.bgRed.white, error);
        res.status(400).send('Occurio un error');
    }

})

router.delete('/delete/dir/all/:path', (req, res) => {
    const pathParsed = parsePath(req.params.path);

    try {
        fsExtra.emptyDir(`./${process.env.DIR}/${pathParsed}`)
        console.log(`archivos del directorio eliminados ./${process.env.DIR}/${pathParsed}`.red);

        return res.status(200).send("Directorio eliminado");
    } catch (error) {
        console.log('Error al eliminar todos los archivos del directorio'.bgRed.white, error)
        return res.status(400).send('No existe ese directorio 2');
    }
})


module.exports = router;