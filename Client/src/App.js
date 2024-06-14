import { useState } from 'react';
import useAuthSession from './hooks/useAuthSession';
import { toast } from 'react-toastify';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user, loading, login, logout } = useAuthSession();

  async function handleLogin(){
    if(!username || !password){
      toast.warn("Username or Password cannot be empty.")
      return;
    }
    await login(username, password)
    setUsername("")
    setPassword("")
  }

  if(loading){
    return(
      <p className='px-4 py-2 text-lg'>Loading...</p>
    )
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {user ? (
          <div>
            <h2 className="text-xl font-bold">Welcome, {user.username}</h2>
            <button className='w-full px-4 py-2 mt-6 font-bold text-white bg-red-500 rounded-md' onClick={logout}>Logout</button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-2 mt-4 border rounded-md"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 mt-4 border rounded-md"
            />
            <button
              onClick={handleLogin}
              className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-500 rounded-md"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
