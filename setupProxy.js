// javascript

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/randow.json', createProxyMiddleware({ target: 'http://coffe.alexflipnote.dev', changeOrigin: true }));
