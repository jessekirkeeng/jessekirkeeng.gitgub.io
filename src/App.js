import React from "react";
import routes from "./routes";
import { useToken } from "./utils";
import "./App.css";
import WebPlayback from "./Components/WebPlayback/WebPlayback";


const App = (props) => {

  const token = useToken();

  return (
    <div className="App">
      {routes}
      {token ? <WebPlayback token={token} /> : null}
    </div>
  );
}

export default App;
