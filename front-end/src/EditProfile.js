import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import "./EditProfile.css";
import dogAvatar from './assets/avatar1.png';
import catAvatar from './assets/avatar2.png';
import alligatorAvatar from './assets/avatar3.png';
import owlAvatar from './assets/avatar4.png';
import bunnyAvatar from './assets/avatar5.png';

function EditProfile() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState("");  // State for avatar
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const avatars = [
        { name: "dog", src: dogAvatar },
        { name: "cat", src: catAvatar },
        { name: "alligator", src: alligatorAvatar },
        { name: "owl", src: owlAvatar },
        { name: "bunny", src: bunnyAvatar }
    ];

    const handleAvatarClick = (avatarName) => {
        console.log("Avatar selected:", avatarName);
        setAvatar(avatarName);
    };

    const handleUpdate = async () => {
        const profileData = {
            new_password: newPassword,
            old_password: oldPassword,
            bio: bio,
            username: userName,
            avatar: avatar
        };

        console.log("Updating profile with data:", profileData);

        try {
            const response = await axios.post('http://localhost:3001/editprofile', profileData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log("Update response:", response.data);
            if (response.status === 200) {
                console.log("Profile updated successfully");
                navigate('/profile', { state: { updated: true } });
            }
        } catch (error) {
            console.error("Update error:", error);
            setErrorMessage(error.response?.data?.message || "An error occurred while updating the profile.");
        }
    };

    return (
        <>
            <Header />
            <div className="EditHeader">
                <h1>Edit Profile</h1>
            </div>
            <div className="UpdateFields">
                {errorMessage && <div className="error" style={{ fontSize: '1.5rem', color: 'red', fontWeight: 'bold' }}>{errorMessage}</div>}
                <h3 className="UpdateHeader">Update Avatar</h3>
                <div>
                    {avatars.map(a => (
                        <button key={a.name} onClick={() => handleAvatarClick(a.name)} style={{ border: avatar === a.name ? '2px solid blue' : 'none' }}>
                            <img src={a.src} alt={a.name} style={{ width: 50, height: 50 }} />
                        </button>
                    ))}
                </div>
                <h3 className="UpdateHeader">Update Username</h3>
                <input type="text" value={userName} onChange={e => setUserName(e.target.value)} />
                <h3 className="UpdateHeader">Update Bio</h3>
                <textarea rows={7} cols={45} value={bio} onChange={e => setBio(e.target.value)} />
                <h3 className="UpdateHeader">Old Password</h3>
                <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                <h3 className="UpdateHeader">New Password</h3>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                <button onClick={handleUpdate}>Update</button>
            </div>
        </>
    );
}

export default EditProfile;
