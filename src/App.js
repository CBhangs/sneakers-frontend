import './App.css';
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import NewUserPage from './components/NewUserPage';
import LoginPage from './components/LoginPage';
import SneakersPage from './components/SneakersPage';
import SneakerPage from './components/SneakerPage';
import { useState } from 'react';





function App() {
  const [user, setUser]= useState(null) 
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element= {<LandingPage />}/>
        <Route path="/user/register"  element= {< NewUserPage user={user} setUser={setUser} />}/>
        <Route path="/user/login" element= {<LoginPage  user={user} setUser={setUser}/>}/>
        <Route path="/sneakers/:sneakerId/edit" element= {<h1>Edit me</h1>}/>
        <Route path="/sneakers/:sneakerId" element= {<SneakerPage user={user} setUser={setUser} />}/>
        <Route path="/sneakers" element= {<SneakersPage user={user} setUser={setUser} />}/>
      </Routes>
    </div>
  );
}

export default App;
