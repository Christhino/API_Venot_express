import dbQuery from "../database/bdQuery";

import {
    errorMessage,successMessage,status
}  from "../Helpers/status"

const getStatu = async(req,res) => {
  const getQuery = `SELECT count(client.id_client) AS id_client ,  SUM(client.solde) AS solde
  from client `;
  try{
      const { rows } =  await  dbQuery.query(getQuery);
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

const getStatuRetrait =async(req,res) => {
    const getSUmretrait =  `SELECT SUM(montant_retrait)
	FROM public.retrait;`
    try{
       const {rows} = await dbQuery.query(getSUmretrait);
       const dbResponse = rows;
        if(dbResponse[0] === undefined) {
          errorMessage.error = 'Pas de client';
          return res.status(status.notfound).send(errorMessage);
        }
      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage);
    }catch(error){
        errorMessage.error = 'Une erreur est survenu';
        return res.status(status.error).send(errorMessage);
    }
}

const getStatuVersement =async(req,res) => {
    const getSUmretrait =  `SELECT SUM(montant_versement)
	FROM public.versement;`
    try{
       const {rows} = await dbQuery.query(getSUmretrait);
       const dbResponse = rows;
        if(dbResponse[0] === undefined) {
          errorMessage.error = 'Pas de client';
          return res.status(status.notfound).send(errorMessage);
        }
      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage);
    }catch(error){
        errorMessage.error = 'Une erreur est survenu';
        return res.status(status.error).send(errorMessage);
        //console.log(error);
    }
}

module.exports = {
    getStatu,
    getStatuRetrait,
    getStatuVersement
}
