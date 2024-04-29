import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import ChatPage from './ChatPage';
import ChatList from './ChatList'
import Matches from './Matches';
import Survey from './Survey';
import Profile from './Profile'
import EditProfile from './EditProfile';
// import MyPreferences from './MyPreferences'
import OtherProfile from './OtherProfile';
import ProtectedRoute from './ProtectedRoute';
import axios from 'axios'

axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/chatpage" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route path="/chatlist" element={<ProtectedRoute><ChatList /></ProtectedRoute>} />
        <Route path="/matches" element={<ProtectedRoute><Matches /></ProtectedRoute>} />
        <Route path="/survey" element={<ProtectedRoute><Survey /> </ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/editprofile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        {/* <Route path="/mypreferences" element={<ProtectedRoute><MyPreferences /></ProtectedRoute>} /> */}
        <Route path="/otheruser" element={<ProtectedRoute><OtherProfile /></ProtectedRoute>} />
        {/* Redirect all other paths to "/login" */}
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
