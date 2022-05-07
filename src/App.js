import './App.css';
import { Route, Routes, Link } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import NewUserPage from './components/NewUserPage';
import LoginPage from './components/LoginPage';
import SneakersPage from './components/SneakersPage';
import SneakerPage from './components/SneakerPage';
import SneakerEditPage from './components/SneakerEditPage';
import UserEditPage from './components/UserEditPage';
import { useState } from 'react';






function App() {
  const [user, setUser]= useState(null) //hook allows you to use state and other React features without writing a class.
  // set to null because the user isn't created yet 
  return (
    <div className="App">
      {user ? <Link to="/user/edit">{user.name}</Link> : null}
      <Routes>
        <Route path="/" element= {<LandingPage />}/>
        <Route path="/user/register"  element= {< NewUserPage user={user} setUser={setUser} />}/>
        <Route path="/user/login" element= {<LoginPage  user={user} setUser={setUser}/>}/>
        <Route path="/user/edit" element= {<UserEditPage user={user} setUser={setUser}/>}/>
        {/* ":" uses URL params from sneakerId on sneakerPage */}
        <Route path="/sneakers/:sneakerId/edit" element= {<SneakerEditPage user={user} setUser={setUser}/>}/>
        <Route path="/sneakers/:sneakerId" element= {<SneakerPage user={user} setUser={setUser} />}/>
        <Route path="/sneakers" element= {<SneakersPage user={user} setUser={setUser} />}/>
      </Routes>
    </div>
  );
}

export default App;
