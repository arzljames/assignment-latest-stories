const http = require("http");
const url = require("url");
const port = 3000;
const extractHelper = require("./helpers/extractLatestStories");

// create a server object using http module
const server = http.createServer(async (req, res) => {
  const { pathname } = url.parse(req.url);

  // fetch the html of time.com and convert it into plain text
  const htmlString = await fetch("https://time.com/")
    .then((response) => response.text())
    .then((data) => data);

  // created custom helper to extract the necessary data
  // response will be an array of objects consisting title and link
  const response = await extractHelper.latestStories(htmlString);

  // HTTP GET /api/getTimeStories is the only valid endpoint
  if (pathname === "/api/getTimeStories") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(response));
    res.end();
  } else {
    res.end(`Unable to GET ${pathname}`);
  }
});

// server listening to port 3000
// e.g http://localhost:3000
server.listen(port, () => console.log(`Server running in port: ${port}`));
