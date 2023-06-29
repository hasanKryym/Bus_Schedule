import './App.css';
import Footer from './components/footer/Footer'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
} from "react-router-dom";

import Profile from './components/profile/Profile';
import Schedules from './components/schedule/Schedules';
import Login_register from './components/login-register/Login_register';
import AdminPanel from './components/admin_panel/AdminPanel';
import AdminSchedule from './components/admin_panel/admin_components/schedule/AdminSchedule';
import UsersTable from './components/admin_panel/usersTable/UsersTable';
import ShowUsers from './components/admin_panel/ShowUsers';
import AddSchedule from './components/admin_panel/AddSchedule/AddSchedule';


function App() {
  return (
   <>
    <Router>
      <Routes>
        <Route path='adminPanel' element={<AdminPanel />}/>
        <Route path='profile' element={<Profile />}/>
        <Route path='/' element={<Schedules />}/>
        <Route path='login_register' element={<Login_register />}/>
        <Route path='adminSchedule' element={<AdminSchedule />}/>
        <Route path='usersTable' element={<UsersTable />}/>
        <Route path='showUsers' element={<ShowUsers />}/>
        <Route path='addSchedule' element={<AddSchedule />}/>
      </Routes>
      <Footer />
    </Router>
   </>
  );
}

export default App;
