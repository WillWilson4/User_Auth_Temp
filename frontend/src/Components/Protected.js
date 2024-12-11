import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Protected = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProtectedData = async () => {
            let token = localStorage.getItem('accessToken'); // Retrieve the access token from localStorage
            if (!token) {
                setMessage('No token found. Please login.');
                return;
            }

            try {
                // Make a request to the protected endpoint with the access token
                const response = await axios.get('/api/protected/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Set the success message if the request is successful
                setMessage(response.data.message);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    // If the access token is expired, attempt to refresh it
                    try {
                        const refreshResponse = await axios.post('/api/token/refresh/', {
                            refresh: localStorage.getItem('refreshToken'),
                        });

                        // Save the new access token in localStorage
                        const newAccessToken = refreshResponse.data.access;
                        localStorage.setItem('accessToken', newAccessToken);

                        // Retry the protected request with the new access token
                        const retryResponse = await axios.get('/api/protected/', {
                            headers: {
                                Authorization: `Bearer ${newAccessToken}`,
                            },
                        });

                        // Set the success message after the retry
                        setMessage(retryResponse.data.message);
                    } catch (refreshError) {
                        // If token refresh fails, prompt the user to log in again
                        setMessage('Session expired. Please log in again.');
                        console.error('Token refresh error:', refreshError);
                    }
                } else {
                    // Handle other errors
                    setMessage('Failed to access protected data.');
                    console.error('Protected route error:', error);
                }
            }
        };

        fetchProtectedData(); // Call the function when the component mounts
    }, []);

    return <h1>{message}</h1>;
};

export default Protected;

