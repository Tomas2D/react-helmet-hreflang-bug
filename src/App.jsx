import React from "react";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Helmet defer={false}>
        <title>Bug showcase</title>
        <link rel="alternate" hrefLang={"en"} href={"https://example.com"} />
      </Helmet>

      <div>Hello world!</div>
    </>
  );
}

export default App;
