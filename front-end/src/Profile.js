import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Button from './Button';
import "./Profile.css";
import defaultAvatar from './assets/defaultAvatar.png';  // Default avatar if none is set
import dogAvatar from './assets/avatar1.png';
import catAvatar from './assets/avatar2.png';
import alligatorAvatar from './assets/avatar3.png';
import owlAvatar from './assets/avatar4.png';
import bunnyAvatar from './assets/avatar5.png';

function Profile() {
  const [profileData, setProfileData] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Error fetching profile data: ' + error.message);
      }
    };

    fetchProfileData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  const getAvatarImage = (avatarName) => {
    switch (avatarName) {
      case 'avatar1.png': return dogAvatar;
      case 'avatar2.png': return catAvatar;
      case 'avatar3.png': return alligatorAvatar;
      case 'avatar4.png': return owlAvatar;
      case 'avatar5.png': return bunnyAvatar;
      default: return defaultAvatar;
    }
  };

  if (!profileData || Object.keys(profileData).length === 0) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const avatarImage = profileData.profile && profileData.profile.avatar ? getAvatarImage(profileData.profile.avatar) : defaultAvatar;

  return (
    <>
      <Header />
      <div className="Profile">
        <img src={avatarImage} alt="Profile Avatar" style={{ width: '150px', height: '150px' }} />
        <h2>{profileData.username || 'Username not set'}</h2>
        <p className="AboutText">{profileData.profile.bio || 'No bio available.'}</p>
      </div>
      <div className="Footer">
        <Button text="Edit Profile" location="/editprofile" />
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </>
  );
}

export default Profile;
