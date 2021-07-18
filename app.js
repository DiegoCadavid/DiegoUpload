require('dotenv').config();
require('colors');

const express =  require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();


//middlewares
app.use(express.static('client'))
app.use( cors() );
app.use(express.json());
app.use(fileUpload());

//Rutas
app.use('',require('./routes/getFilesRouter'));
app.use('',require('./routes/uploadFilesRouter'));
app.use('',require('./routes/deleteFilesRouter'))

app.listen(process.env.PORT, () => {
    console.log('--------------------------------------'.yellow)
    console.log(`Server iniciado en el puerto ${process.env.PORT}`.yellow);
    console.log('--------------------------------------'.yellow)

})
