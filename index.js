const server = require('./server.js');

const PORT = process.env.PORT || 8000;

server.get('/', (req, res) => {
  res.send(`The server is running on port ${PORT}`)
})

server.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
