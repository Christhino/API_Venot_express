import dbQuery from "../database/bdQuery";

import {
    errorMessage,successMessage,status
}  from "../Helpers/status"


const getDate = async(req, res) => {
    const getAllDateQuery = `SELECT num_cheque.retrait ,montant_versement.versement
     montant_retrait.retrait 
     FROM   ORDER BY id_client DESC`;
    try{
        const { rows } =  await  dbQuery.query(getAllClientQuery);
        const dbResponse =rows;
        if(dbResponse[0] === undefined) {
            errorMessage.error = 'Pas de client';
            return res.status(status.notfound).send(errorMessage);
        }
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);

    } catch(error) {
        errorMessage.error = 'Une erreur est survenu';
        return res.status(status.error).send(errorMessage);
    }
};