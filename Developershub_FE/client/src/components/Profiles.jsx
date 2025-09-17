import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/allprofiles')
      .then(res => setProfiles(res.data))
      .catch(err => console.error('Error fetching profiles:', err));
  }, []);

  return (
    <div style={{ padding: '40px', backgroundColor: '#e0f0ff', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Developer Profiles</h2>
      <button className="back-button" onClick={() => navigate("/dashboard")}>⬅️ Go Back</button>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {profiles.map(user => (
          <div key={user._id} style={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)'
          }}>
            <h3>{user.fullname}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Mobile:</strong> {user.mobile}</p>
            <p><strong>Skills:</strong> {user.skill || 'No skills listed'}</p>

            <button
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
              onClick={() => navigate(`/profile/${user._id}`)}
            >
              View Profile / Review
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profiles;
