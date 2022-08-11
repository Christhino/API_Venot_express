import dbQuery from "../database/bdQuery";

import {
    errorMessage,successMessage,status
}  from "../Helpers/status"

/**
   * Update Client
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
*/
const updateClient =  async(req, res) => {
    const { id_client } = req.params;
    const {
        adress , 
        nom , 
        prenom , 
        num_compte ,
        solde ,
        numero_phone ,
    } = req.body;
    const getClientById = `SELECT * FROM client WHERE id_client=$1`;
    const updateClient = `UPDATE client SET 
                                            adress=$1, 
                                            nom=$2, 
                                            prenom=$3, 
                                            num_compte=$4,
                                            solde=$5,
                                            numero_phone=$6 WHERE id_client=$7 returning *`
    ;
    try{
      const  { rows } =  await  dbQuery.query(getClientById, [id_client]);
      const dbResponse = rows[0];
      if(!dbResponse){
          errorMessage.error  = 'Client non trouve';
          return  res.status(status.notfound).send(errorMessage);
      }
      const value =[
            adress , 
            nom , 
            prenom , 
            num_compte ,
            solde ,
            numero_phone , 
            id_client
      ]
      const response =  await  dbQuery.query(updateClient ,value);
      const dbResultat = response.rows[0];
      successMessage.data = dbResultat;
      return res.status(status.success).send(successMessage);
    }catch(error){
      errorMessage.error = 'Operation  echouer';
      return res.status(status.error).send(errorMessage);
    }
};
const addClient =  async(req, res) => {
    const {
        adress, 
        nom, 
        prenom, 
        num_compte,
        solde,
        numero_phone,
    } = req.body;
    const empty = (input) => {
        if (input === undefined || input === '') {
          return true;
        }
    };
    if (empty(adress) || empty(nom) || empty(prenom) || empty(num_compte) || empty(solde)|| empty(numero_phone)) {
       errorMessage.error = 'Veuiller remplir les donnes';
       return res.status(status.bad).send(errorMessage);
    }
    const createClientQuery = `INSERT INTO client(
        adress, nom, prenom, num_compte, solde, numero_phone)
        VALUES ($1, $2, $3, $4, $5, $6)
        returning *`;
    const value = [
        adress , 
        nom , 
        prenom , 
        num_compte ,
        solde ,
        numero_phone ,
    ]; 
    try {
        const { rows } = await dbQuery.query(createClientQuery, value);
        const dbResponse = rows[0];
        successMessage.data = dbResponse;
        return res.status(status.created).send(successMessage);
    }catch (error) {
        errorMessage.error = 'Impossible d`jouter le client';
        return res.status(status.error).send(errorMessage);
    }
};
/**
   * Get All Client
   * @param {object} req 
   * @param {object} res 
   * @returns {object} Client array
*/

const getClient = async(req, res) => {
    const getAllClientQuery = `SELECT *
      FROM public.client 
      order by id_client DESC`;
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
/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @returns {object}  find  client by Id
 */
const getClientById =  async (req, res) => {
    const { id_client } = req.params;
    const GetId = `SELECT * FROM client WHERE id_client=$1 OR nom = '$2' OR num_compte='$3'`;
    try{
        const { rows } = await dbQuery.query(GetId, [id_client]);
        const dbResponse =rows;
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
/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @returns {object}  find  client by Id
 */
 const getClientByNom_NumCompte =  async (req, res) => {
  const { nom, num_compte } = req.params;
  const GetId = `SELECT * FROM client  WHERE nom = '$1 ' OR num_compte='$2'`;
  try{
      const { rows } = await dbQuery.query(GetId, [nom, num_compte]);
      const dbResponse =rows;
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
/**0348019736
 * Delete Client
 * @param {object}req 
 * @param {object} res 
 * @returns {void} return client deleted
*/
const deleteClient = async(req,res) => {
    const { id_client } = req.params;
    const deleteClientQuery = 'DELETE FROM client WHERE id_client = $1 returning *';
    try{
        const { rows } = await dbQuery.query(deleteClientQuery, [id_client]);
        const dbResponse = rows[0];
        if (!dbResponse) {
        errorMessage.error = 'id_client non trouve';
        return res.status(status.notfound).send(errorMessage);
        }
        successMessage.data = {};
        successMessage.data.message = 'Suppression du client reussi';
        return res.status(status.success).send(successMessage);
    }catch(error){
        return res.status(status.error).send(error);
    }
}
const getClientEtat = async(req, res) => {
  const getAllClientQuery = `SELECT client.id_client, nom, prenom, client.num_compte, ((client.solde+versement.montant_versement)-retrait.montant_retrait)
  AS  solde 
    FROM public.client 
    JOIN versement ON versement.id_client=client.id_client 
    JOIN retrait ON retrait.id_client=client.id_client 
    order by id_client DESC`;
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

module.exports = {
    addClient,
    deleteClient,
    getClient,
    getClientById,
    updateClient,
    getClientByNom_NumCompte,
    getClientEtat
}

/**addClientapp.get('/api/users', function(req, res) {
  const user_id = req.query.id;
  const token = req.query.token;
  const geo = req.query.geo;

  res.send({
    'user_id': user_id,
    'token': token,
    'geo': geo
  });
});


// ...

// routes will go here
// ...

app.get('/api/:version', function(req, res) {
  res.send(req.params.version);
});

app.listen(port);
console.log('Server started at http://localhost:' + port);



app.param('name', function(req, res, next, name) {
  const modified = name.toUpperCase();

  req.name = modified;
  next();
});

// routes will go here
// ...

app.get('/api/users/:name', function(req, res) {
  res.send('Hello ' + req.name + '!');
});*/



/***
 * SELECT client.id_client, adress, nom, prenom, client.num_compte, ((client.solde+versement.montant_versement)-retrait.montant_retrait)
    AS  solde, numero_phone
      FROM public.client 
      JOIN versement ON versement.id_client=client.id_client 
      JOIN retrait ON retrait.id_client=client.id_client 
      order by id_client DESC;
 */