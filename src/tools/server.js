const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { compile } = require('ejs');

const links = require('../../links');
const buildLinkTree = require('../buildLinkTree');

const PORT = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);

app.get('/', (req, res) => {
  const templateRaw = fs.readFileSync(path.join(__dirname, '../template.ejs'));
  const template = compile(templateRaw.toString());

  res.send(template({ links: buildLinkTree(links) }));
});

app.get('/style.css', (req, res) => res.sendFile(path.join(__dirname, '../../public/style.css')));

server.listen(PORT, () => console.log(`Link dev server is running on port ${PORT}`));
