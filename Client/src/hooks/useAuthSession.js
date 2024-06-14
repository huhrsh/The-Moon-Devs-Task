import { useState, useEffect } from 'react';
import {toast} from 'react-toastify'

const useAuthSession = () => {
  const [loading,setLoading]=useState(false)
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // checking for token, and returning user data if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoading(true);
      setIsAuthenticated(true);
      fetch('http://localhost:5000/api/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          setUser(data);
        })
        .catch(error => {
          console.error(error);
          logout();
        })
        .finally(()=>{
          setLoading(false);
        });
    }
  }, []);

  // function to handle user login
  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if(response.status===401){
        toast.error("Invalid credentials")
        setLoading(false);
        return;
      }
      const data = await response.json();
      const token = data.token;
      const user = data.user; 
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      setUser(user);
      toast.success('Logged in successfully!');
    } catch (error) {
      console.error('Error logging in:', error);
    }
    setLoading(false);
  };

  // function to handle user logout
  const logout = () => {
    setLoading(true);
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    toast.success('Logged out successfully!');
    setLoading(false);
  };

  // returning userdata, authentication status, login, logout functions, and loading state
  return { user, isAuthenticated, login, logout, loading };
};

export default useAuthSession;