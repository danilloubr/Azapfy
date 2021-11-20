import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./routers/Home";
import Infos from "./routers/Infos";

import "./styles/Global.css";
import 'react-responsive-modal/styles.css';



function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/infos/:id">
          <Infos />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
