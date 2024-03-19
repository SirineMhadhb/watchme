import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useAuthentication = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async (data) => {
      try {
        const response = await axios.get('http://localhost:3001/api/users', {
          withCredentials: true,
        });

        if (response.data && response.data.email) {
          setUser(response.data);
          console.log(data)
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  return { user };
};

export default useAuthentication;