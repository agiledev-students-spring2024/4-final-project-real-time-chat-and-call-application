import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Button from './Button';
import defaultAvatar from './assets/defaultAvatar.png'; // Import the default avatar image
import "./OtherProfile.css";

function OtherProfile() {
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:3001/otheruser', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setProfileData(response.data);
                console.error('we goot here !');
                setIsLoading(false);
            } catch (error) {
                console.error('Full error object:', error);
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.error('Error data:', error.response.data);
                  console.error('Error status:', error.response.status);
                  console.error('Error headers:', error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  console.error('Error request:', error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.error('Error message:', error.message);
                }
                setError('Error fetching profile data: ' + error.message);
              }              
        };

        fetchProfileData();
    }, [navigate]);

    const handleProfileClick = (username) => {
        navigate(`/chatpage/${username}`);
    };

    const handleBackClick = () => {
        navigate('/profile');
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    // Assuming 'profileData' contains 'profile', 'username', and 'answers' keys as structured in your back-end
    const { profile, username, answers } = profileData || {};
    const avatarImage = profile && profile.avatar ? require(`./assets/${profile.avatar}`).default : defaultAvatar;

    return (
        <>
            <Header />
            <div className="Profile">
                <img src={avatarImage} alt="Profile" style={{ width: '150px', height: '150px' }} />
                <h2>{username || 'Username not set'}</h2>
                <h4>{answers && answers.year || 'Year not set'}</h4>
                <p className="AboutText">{profile && profile.bio || 'No bio available.'}</p>
            </div>
            <div className="Footer">
                <Button text="Survey Answers" location="/useranswers" />
                <button className='message-button' onClick={() => handleProfileClick(username)}>Message</button>
                <button className='back-button' onClick={handleBackClick}>Back to My Profile</button>
            </div>
        </>
    );
}

export default OtherProfile;
