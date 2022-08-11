import pool from "./pool";

pool.on('connect', () => {
    console.log('Connexion reussi')
});

const createClient = () => {
    const userCreateQuery = `CREATE TABLE IF NOT EXISTS client
    ( id_client SERIAL PRIMARY KEY  , 
      adress VARCHAR(100)  NOT NULL , 
      nom VARCHAR(100)  NOT NULL, 
      prenom VARCHAR(100)  NOT NULL, 
      num_compte VARCHAR(100) UNIQUE NOT NULL,
      solde INTEGER NOT NULL,
      numero_phone VARCHAR(100) UNIQUE NOT NULL
    )`;
  
    pool.query(userCreateQuery)
      .then((res) => {
        console.log(res);
        pool.end(() => {
          console.log('pool has ended')
        })
        console.log("ok");
      })
      .catch((err) => {
        console.log(err);
        pool.end();
    });
};
/**
 * Table Versement
 */
const createVersementTable = () => {
  const versementCreateQuery = `CREATE TABLE IF NOT EXISTS versement
    ( id_versement SERIAL, 
      id_client SERIAL,
      montant_versement INTEGER NOT NULL, 
      num_compte VARCHAR(100) REFERENCES client(num_compte) ,
      date_versement DATE NOT NULL,
      PRIMARY KEY ( id_versement),
      FOREIGN KEY (id_client)  REFERENCES client(id_client) ON DELETE CASCADE
    ) `;

      pool.query(versementCreateQuery)
      .then((res) => {
        console.log(res);
        pool.end(() => {
          console.log('pool has ended')
        })
      })
      .catch((err) => {
        console.log(err);
        pool.end(() => {
          console.log('pool has ended')
        })
      });
};
/**
 * Table  retrait
 */
const createRetraitTable =() => {
    const retraitTableQuery = `CREATE TABLE IF NOT EXISTS  retrait
      (
        id_retrait SERIAL, 
        id_client SERIAL,
        montant_retrait INTEGER NOT NULL,
        num_compte VARCHAR(100) REFERENCES client(num_compte) ,
        date_retrait DATE NOT NULL, 
        num_cheque VARCHAR(100) NOT NULL,
        PRIMARY KEY (id_retrait),
        FOREIGN KEY (id_client)  REFERENCES client(id_client) ON DELETE CASCADE
      )
    `;
    pool.query(retraitTableQuery)
      .then((res) => {
        console.log(res);
        pool.end(() => {
          console.log('pool has ended')
        })
      })
      .catch((err) => {
        console.log(err);
        pool.end(() => {
          console.log('pool has ended')
        })
      });
}

const createAllTables = () => {
    createClient();
    createVersementTable();
    createRetraitTable();
};
module.exports =  createAllTables;
require('make-runnable');

/**
 * id_retrait SERIAL, 
    id_client SERIAL,
    num_compte VARCHAR(100),
    date_retrait DATE NOT NULL,      
    montant_retrait INTEGER NOT NULL,
    num_cheque VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_retrait),
    FOREIGN KEY (id_client)  REFERENCES client(id_client) ON DELETE CASCADE
 */