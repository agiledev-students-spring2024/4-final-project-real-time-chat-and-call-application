import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Matches.css";
import Header from "./Header";
import defaultAvatar from './assets/defaultAvatar.png'; // Placeholder for avatars
import dogAvatar from './assets/avatar1.png';
import catAvatar from './assets/avatar2.png';
import alligatorAvatar from './assets/avatar3.png';
import owlAvatar from './assets/avatar4.png';
import bunnyAvatar from './assets/avatar5.png';

const avatarMap = {
    'avatar1.png': dogAvatar,
    'avatar2.png': catAvatar,
    'avatar3.png': alligatorAvatar,
    'avatar4.png': owlAvatar,
    'avatar5.png': bunnyAvatar,
    default: defaultAvatar
};

const Matches = () => {
    const navigate = useNavigate();
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await axios.get('http://localhost:3001/matches', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setMatches(response.data);
            } catch (error) {
                setError('Error fetching matches: ' + error.message);
            }
        };

        fetchMatches();
        const interval = setInterval(fetchMatches, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleMatchClick = async (match) => {
        try {
            await axios.post('http://localhost:3001/matches', { username: match.username }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            navigate('/otheruser', { state: { user: match } });
        } catch (error) {
            setError('Error updating match: ' + error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="MatchList">
                {error && <h1>{error}</h1>}
                {matches.map((match, index) => (
                    <div key={index} className="match" onClick={() => handleMatchClick(match)}>
                        <img src={avatarMap[match.avatar] || avatarMap.default} alt="Match Avatar" className="profilepic_match" />
                        <div className="match-info">
                            <h4>{match.username}</h4>
                            <p>{match.bio}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Matches;
