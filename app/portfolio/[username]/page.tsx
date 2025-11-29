// app/portfolio/[username]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import UI1 from '../../Components/UIs/UI1/page';
import UI2 from '../../Components/UIs/UI2/page';
import UI3 from '../../Components/UIs/UI3/page';
import UI4 from '../../Components/UIs/UI4/page';
import UI5 from '../../Components/UIs/UI5/page';
import UI6 from '../../Components/UIs/UI6/page';

export default function Portfolio() {
  const params = useParams();
  const username = params.username as string;
  const [selectedTemplate, setSelectedTemplate] = useState('UI1');
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    checkUserAuthorization();
  }, [username]);

  const checkUserAuthorization = async () => {
    try {
      // Get user data from localStorage
      const storedUser = localStorage.getItem('user');
      
      if (!storedUser) {
        setIsAuthorized(false);
        setLoading(false);
        return;
      }

      const userData = JSON.parse(storedUser);
      const storedUsername = userData.userName || userData.username;

      // Check if URL username matches localStorage username
      if (storedUsername !== username) {
        setIsAuthorized(false);
        setLoading(false);
        return;
      }

      // If authorized, fetch the template
      setIsAuthorized(true);
      await fetchUserTemplate();
    } catch (error) {
      console.error('Error checking authorization:', error);
      setIsAuthorized(false);
      setLoading(false);
    }
  };

  const fetchUserTemplate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/profile/${username}/templates`);
      if (response.ok) {
        const data = await response.json();
        setSelectedTemplate(data.selectedTemplate || 'UI1');
      }
    } catch (error) {
      console.error('Error fetching template:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading portfolio...</div>
      </div>
    );
  }

  // Show "User Not Found" if not authorized
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-4xl font-bold mb-4">Data Not Found!!!</h1>
          <p className="text-gray-400 text-lg">You are not authorized to access this portfolio.</p>
        </div>
      </div>
    );
  }

  // Render selected template
  const templates: { [key: string]: JSX.Element } = {
    UI1: <UI1 />,
    UI2: <UI2 />,
    UI3: <UI3 />,
    UI4: <UI4 />,
    UI5: <UI5 />,
    UI6: <UI6 />,
  };

  return templates[selectedTemplate] || <UI1 />;
}
