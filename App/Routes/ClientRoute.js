import  express  from "express";

import { 
    addClient,
    deleteClient,
    getClient,
    getClientById,
    updateClient,
    getClientEtat
} from '../Controllers/ClientController.js'

const router =  express.Router();

router.post('/client' ,addClient);
router.delete('/client/:id_client',deleteClient);
router.get('/client' ,getClient );
router.get('/client/:id_client',  getClientById);
router.get('/client/Etat' , getClientEtat)
router.put('/client/:id_client', updateClient);

module.exports = router;