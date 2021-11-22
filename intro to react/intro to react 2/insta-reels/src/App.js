import logo from './logo.svg';
import './App.css';
import { useContext } from 'react';
import Signup from './Component/Signup';
import Login from './Component/Login'
import Feed from './Component/Feed'
import {BrowserRouter, Switch,Route} from 'react-router-dom'
import {AuthProvider} from './Context/AuthContext';
import PrivateRouter from './Component/PrivateRouter';

function App() {
  return (
  <BrowserRouter>
    <AuthProvider>
      <Switch>
        <Route path='/signup' component={Signup}/>
        <Route path='/login' component={Login}/>
        <PrivateRouter path='/' component={Feed}/>
      </Switch>
    </AuthProvider>
  </BrowserRouter>

    
  );
}

export default App;

