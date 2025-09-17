import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

useEffect(() => {
  const token = localStorage.getItem("token");
  axios.get(`http://localhost:5000/myprofile?x-token=${token}`)
    .then(res => setUser(res.data))
    .catch(err => console.log(err));
}, []);


  return (
    <div style={{
      height: '100vh',
      backgroundColor: '#007bff', // Bootstrap primary blue
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        width: '350px',
        boxShadow: '0px 0px 20px rgba(0,0,0,0.2)',
        textAlign: 'center'
      }}>
        <img
          src="/default-profile.png" // you can replace with dynamic profile URL if available
          alt="Profile"
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            marginBottom: '15px'
          }}
        />
        <h2 style={{ margin: '10px 0' }}>{user.fullname || 'John Doe'}</h2>
        <p>{user.email || 'john@gmail.com'}</p>
        <p>{user.mobile || '9876543210'}</p>
        <p>{user.skill || 'HTML, CSS, React'}</p>

        <button style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        onClick={() => window.location.href = '/profiles'}>
          View All Profiles
        </button>
        <button className="back-button" onClick={() => navigate("/login")}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
