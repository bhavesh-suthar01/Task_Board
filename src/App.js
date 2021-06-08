import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './component/Home.js';
import Login from './component/Login.js';
import Register from './component/Register.js';
import Dashboard from './component/Dashboard.js';
import Notfound from './notfound.js';
import { Redirect } from 'react-router-dom';



function App() {

  function sessioncheck() {
    let l = false;
    let u = false;
    let d = false;
    for (var key in localStorage) {
      if (key === 'login') {
        l = true;
      }
      if (key === 'userdata') {
        u = true;
      }
      if (key === 'Detail') {
        d = true;
      }
    }
    if (l === false) {
      localStorage.setItem('login', '');
    }
    if (d === false) {
      localStorage.setItem('Detail', JSON.stringify({}));
    }
    if (u === false) {
      localStorage.setItem('userdata', JSON.stringify([]));
    }
  }


  return (
    <div className="App" style={{ overflow: "hidden", width: "100%" }}>
      {sessioncheck()}
      <Router basename="/Task_Board">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route component={Notfound} />
        </Switch>
        {
          localStorage.getItem("login") !== "" ?
            <Redirect to="/dashboard" />
            : null
        }
      </Router>


    </div>
  );
}

export default App;
