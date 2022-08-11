const status = {
  success: 200,
  error: 500,
  notfound: 404,
  unauthorized: 401,
  conflict: 409,
  created: 201,
  bad: 400,
  nocontent: 204,
};
const successMessage = { status: 'Avec succes' };
const errorMessage = { status: 'erreur' };

module.exports = {
  status,
  successMessage,
  errorMessage
}