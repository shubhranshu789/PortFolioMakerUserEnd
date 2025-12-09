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
import UI7 from '../../Components/UIs/UI7/page';
import UI8 from '../../Components/UIs/UI8/page';
import UI9 from '../../Components/UIs/UI9/page';
import UI10 from '../../Components/UIs/UI10/page';
import UI11 from '../../Components/UIs/UI11/page';
import UI12 from '../../Components/UIs/UI12/page';
import UI13 from '../../Components/UIs/UI13/page';
import UI14 from '../../Components/UIs/UI14/page';
import UI15 from '../../Components/UIs/UI15/page';
import UI16 from '../../Components/UIs/UI16/page';
import UI17 from '../../Components/UIs/UI17/page';
import UI18 from '../../Components/UIs/UI18/page';
import UI19 from '../../Components/UIs/UI19/page';
import UI20 from '../../Components/UIs/UI20/page';

export default function Portfolio() {
  const params = useParams();
  const username = params.username as string; // Extracts "shubh1924" from URL
  const [selectedTemplate, setSelectedTemplate] = useState('UI1');
  const [loading, setLoading] = useState(true);

  // Fetch template when username is available
  useEffect(() => {
    if (username) {
      fetchUserTemplate();
    } else {
      setLoading(false);
    }
  }, [username]);

  const fetchUserTemplate = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/${username}/templates`);
      if (response.ok) {
        const data = await response.json();
        setSelectedTemplate(data.selectedTemplate || 'UI1');
      } else {
        console.error('Failed to fetch template');
        setSelectedTemplate('UI1'); // Fallback
      }
    } catch (error) {
      console.error('Error fetching template:', error);
      setSelectedTemplate('UI1'); // Fallback on error
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

  // Render selected template
  const templates: { [key: string]: JSX.Element } = {
    UI1: <UI1 />,
    UI2: <UI2 />,
    UI3: <UI3 />,
    UI4: <UI4 />,
    UI5: <UI5 />,
    UI6: <UI6 />,
    UI7: <UI7 />,
    UI8: <UI8 />,
    UI9: <UI9 />,
    UI10: <UI10 />,
    UI11: <UI11 />,
    UI12: <UI12 />,
    UI13: <UI13 />,
    UI14: <UI14 />,
    UI15: <UI15 />,
    UI16: <UI16 />,
    UI17: <UI17 />,
    UI18: <UI18 />,
    UI19: <UI19 />,
    UI20: <UI20 />,
  };

  return templates[selectedTemplate] || <UI1 />;
}
