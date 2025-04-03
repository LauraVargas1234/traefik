const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://reporte/panel');
    const reporte = response.data;
    
    const status = {
      rutasActivas: [
        '/cliente/uno',
        '/cliente/dos',
        '/reporte',
        '/reporte/panel',
        '/logs'
      ],
      reporte: reporte,
      totalReportes: Object.values(reporte).reduce((a, b) => a + b, 0),
      clientesComunicados: Object.keys(reporte)
    };
    
    res.json(status);
  } catch (error) {
    res.status(500).send('Error al obtener el estado');
  }
});

app.listen(port, () => {
  console.log(`Servicio de analitica en http://localhost:${port}`);
});