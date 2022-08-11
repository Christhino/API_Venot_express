import dbQuery from "../database/bdQuery";

import {
    errorMessage,successMessage,status
}  from "../Helpers/status"

const getClientEtat = async(req, res) => {
  const getClientQuery = `SELECT client.id_client, nom, prenom, client.num_compte, ((client.solde+versement.montant_versement)-retrait.montant_retrait)
  AS  solde 
    FROM public.client 
    JOIN versement ON versement.id_client=client.id_client 
    JOIN retrait ON retrait.id_client=client.id_client 
    order by id_client DESC`;
  try{
      const { rows } =  await  dbQuery.query(getClientQuery);
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

module.exports = {
    getClientEtat
}
