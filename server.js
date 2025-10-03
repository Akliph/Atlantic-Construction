const express = require('express');
const path = require('path');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');

// Main object
const app = express();

// Watch /public folder for changes
const liveReloadServer = livereload.createServer({
  exts: ['html', 'css', 'js'],
  delay: 100
});
liveReloadServer.watch(path.join(__dirname, 'public'));
liveReloadServer.watch(path.join(__dirname, 'public'));

// Live reload setup
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
	setTimeout(() => {
		liveReloadServer.refresh("/")
	}, 100);
});

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});