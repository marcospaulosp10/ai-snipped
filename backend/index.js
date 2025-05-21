require('dotenv').config();          
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const url = process.env.MONGO_URL || 'mongodb://mongo:32000/mydb';

async function start() {
  
  const client = new MongoClient(url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  });

  
  await client.connect();

  const db = client.db(); 
  
  app.get('/api/hello', (req, res) => {
    res.json({ message: 'just testingggg' });
  });

  app.listen(port, () => {
    console.log(`back listening on http://localhost:${port}`);
  });
}

start().catch(err => {
  console.error('error on conecting:', err);
  process.exit(1);
});
