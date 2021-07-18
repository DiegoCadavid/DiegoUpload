require('colors');
const { Router } = require('express');
const fs = require('fs');
const sharp = require('sharp');

const parsePath = require('../helpers/parsePath');


const router = Router();


//Obtener archivos
router.get('/:path', async (req, res) => {
    const pathParsed = parsePath(req.params.path);
    const path = `./${process.env.DIR}/${pathParsed}`
    try {
        const dir = fs.readdirSync(path);
        console.log(`┌ Directorio suministrado ${path}`.cyan);

        return res.status(200).json({
            pathParsed,
            files: dir
        })
    } catch (error) {
        console.log('Error al encontrar el directorio'.bgCyan.black, error);
        res.status(400).json({
            msg: `El directorio ${req.params.path} no existe`,
        })
    }
});

router.get('/:path/:file', async (req, res) => {

    const pathParsed = parsePath(req.params.path);
    const path = `./${process.env.DIR}/${pathParsed}/${req.params.file}`



    try {
        fs.readFileSync(path);
        console.log(`├ Archivo suministrado ${path}`.cyan);
        return res.status(200).download(path);
    } catch (error) {
        console.log('Error al encontrar el archivo'.bgCyan.black, error);
        return res.status(500).send('No existe ese archivo');
    }

});



//Obtener preview's
router.get('/preview/:path/:file', async (req, res) => {

    const pathParsed = parsePath(req.params.path);
    const path = `./${process.env.DIR}/${pathParsed}/${req.params.file}`

    try {
        // fs.readFileSync(path);
        //SOY UN GENIO WN
        const size = 64;
        const FileEdited = await sharp(fs.readFileSync(path)).resize({ width: size, height: size}).toBuffer();

        res.status(200).send(FileEdited);
    } catch (error) {
        console.log('Error al encontrar el archivo'.bgCyan.black, error);
        return res.status(500).send('No existe ese archivo');

    }

});

module.exports = router;