import micro from "micro";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./src/App";
import * as fs from "fs";
import * as path from "path";
import { Helmet } from "react-helmet";

const server = micro(async (req) => {
  if (req.url === "/" || req.url === "/index.html") {
    const indexHTML = fs.readFileSync(
      path.resolve(__dirname, "build/index.html"),
      {
        encoding: "utf8",
      }
    );

    const helmet = Helmet.renderStatic();
    const appHTML = ReactDOMServer.renderToString(<App />);

    return indexHTML
      .replace('<div id="root"></div>', `<div id="root">${appHTML}</div>`)
      .replace("</head>", `${helmet.link.toString()}</head>`);
  } else {
    return fs.readFileSync(path.resolve(__dirname, `build/${req.url}`));
  }
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}, visit http://localhost:${PORT}`);
});
