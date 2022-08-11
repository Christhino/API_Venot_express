const express = require('express');
const cors = require('cors');
const env =require('./env');
const app = express();

import ClienRoute  from "./App/Routes/ClientRoute"
import VersementRoute from "./App/Routes/VersementRoute"
import RetraitRoute  from "./App/Routes/RetraitRoute"
import EtatRoute from "./App/Routes/EtatRoute"
import StatuRoute from "./App/Routes/Statut.js"
//middleware URL
app.use(cors(true));
//middleware JSON

app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use('/API/Banking',ClienRoute)
app.use('/API/Banking',VersementRoute)
app.use('/API/Banking',RetraitRoute)
app.use('/API/Banking',EtatRoute)
app.use('/API/Banking',StatuRoute)
app.listen(env.port).on('listening' , () => {
   console.log(`🚀 server ${env.port}`);
});
module.exports = app;