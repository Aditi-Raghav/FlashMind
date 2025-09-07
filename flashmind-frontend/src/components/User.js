import React, { useEffect, useState } from 'react';
//import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function UserPage({ user, setUser, darkMode }) {
  // For now, just use user passed from props or dummy data
  const [userData, setUserData] = useState(user || {
    name: 'Guest User',
    email: 'guest@example.com',
    avatar: 'https://via.placeholder.com/150',
    flashcards: [],
  });

  
  const navigate = useNavigate();
  // const [userData, setUserData] = useState(null);
  //const [error, setError] = useState(null);


  // Skip fetch for now (comment it out)
  /*
  useEffect(() => {
    // Fetch user data from backend (if needed)
    async function fetchUser() {
      try {
        const res = await fetch('/api/me', { credentials: 'include' });
        if (!res.ok) throw new Error('Auth required');
        setUserData(await res.json());
      } catch (err) {
        console.error(err);
        setError('Authentication required. Please login.');
        //navigate('/login');
      }
    }

    fetchUser();
  }, [navigate]); //navigate remove ??
  

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => navigate('/login')}
          className="mt-6 px-4 py-2 bg-cyan-700 text-white rounded-lg"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST', credentials: 'include' });
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem('authToken');
      setUser(null);
      toast.success('You have been logged out.');
      navigate('/login');
    }
  };
  */

  if (!userData) return <div className="p-6">Loading user info…</div>;

  return (
    <div className="p-6 flex flex-col items-center bg-cyan-50 dark:bg-gray-900 min-h-screen w-full font-lexend">
      <img
        src={userData.avatar || 'https://static.vecteezy.com/system/resources/thumbnails/019/879/186/small_2x/user-icon-on-transparent-background-free-png.png'}
        alt="Profile"
        className="w-32 h-32 object-cover rounded-full mt-4 mb-4 border-2 border-cyan-700 dark:border-cyan-200"
      />
      <h2 className="text-3xl font-semibold mb-4 text-cyan-700 dark:text-cyan-200">{userData.name}</h2>
      <h2 className="text-xl font-bold mb-2 text-cyan-700 dark:text-gray-400">Student at xyz University | Course-Branch</h2>
      <h2 className="text-lg font-bold mb-10 text-cyan-700 dark:text-gray-400">LinkedIn | GitHub | Contact </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">Email: user@gmail.com{userData.email}</p>
      <p className="text-gray-600 dark:text-gray-300 mb-4">Username: user123</p>
      <p className="text-gray-600 dark:text-gray-300 mb-4">📅 Joined: Jan 2024</p>
      <p className="text-gray-600 dark:text-gray-300 mb-4">Flashcards Created: 124 </p>
      <p className="text-gray-600 dark:text-gray-300 mb-4">Decks Created: 3 </p>
      <p className="text-gray-600 dark:text-gray-300 mb-4">📊 Tests Taken: 12</p>
      <p className="text-gray-600 dark:text-gray-300 mb-8">🔥 Learning Streak: 5 days</p>
        
 
  



      {/* Example flashcard list */}
      {userData.flashcards?.length > 0 && (
        <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
          <h3 className="font-semibold mb-2 text-cyan-700 dark:text-cyan-200">Your Flashcards</h3>
          <ul className="list-disc ml-5">
            {userData.flashcards.map((fc, i) => (
              <li key={i} className="text-gray-800 dark:text-gray-200">
                Q: {fc.question} – A: {fc.answer}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Buttons */}
      <div className="space-x-8 mt-4 ">
        <button
          // onClick={() => navigate('/edit-profile')}
          onClick={() => alert('Edit Profile - Not implemented yet')}
          className="px-4 py-3 hover:bg-cyan-800 dark:text-white text-cyan-700 bg-cyan-100 rounded-full border border-cyan-700 hover:text-white active:bg-cyan-700 dark:bg-gray-700 dark:hover:bg-gray-900 dark:border-gray-300 dark:hover:border-cyan-200 dark:hover:text-cyan-200 animate-pulseBorder"
        >
          Edit Profile
        </button>
        <button
          //onClick={handleLogout}
          onClick={() => {
            setUser(null);
            alert('Logged out (dummy)');
          }}
          className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full border border-red-700 dark:bg-red-600 dark:hover:bg-red-700 dark:border-gray-300 dark:hover:border-red-200 dark:hover:text-red-200 animate-pulseBorder"
        >
          Logout
        </button>
      </div>
    </div>
  );
}