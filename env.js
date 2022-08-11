const dotenv = require('dotenv')
dotenv.config();

const env =  {
  database_url: process.env.DATABASE_URL,
  port: process.env.PORT || 9098,
}
console.log(env)
module.exports = env;