const express = require('express');
const axios = require('axios');
const app = express();
const port = 4000;

const SERVICE_ID = process.env.SERVICE_ID;

app.get('/', (req, res) => {
  res.send(`Cliente App ${SERVICE_ID} funcionando`);
});

setInterval(async () => {
  try {
    const response = await axios.post('http://api-registro/registro', {}, {
      headers: {
        'X-Service-ID': SERVICE_ID
      }
    });
    console.log(`App ${SERVICE_ID} - Registro exitoso:`, response.data);
  } catch (error) {
    console.error(`App ${SERVICE_ID} - Error al registrar:`, error.message);
    console.error('Detalles del error:', error.config);
  }
}, 5000);

app.listen(port, () => {
  console.log(`Cliente App ${SERVICE_ID} listening at http://localhost:${port}`);
});