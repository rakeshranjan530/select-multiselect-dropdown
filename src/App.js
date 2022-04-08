import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import LoginForm from './Components/LoginForm';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Navigate to={'/login'}/>} />
        <Route path='/login' element={<LoginForm />}/>
        <Route path='/home' element={<Home />}/>
      </Routes>
      {/* <LoginForm/> */}
    </div>
  );
}

export default App;
