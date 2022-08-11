import  express  from "express";

import { 
    getClientEtat
} from '../Controllers/EtatController.js'

const router =  express.Router();

router.get('/etat_compte' , getClientEtat)

module.exports = router;