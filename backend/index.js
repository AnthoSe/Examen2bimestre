const express = require('express'); 
const app = express();
const cors = require('cors');

require('./database'); 

app.use(cors({origin:'http://localhost:4200'}));
app.use(express.json());
app.use('/users', require('./routes/user.routes'));
app.use('/compras', require('../backend/routes/compra.routes'));

const server= app.listen(3000, () => {
  console.log('Server corriendo en el puerto 3000');
});

module.exports=server;

