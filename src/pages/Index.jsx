import { useState } from 'react';
import Login from './Login';
import NotesList from './NotesList';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    if (username === 'user' && password === 'pass') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container mx-auto p-4">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <NotesList />
      )}
    </div>
  );
};

export default Index;