
import './App.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Plan from './components/Plans/Plan';

import {
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Dashboard/Dashboard';
import StripeContainer from './components/PaymetStripe/StripeContainer';



function App() {


  

  return (
  
      <>
    <ToastContainer />
      <div className="App">

      
       <Routes>
           <Route path='/' element={<Register />} />
           <Route path='/login' element={<Login />} />
           <Route path='/plans' element={<Plan />} />
           <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/payment' element={<StripeContainer />} />
         </Routes> 

  
        

      </div>
      </>
  );
}

export default App;
