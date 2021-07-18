const { Router } = require('express');

const fs = require('fs');
const sharp = require('sharp');

const parsePath = require('../helpers/parsePath');
require('colors');

const router = Router();

//Crear archivos
router.post('/upload/:path', (req, res) => {
    //Valida si se ha subido un archivo

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No se subio ningun archivo.');
    }
    //Recojemos la informacion
    const pathParsed = parsePath(req.params.path);
    const sampleFile = req.files.uploadFile;

    if (sampleFile.length) {
        console.log('Multiples archivos');
        console.log(sampleFile);
        try {
            sampleFile.forEach( file => {
                file.mv(`./${process.env.DIR}/${pathParsed}/${file.name}`, async (err) => {
                    if (err) {
                        throw 'Error al subir el archivo'
                    } 
                })
            });
            return res.status(200).send('Archivo subido');
        } catch (error) {   
            return res.status(400).send('Error al subir los archivos');
        }
    } else {
        // Un solo archivo
        sampleFile.mv(`./${process.env.DIR}/${pathParsed}/${sampleFile.name}`, async (err) => {
            if (err) {
                console.log(`Error al subir ( el ) archivo`.bgYellow.black, err);
                return res.status(400).send('Error al subir el archivo');
            } else {
                console.log(`el archivo fue subido ./${process.env.DIR}/${pathParsed}/${sampleFile.name}`.yellow);
                return res.status(200).send('Archivo subido');
            }
        })
    }




})

router.post('/upload/:path/:name', (req, res) => {
    const { name } = req.params;
    const pathParsed = parsePath(req.params.path);


    try {
        fs.mkdirSync(`./${process.env.DIR}/${pathParsed}/${name}`);
        console.log(`Directorio creado ./${process.env.DIR}/${pathParsed}/${name}`.blue);
        return res.status(200).send("Directorio creado");
    } catch (error) {
        console.log('Error al crear el directorio'.bgBlue.black, error);
        return res.status(400).send('Ya existe ese directorio');
    }

})


module.exports = router;