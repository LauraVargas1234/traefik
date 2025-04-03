const express = require('express');
const app = express();
const port = 3000;

let reporte = {};

app.use(express.json());

app.post('/reporte', (req, res) => {
  const serviceId = req.headers['x-service-id'];
  if (!serviceId) {
    return res.status(400).send('X-Service-ID header is required');
  }
  
  reporte[serviceId] = (reporte[serviceId] || 0) + 1;
  
  res.json({
    service: serviceId,
    count: reporte[serviceId],
    total: Object.values(reporte).reduce((a, b) => a + b, 0)
  });
});

app.get('/reportes', (req, res) => {
  res.json(reporte);
});

app.listen(port, () => {
  console.log(`API reporte listening at http://localhost:${port}`);
});