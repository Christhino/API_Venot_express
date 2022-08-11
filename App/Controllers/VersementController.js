import dbQuery from "../database/bdQuery";

import {
    errorMessage,successMessage,status
}  from "../Helpers/status"

/**
 * @param {object} req 
 * @param {object} req 
 * @returns {object}  return
 */
const addVersement =  async(req, res) => {
    const {
        id_client,
        montant_versement,
        date_versement,
        num_compte
    } = req.body;
    /** num_compte ?? `SELECT num_compte FROM client 
                    INNER JOIN versement 
                    ON num_compte.client =  num_compte.versement` ;*/
    const empty = (input) => {
        if (input === undefined || input === '') {
          return true;
        }
    };
    if (empty(id_client) || empty(montant_versement) || empty(date_versement) || empty(num_compte)) {
       errorMessage.error = 'Veuiller remplir les donnes';
       return res.status(status.bad).send(errorMessage);
    }
    const createVersementQuery = `
        INSERT INTO public.versement(
        id_client,
        montant_versement,
        num_compte,
        date_versement)
        VALUES ($1, $2, $3, $4)
        returning *    
    `;
    const value = [
        id_client,
        montant_versement,
        num_compte,
        date_versement
    ]; 
    try {
        const { rows } = await dbQuery.query(createVersementQuery,value);
        const dbResponse = rows[0];
        successMessage.data = dbResponse;
        return res.status(status.created).send(successMessage);
    }catch (error) {
        errorMessage.error = 'Impossible d`jouter le versement';
        return res.status(status.error).send(errorMessage);
    }
};

const getVersement = async(req, res) => {
    const getAllVersementQuery = 'SELECT * FROM versement  ORDER BY id_versement DESC';
    try{
        const { rows } =  await  dbQuery.query(getAllVersementQuery);
        const dbResponse =rows;
        if(dbResponse[0] === undefined) {
            errorMessage.error = 'Pas de versement';
            return res.status(status.notfound).send(errorMessage);
        }
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);

    } catch(error) {
        errorMessage.error = 'Une erreur est survenu';
        return res.status(status.error).send(errorMessage);
    }
};

const getVersementById =  async (req, res) => {
    const { id_versement } = req.params;
    const GetId = `SELECT * FROM versement WHERE id_versement=$1`;
    try{
        const { rows } = await dbQuery.query(GetId, [id_versement]);
        const dbResponse =rows;
        if(dbResponse[0] === undefined) {
            errorMessage.error = 'Pas de versement';
            return res.status(status.notfound).send(errorMessage);
        }
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);
    }catch(error){
        errorMessage.error = 'Une erreur est survenu';
        return res.status(status.error).send(errorMessage);
    }
}

const deleteVersement = async(req,res) => {
    const { id_versement } = req.params;
    const deleteVersementQuery = 'DELETE FROM versement WHERE id_versement = $1 returning *';
    try{
        const { rows } = await dbQuery.query(deleteVersementQuery, [id_versement]);
        const dbResponse = rows[0];
        if (!dbResponse) {
        errorMessage.error = 'id_versement non trouve';
        return res.status(status.notfound).send(errorMessage);
        }
        successMessage.data = {};
        successMessage.data.message = 'Suppression du client reussi';
        return res.status(status.success).send(successMessage);
    }catch(error){
        return res.status(status.error).send(error);
    }
}
const updateVersement =  async(req,res) => {
    const { id_versement } = req.params;
    const {
        id_client,
        montant_versement,
        date_versement,
        num_compte
    } = req.body;   
    const GetId = `SELECT * FROM versement WHERE id_versement=$1`;
    const updateVersementQuery = `UPDATE public.versement
	SET id_client=$1, montant_versement=$2, num_compte=$3, date_versement=$4
	WHERE id_versement=$5`;
    try{
        const  { rows } =  await  dbQuery.query(GetId, [id_versement]);
        const dbResponse = rows[0];
        if(!dbResponse){
            errorMessage.error  = 'Versement non trouve';
            return  res.status(status.notfound).send(errorMessage);
        }
        const value =[
            id_client,
            montant_versement,
            num_compte,
            date_versement,
            id_versement
        ]
        const response =  await  dbQuery.query(updateVersementQuery ,value);
        const dbResultat = response.rows[0];
        successMessage.data = dbResultat;
        return res.status(status.success).send(successMessage);
      }catch(error){
        errorMessage.error = 'Operation  echouer';
        return res.status(status.error).send(errorMessage);
      }
}
module.exports = {
    addVersement,
    getVersement,
    getVersementById,
    deleteVersement,
    updateVersement
}