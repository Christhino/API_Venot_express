import dbQuery from "../database/bdQuery";

import {
    errorMessage,successMessage,status
}  from "../Helpers/status"

/**
   *add client
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
*/

const addRetrait = async(req ,res) => {
    const {
        id_client, date_retrait, montant_retrait, num_cheque, num_compte
    } = req.body;   
    const empty = (input) => {
        if (input === undefined || input === '') {
          return true;
        }
    };
    if (empty(id_client) || empty(num_compte) || empty(date_retrait) || empty(montant_retrait) || empty(num_cheque)) {
        errorMessage.error = 'Veuiller remplir les donnes';
        return res.status(status.bad).send(errorMessage);
    }/*
    if(montant_retrait>){

    }*/
    const addRetrait=  `
        INSERT INTO public.retrait(
           id_client, date_retrait, montant_retrait, num_cheque, num_compte
          
           )
        VALUES ($1, $2, $3, $4, $5)
        ;
    `;

    const value = [
        id_client, date_retrait, montant_retrait, num_cheque, num_compte
    ];
    try{
        const { rows } = await dbQuery.query(addRetrait, value);
        const dbResponse = rows[0];
        successMessage.data = dbResponse;
        return res.status(status.created).send(successMessage);
    }catch(error){
        errorMessage.error = 'Impossible d`jouter un retrait a ce client';
        return res.status(status.error).send(errorMessage);
    }
}

/**
 * Get All retrait
 */
const getAllRetrait =  async (req, res) => {
      const getAllRetraitQuery = ` SELECT * FROM retrait`;
      try{
        const { rows } =  await  dbQuery.query(getAllRetraitQuery);
        const dbResponse =rows;
        if(dbResponse[0] === undefined) {
            errorMessage.error = 'Pas de retrait';
            return res.status(status.notfound).send(errorMessage);
        }
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);

    } catch(error) {
        errorMessage.error = 'Une erreur est survenu';
        return res.status(status.error).send(errorMessage);
    }
}
/**
 * Delete retrait
 */
const DeleteRetraitById = async (req,res) => {
    const {id_retrait} = req.params;
    const DeleteQuery = `
        DELETE FROM public.retrait
        WHERE id_retrait=$1  returning *;
    `;
    try{
        const { rows } = await dbQuery.query(DeleteQuery, [id_retrait]);
        const dbResponse = rows[0];
        if (!dbResponse) {
        errorMessage.error = 'id_retrait non trouve';
        return res.status(status.notfound).send(errorMessage);
        }
        successMessage.data = {};
        successMessage.data.message = 'Suppression du client reussi';
        return res.status(status.success).send(successMessage);
    }catch(error){
        return res.status(status.error).send(error);
    }

} 
/**
 * Get by id
 */
const getRetraitById = async (req,res) => {
    const  { id_retrait } = req.params;
    const  getQuery = `
         SELECT * FROM  retrait WHERE id_retrait=$1;
    `;
    try{
        const { rows } = await dbQuery.query(getQuery, [id_retrait]);
        const dbResponse =rows;
        if(dbResponse[0] === undefined) {
            errorMessage.error = 'Pas de retrait';
            return res.status(status.notfound).send(errorMessage);
        }
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);
    }catch(error){
        errorMessage.error = 'Une erreur est survenu';
        return res.status(status.error).send(errorMessage);
    }
}
/**
 * Update retrait 
 */
const updateRetrait =  async (req,res) => {
    const  { id_retrait } = req.params;
    const {
        id_client, date_retrait, montant_retrait, num_cheque, num_compte
    } = req.body;  
    const getRetraitById = `SELECT * FROM retrait WHERE id_retrait=$1`;
    const updateRetrait = `UPDATE public.retrait
	SET  id_client=$1, date_retrait=$2, montant_retrait=$3, num_cheque=$4, num_compte=$5
	WHERE id_retrait=$6`;
    try{
        const  { rows } =  await  dbQuery.query(getRetraitById, [id_retrait]);
        const dbResponse = rows[0];
        if(!dbResponse){
            errorMessage.error  = 'Client non trouve';
            return  res.status(status.notfound).send(errorMessage);
        }
        const value =[
            id_client, 
            date_retrait,
             montant_retrait, 
             num_cheque, 
             num_compte,
             id_retrait
        ]
        const response =  await  dbQuery.query(updateRetrait ,value);
        const dbResultat = response.rows[0];
        successMessage.data = dbResultat;
        return res.status(status.success).send(successMessage);
      }catch(error){
        errorMessage.error = 'Operation  echouer';
        return res.status(status.error).send(errorMessage);
      }
}
module.exports = {
    addRetrait,
    getAllRetrait,
    DeleteRetraitById,
    getRetraitById,
    updateRetrait
}