if( process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = require('./app');

app.listen(app.get('port'), (err) => {
  if(err)process.exit(1);
  console.log(`Server listening on port ${app.get('port')}`);
});