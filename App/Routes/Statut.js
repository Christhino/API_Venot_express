import  express  from "express";

import { 
    getStatu,
    getStatuRetrait,
    getStatuVersement
} from '../Controllers/statusCradController'

const router =  express.Router();

router.get('/statut' , getStatu)
router.get('/statut/retrait',  getStatuRetrait)
router.get('/statut/versement', getStatuVersement)
module.exports = router;