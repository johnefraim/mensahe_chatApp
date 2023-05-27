import {React, useEffect} from 'react';
import { Routes, BrowserRouter, Route, Navigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/login';
import Registration from './components/registration';
import NotFound from './components/notFound';
import './App.css';
import Layout from './components/layout';
import { useSelector } from 'react-redux';

function App() {
  const auth = useSelector((state)=>state.auth.isAuthenticated)
  
  useEffect(()=>{
    if(auth){
      window.history.replaceState(null, '', '/layout');
    }
  }, [auth]);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={auth ?<Layout/>:<Login/>} />
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/layout"
          element={
            auth ? (
              <Layout/>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
