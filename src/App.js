import logo from './logo.svg';
import './App.css';
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import Feed from './Components/Feed'
import {BrowserRouter,Switch, Route} from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
          <PrivateRoute path ='/' component={Feed}/>
        </Switch>
      </AuthProvider>
      
    
    </BrowserRouter>
     

    
  );
}

export default App;
