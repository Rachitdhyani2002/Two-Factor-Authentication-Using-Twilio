import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersRes = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/get-users`);
                setUsers(usersRes.data);
            } catch (error) {
                console.error("Error fetching admin data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Admin Dashboard</h2>

            <h3 style={styles.subtitle}>Users</h3>
            <ul style={styles.userList}>
                {users.map(user => (
                    <li key={user._id} style={styles.userItem}>
                        <span style={styles.userEmail}>{user.email}</span>
                        <span style={styles.deviceInfo}>Device: {user.primaryDevice?.deviceName || 'N/A'}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// Inline styles
const styles = {
    container: {
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        fontSize: '24px',
        color: '#333',
        marginBottom: '20px',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: '18px',
        color: '#555',
        marginBottom: '10px',
    },
    userList: {
        listStyle: 'none',
        padding: 0,
    },
    userItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        margin: '8px 0',
        borderRadius: '4px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        fontSize: '16px',
        color: '#444',
    },
    userEmail: {
        fontWeight: 'bold',
        color: '#333',
    },
    deviceInfo: {
        fontSize: '14px',
        color: '#777',
    },
    // Responsive design
    '@media (max-width: 600px)': {
        container: {
            padding: '15px',
            fontSize: '14px',
        },
        userItem: {
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
        userEmail: {
            marginBottom: '4px',
        },
    },
};

export default AdminDashboard;
