const http = require('http');
const axios = require('axios').default;
const port = process.env.PORT || 5000;

const url = 'https://jsonplaceholder.typicode.com/users';
let userData;

const getUser = async () => {
  const { data } = await axios.get(url).catch((err) => {
    console.log(err);
  });

  userData = data;
};
getUser();

const server = http.createServer((req, res) => {
  if (req.url === '/api/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(userData));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        message: 'Not found',
      })
    );
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
