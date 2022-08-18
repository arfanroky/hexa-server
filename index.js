const http = require('http');
// const cors = require('cors')
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
  const headers = {
    'Access-Control-Allow-Origin': '*' /* @dev First, read about security */,
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    /** add other headers as per requirement */
    'Content-Type': 'application/json',
  };

  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  if (['GET', 'POST'].indexOf(req.method) > -1) {
    if (req.url === '/api/users') {
      res.writeHead(200, headers);
      res.end(JSON.stringify(userData));
      return;
    } else {
      res.writeHead(404, headers);
      res.end(
        JSON.stringify({
          error: 'not found',
        })
      );
      return;
    }
  }

  res.writeHead(405, headers);
  res.end(`${req.method} is not allowed for the request.`);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
