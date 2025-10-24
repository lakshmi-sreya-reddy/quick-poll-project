const http = require("http");//require will aloow to include other modules like libraries in node.js
//http used to create a web server
const fs = require("fs");//file system ,used to read and write files like html,css and js
const path = require("path");//helps handling the file paths correctly across operating systems

const PORT = 300;//port number is  a numerical identifier through whivh your server listens for incoming requsts,so when you run the server you will visit https://localhost:300 in your browser

// Simple poll data
let votes = { tea: 0, coffee: 0 };//this is the object that stores your current vote count ,initially its 0,and when eveer someone votes(through ajax calls) this object updates

//http.createserver() will create a basic web serverqq
const server = http.createServer((req, res) => {
  // Serve static files
  //req.url is the path the browser is requesting and "/" meand the homepage
  //fs.readfile reads your file
  //__dirname is a special varialble that gives the current folder path of your server.js
  //path.join() safely combines folder names into a complete file path
  if (req.url === "/" || req.url === "/index.html") {
    fs.readFile(path.join(__dirname, "public", "index.html"), (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });//tells browser its a html page
      res.end(data);
    });
  } else if (req.url === "/script.js") {
    fs.readFile(path.join(__dirname, "public", "script.js"), (err, data) => {
      res.writeHead(200, { "Content-Type": "application/javascript" });
      res.end(data);
    });
  } else if (req.url === "/style.css") {
    fs.readFile(path.join(__dirname, "public", "style.css"), (err, data) => {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(data);
    });
  }

  // Voting endpoint
  else if (req.url.startsWith("/vote")) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const option = url.searchParams.get("option");
    if (option && votes[option] !== undefined) votes[option]++;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(votes));
  }

  // Get current results
  else if (req.url === "/results") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(votes));
  }

  else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));