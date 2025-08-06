const express = require('express');
const client = require('prom-client');
const app = express();
const port = 3000;

// Créer un registre
const register = new client.Registry();

// Définir des métriques personnalisées
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Nombre total de requêtes HTTP',
});
register.registerMetric(httpRequestCounter);

// Middleware pour compter les requêtes
app.use((req, res, next) => {
  httpRequestCounter.inc();
  next();
});

// Route par défaut
app.get('/', (req, res) => {
  res.send('API Secure K8s is running');
});

// Route pour les métriques
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
