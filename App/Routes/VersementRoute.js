import  express  from "express";

import { 
    addVersement,
    getVersement,
    getVersementById,
    deleteVersement,
    updateVersement
} from '../Controllers/VersementController'

const router =  express.Router();

router.post('/versement' ,addVersement);
router.get('/versement' ,getVersement);
router.get('/versement/:id_versement' ,getVersementById);
router.delete('/versement/:id_versement',deleteVersement);
router.put('/versement/:id_versement' , updateVersement)
module.exports = router;