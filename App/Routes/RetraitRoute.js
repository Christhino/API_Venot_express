import  express  from "express";

import { 
    addRetrait,
    getAllRetrait,
    DeleteRetraitById,
    getRetraitById,
    updateRetrait
} from '../Controllers/retraiteController'

const router =  express.Router();

router.post('/retrait' ,addRetrait);
router.get('/retrait' ,getAllRetrait );
router.get('/retrait/:id_retrait' , getRetraitById);
router.delete('/retrait/:id_retrait', DeleteRetraitById);
router.put('/retrait/:id_retrait' ,   updateRetrait)


module.exports = router;