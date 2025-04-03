const express = require('express');
const app = express();
const port = 6000;

let logs = {};

app.use(express.json());

app.post('/logs', (req, res) => {
  const serviceId = req.headers['Registro recibido'];
  if (!serviceId) {
    return res.status(400).send('Error al recibir los reportes');
  }
    
  res.json({
    service: serviceId,
    count: logs[serviceId],
    total: Object.values(logs).reduce((a, b) => a + b, 0)
  });
});

app.get('/logs', (req, res) => {
  res.json(logs);
});

app.listen(port, () => {
  console.log(`Logger-central en http://localhost:${port}`);
});