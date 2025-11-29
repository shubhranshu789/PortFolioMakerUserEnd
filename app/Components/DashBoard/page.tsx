'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

import Navbar from "./NavBar/page"
// import "../../Components/Auth/SignIn/page"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('hero');
  const [userData, setUserData] = useState({
    name: '',
    userName: '',
    email: '',
    hero: {
      title: "Hi, I'm a Tech Engineer",
      highlightText: "Tech Engineer",
      subtitle: "I build beautiful, functional web experiences and scalable software solutions.",
      primaryButtonText: "View My Work",
      secondaryButtonText: "Get In Touch"
    },
    aboutMe: {
      sectionTitle: "ABOUT ME",
      headline: "Crafting Digital Excellence",
      introduction: "",
      description: "",
      coreValues: ["Clean, maintainable code", "User-centric design", "Continuous learning"],
      stats: {
        projectsCompleted: 50,
        yearsExperience: 5,
        happyClients: 30,
        techSkills: 15
      }
    },
    skillCategories: [],
    experiences: [],
    projects: [],
    socialLinks: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [username, setUsername] = useState('');


  // Edit states
  const [editingSkillIndex, setEditingSkillIndex] = useState(null);
  const [editingExpIndex, setEditingExpIndex] = useState(null);
  const [editingProjectIndex, setEditingProjectIndex] = useState(null);
  const [editingSocialIndex, setEditingSocialIndex] = useState(null);

  const router = useRouter();

  const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}`;
  // const USERNAME = 'shubh5'; // Make this dynamic later if needed

  useEffect(() => {
    const getUserFromStorage = () => {
      try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          setUsername(user.userName || user.username || '');
          return user.userName || user.username || '';
        }
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
      return '';
    };

    const currentUsername = getUserFromStorage();

    if (currentUsername) {
      fetchUserData(currentUsername);
    } else {
      alert('❌ Please login first');
      setIsFetching(false);

      router.push(`/Components/Auth/SignIn`);

      // Optionally redirect to login page
      // window.location.href = '/login';
    }
  }, []);


  // Fetch user data on component mount
  // useEffect(() => {
  //   fetchUserData();
  // }, []);

  const fetchUserData = async (currentUsername: any) => {
    try {
      setIsFetching(true);
      const response = await fetch(`${API_BASE}/profile/${currentUsername}`);
      if (response.ok) {
        const data = await response.json();
        setUserData({
          name: data.name || '',
          userName: data.userName || '',
          email: data.email || '',
          hero: data.hero || userData.hero,
          aboutMe: data.aboutMe || userData.aboutMe,
          skillCategories: data.skillCategories || [],
          experiences: data.experiences || [],
          projects: data.projects || [],
          socialLinks: data.socialLinks || []
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert('❌ Failed to load user data');
    } finally {
      setIsFetching(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const tabs = [
    { id: 'hero', label: 'Hero Section', icon: '🎯' },
    { id: 'about', label: 'About Me', icon: '👤' },
    { id: 'profile', label: 'Profile', icon: '⚙️' },
    { id: 'skills', label: 'Skills', icon: '💡' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'social', label: 'Social Links', icon: '🔗' }
  ];

  // ============= SKILL CATEGORIES =============
  const [newSkill, setNewSkill] = useState({
    category: '',
    skills: '',
    color: '#3b82f6',
    icon: '💻'
  });





  // ============= HERO SECTION =============
  const handleUpdateHero = async () => {
    if (!username) return;
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/profile/${username}/hero`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData.hero)
      });

      if (response.ok) {
        // alert('✅ Hero section updated!');
      } else {
        alert('❌ Failed to update hero section');
      }
    } catch (error) {
      console.error('Error updating hero:', error);
      alert('❌ Failed to update hero section');
    } finally {
      setIsLoading(false);
    }
  };

  // ============= ABOUT ME SECTION =============
  const handleUpdateAbout = async () => {
    if (!username) return;
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/profile/${username}/about`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData.aboutMe)
      });

      if (response.ok) {
        // alert('✅ About Me section updated!');
      } else {
        alert('❌ Failed to update About Me section');
      }
    } catch (error) {
      console.error('Error updating about:', error);
      alert('❌ Failed to update About Me section');
    } finally {
      setIsLoading(false);
    }
  };

  const addCoreValue = () => {
    const newValue = prompt('Enter a new core value:');
    if (newValue) {
      setUserData({
        ...userData,
        aboutMe: {
          ...userData.aboutMe,
          coreValues: [...userData.aboutMe.coreValues, newValue]
        }
      });
    }
  };

  const removeCoreValue = (index) => {
    setUserData({
      ...userData,
      aboutMe: {
        ...userData.aboutMe,
        coreValues: userData.aboutMe.coreValues.filter((_, i) => i !== index)
      }
    });
  };



  const addSkillCategory = async () => {
    const skillsArray = newSkill.skills.split(',').map(s => s.trim()).filter(s => s);
    if (newSkill.category && skillsArray.length > 0 && username) {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE}/profile/${username}/skills`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category: newSkill.category,
            skills: skillsArray,
            color: newSkill.color,
            icon: newSkill.icon
          })
        });

        if (response.ok) {
          const updatedUser = await response.json();
          setUserData(updatedUser);
          setNewSkill({ category: '', skills: '', color: '#3b82f6', icon: '💻' });
          // alert('✅ Skill category added!');
        } else {
          alert('❌ Failed to add skill category');
        }
      } catch (error) {
        console.error('Error adding skill:', error);
        alert('❌ Failed to add skill category');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const updateSkillCategory = async (index) => {
    if (!username) return;
    const category = userData.skillCategories[index];
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/profile/${username}/skills/${index}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUserData(updatedUser);
        setEditingSkillIndex(null);
        // alert('✅ Skill category updated!');
      } else {
        alert('❌ Failed to update skill category');
      }
    } catch (error) {
      console.error('Error updating skill:', error);
      alert('❌ Failed to update skill category');
    } finally {
      setIsLoading(false);
    }
  };

  const removeSkillCategory = async (index) => {
    if (!username) return;
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/profile/${username}/skills/${index}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUserData(updatedUser);
        // alert('✅ Skill category removed!');
      } else {
        alert('❌ Failed to remove skill category');
      }
    } catch (error) {
      console.error('Error removing skill:', error);
      alert('❌ Failed to remove skill category');
    } finally {
      setIsLoading(false);
    }
  };

  // ============= EXPERIENCES =============
  const [newExperience, setNewExperience] = useState({
    role: '',
    company: '',
    period: '',
    description: '',
    skills: ''
  });

  const addExperience = async () => {
    const skillsArray = newExperience.skills.split(',').map(s => s.trim()).filter(s => s);
    if (newExperience.role && newExperience.company) {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE}/profile/${username}/experience`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            role: newExperience.role,
            company: newExperience.company,
            period: newExperience.period,
            description: newExperience.description,
            skills: skillsArray
          })
        });

        if (response.ok) {
          const updatedUser = await response.json();
          setUserData(updatedUser);
          setNewExperience({ role: '', company: '', period: '', description: '', skills: '' });
          // alert('✅ Experience added!');
        } else {
          alert('❌ Failed to add experience');
        }
      } catch (error) {
        console.error('Error adding experience:', error);
        alert('❌ Failed to add experience');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const updateExperience = async (index) => {
    if (!username) return;
    const exp = userData.experiences[index];
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/profile/${username}/experience/${index}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exp)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUserData(updatedUser);
        setEditingExpIndex(null);
        // alert('✅ Experience updated!');
      } else {
        alert('❌ Failed to update experience');
      }
    } catch (error) {
      console.error('Error updating experience:', error);
      alert('❌ Failed to update experience');
    } finally {
      setIsLoading(false);
    }
  };

  const removeExperience = async (index) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/profile/${username}/experience/${index}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUserData(updatedUser);
        // alert('✅ Experience removed!');
      } else {
        alert('❌ Failed to remove experience');
      }
    } catch (error) {
      console.error('Error removing experience:', error);
      alert('❌ Failed to remove experience');
    } finally {
      setIsLoading(false);
    }
  };

  // ============= PROJECTS =============
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image: '',
    tags: '',
    links: { live: '', github: '' }
  });

  const addProject = async () => {
    const tagsArray = newProject.tags.split(',').map(t => t.trim()).filter(t => t);
    if (newProject.title && newProject.description) {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE}/profile/${username}/projects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: newProject.title,
            description: newProject.description,
            image: newProject.image,
            tags: tagsArray,
            links: newProject.links
          })
        });

        if (response.ok) {
          const updatedUser = await response.json();
          setUserData(updatedUser);
          setNewProject({ title: '', description: '', image: '', tags: '', links: { live: '', github: '' } });
          // alert('✅ Project added!');
        } else {
          alert('❌ Failed to add project');
        }
      } catch (error) {
        console.error('Error adding project:', error);
        alert('❌ Failed to add project');
      } finally {
        setIsLoading(false);
      }
    }
  };


  const updateProject = async (index) => {
    if (!username) return;
    const project = userData.projects[index];
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/profile/${username}/projects/${index}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUserData(updatedUser);
        setEditingProjectIndex(null);
        // alert('✅ Project updated!');
      } else {
        alert('❌ Failed to update project');
      }
    } catch (error) {
      console.error('Error updating project:', error);
      alert('❌ Failed to update project');
    } finally {
      setIsLoading(false);
    }
  };

  const removeProject = async (index) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/profile/${username}/projects/${index}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUserData(updatedUser);
        // alert('✅ Project removed!');
      } else {
        alert('❌ Failed to remove project');
      }
    } catch (error) {
      console.error('Error removing project:', error);
      alert('❌ Failed to remove project');
    } finally {
      setIsLoading(false);
    }
  };

  // ============= SOCIAL LINKS =============
  const [newSocial, setNewSocial] = useState({
    icon: '🔗',
    label: '',
    href: '',
    color: '#3b82f6'
  });

  const addSocialLink = async () => {
    if (newSocial.label && newSocial.href) {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE}/profile/${username}/social`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newSocial)
        });

        if (response.ok) {
          const updatedUser = await response.json();
          setUserData(updatedUser);
          setNewSocial({ icon: '🔗', label: '', href: '', color: '#3b82f6' });
          // alert('✅ Social link added!');
        } else {
          alert('❌ Failed to add social link');
        }
      } catch (error) {
        console.error('Error adding social link:', error);
        alert('❌ Failed to add social link');
      } finally {
        setIsLoading(false);
      }
    }
  };


  const updateSocialLink = async (index) => {
    if (!username) return;
    const social = userData.socialLinks[index];
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/profile/${username}/social/${index}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(social)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUserData(updatedUser);
        setEditingSocialIndex(null);
        // alert('✅ Social link updated!');
      } else {
        alert('❌ Failed to update social link');
      }
    } catch (error) {
      console.error('Error updating social link:', error);
      alert('❌ Failed to update social link');
    } finally {
      setIsLoading(false);
    }
  };

  const removeSocialLink = async (index) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/profile/${username}/social/${index}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUserData(updatedUser);
        // alert('✅ Social link removed!');
      } else {
        alert('❌ Failed to remove social link');
      }
    } catch (error) {
      console.error('Error removing social link:', error);
      alert('❌ Failed to remove social link');
    } finally {
      setIsLoading(false);
    }
  };

  // ============= UPDATE PROFILE =============
  const handleSaveAll = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/profile/${username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email
        })
      });
      if (response.ok) {
        // alert('✅ Profile updated successfully!');
      } else {
        alert('❌ Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('❌ Error updating profile');
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (isFetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl font-semibold">Loading Dashboard...</p>
        </motion.div>
      </div>
    );
  }


  if (!username) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-slate-800 p-8 rounded-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Please Login First</h2>
          <p className="text-gray-400 mb-6">You need to be logged in to access the dashboard.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >


          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
              Dashboard
            </h1>
            <p className="text-gray-400">Welcome back, {userData.name || 'User'}! 👋</p>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto gap-2 mb-8 pb-2 scrollbar-hide">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-purple-500/50'
                  : 'bg-slate-800/50 hover:bg-slate-800'
                  }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>





          {/* Content Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl border border-slate-700"

            >

              {/* Hero Section Tab */}
              {activeTab === 'hero' && (
                <motion.div variants={itemVariants} className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Hero Section</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Main Title</label>
                      <input
                        type="text"
                        value={userData.hero.title}
                        onChange={(e) => setUserData({
                          ...userData,
                          hero: { ...userData.hero, title: e.target.value }
                        })}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="Hi, I'm a Tech Engineer"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Highlight Text</label>
                      <input
                        type="text"
                        value={userData.hero.highlightText}
                        onChange={(e) => setUserData({
                          ...userData,
                          hero: { ...userData.hero, highlightText: e.target.value }
                        })}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="Tech Engineer"
                      />
                      <p className="text-xs text-gray-500 mt-1">This text will be highlighted in purple</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Subtitle</label>
                      <textarea
                        value={userData.hero.subtitle}
                        onChange={(e) => setUserData({
                          ...userData,
                          hero: { ...userData.hero, subtitle: e.target.value }
                        })}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="I build beautiful, functional web experiences..."
                        rows={3}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Primary Button Text</label>
                        <input
                          type="text"
                          value={userData.hero.primaryButtonText}
                          onChange={(e) => setUserData({
                            ...userData,
                            hero: { ...userData.hero, primaryButtonText: e.target.value }
                          })}
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                          placeholder="View My Work"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Secondary Button Text</label>
                        <input
                          type="text"
                          value={userData.hero.secondaryButtonText}
                          onChange={(e) => setUserData({
                            ...userData,
                            hero: { ...userData.hero, secondaryButtonText: e.target.value }
                          })}
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                          placeholder="Get In Touch"
                        />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleUpdateHero}
                      disabled={isLoading}
                      className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? '💾 Updating...' : '💾 Update Hero Section'}
                    </motion.button>
                  </div>
                </motion.div>
              )}



              {/* About Me Tab */}
              {activeTab === 'about' && (
                <motion.div variants={itemVariants} className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">About Me Section</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Section Title</label>
                      <input
                        type="text"
                        value={userData.aboutMe.sectionTitle}
                        onChange={(e) => setUserData({
                          ...userData,
                          aboutMe: { ...userData.aboutMe, sectionTitle: e.target.value }
                        })}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="ABOUT ME"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Headline</label>
                      <input
                        type="text"
                        value={userData.aboutMe.headline}
                        onChange={(e) => setUserData({
                          ...userData,
                          aboutMe: { ...userData.aboutMe, headline: e.target.value }
                        })}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="Crafting Digital Excellence"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Introduction</label>
                      <textarea
                        value={userData.aboutMe.introduction}
                        onChange={(e) => setUserData({
                          ...userData,
                          aboutMe: { ...userData.aboutMe, introduction: e.target.value }
                        })}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="I'm a fullstack developer with 5+ years of experience..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Description</label>
                      <textarea
                        value={userData.aboutMe.description}
                        onChange={(e) => setUserData({
                          ...userData,
                          aboutMe: { ...userData.aboutMe, description: e.target.value }
                        })}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="My journey in tech started with a passion..."
                        rows={3}
                      />
                    </div>

                    {/* Core Values */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-gray-300">Core Values</label>
                        <button
                          onClick={addCoreValue}
                          className="px-3 py-1 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-lg text-sm transition"
                        >
                          ➕ Add Value
                        </button>
                      </div>
                      <div className="space-y-2">
                        {userData.aboutMe.coreValues.map((value, index) => (
                          <div key={index} className="flex items-center gap-2 p-3 bg-slate-900/50 rounded-lg border border-slate-600">
                            <span className="text-pink-400">●</span>
                            <input
                              type="text"
                              value={value}
                              onChange={(e) => {
                                const newValues = [...userData.aboutMe.coreValues];
                                newValues[index] = e.target.value;
                                setUserData({
                                  ...userData,
                                  aboutMe: { ...userData.aboutMe, coreValues: newValues }
                                });
                              }}
                              className="flex-1 bg-transparent border-none focus:outline-none text-gray-300"
                            />
                            <button
                              onClick={() => removeCoreValue(index)}
                              className="text-red-400 hover:text-red-300 transition"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Projects Completed</label>
                        <input
                          type="number"
                          value={userData.aboutMe.stats.projectsCompleted}
                          onChange={(e) => setUserData({
                            ...userData,
                            aboutMe: {
                              ...userData.aboutMe,
                              stats: { ...userData.aboutMe.stats, projectsCompleted: parseInt(e.target.value) || 0 }
                            }
                          })}
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Years Experience</label>
                        <input
                          type="number"
                          value={userData.aboutMe.stats.yearsExperience}
                          onChange={(e) => setUserData({
                            ...userData,
                            aboutMe: {
                              ...userData.aboutMe,
                              stats: { ...userData.aboutMe.stats, yearsExperience: parseInt(e.target.value) || 0 }
                            }
                          })}
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Happy Clients</label>
                        <input
                          type="number"
                          value={userData.aboutMe.stats.happyClients}
                          onChange={(e) => setUserData({
                            ...userData,
                            aboutMe: {
                              ...userData.aboutMe,
                              stats: { ...userData.aboutMe.stats, happyClients: parseInt(e.target.value) || 0 }
                            }
                          })}
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Tech Skills</label>
                        <input
                          type="number"
                          value={userData.aboutMe.stats.techSkills}
                          onChange={(e) => setUserData({
                            ...userData,
                            aboutMe: {
                              ...userData.aboutMe,
                              stats: { ...userData.aboutMe.stats, techSkills: parseInt(e.target.value) || 0 }
                            }
                          })}
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleUpdateAbout}
                      disabled={isLoading}
                      className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? '💾 Updating...' : '💾 Update About Me Section'}
                    </motion.button>
                  </div>
                </motion.div>
              )}


              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <motion.div variants={itemVariants} className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Full Name</label>
                      <input
                        type="text"
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Username</label>
                      <input
                        type="text"
                        value={userData.userName}
                        disabled
                        className="w-full px-4 py-3 bg-slate-900/80 border border-slate-600 rounded-lg opacity-60 cursor-not-allowed"
                        placeholder="johndoe"
                      />
                      <p className="text-xs text-gray-500 mt-1">Username cannot be changed</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        className="opacity-60 cursor-not-allowed w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="john@example.com"
                        disabled
                      />
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>

                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSaveAll}
                    disabled={isLoading}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? '💾 Updating...' : '💾 Update Profile'}
                  </motion.button>
                </motion.div>
              )}

              {/* Skills Tab */}
              {/* Skills Tab */}
              {activeTab === 'skills' && (
                <motion.div variants={itemVariants} className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Skill Categories</h2>

                  {/* Add New Skill Category */}
                  <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-600">
                    <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={newSkill.category}
                        onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                        className="px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Category (e.g., Frontend)"
                      />
                      <input
                        type="text"
                        value={newSkill.skills}
                        onChange={(e) => setNewSkill({ ...newSkill, skills: e.target.value })}
                        className="px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Skills (comma-separated)"
                      />
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-xs text-gray-400 mb-1">Icon</label>
                          <input
                            type="text"
                            value={newSkill.icon}
                            onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg"
                            placeholder="💻"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs text-gray-400 mb-1">Color</label>
                          <input
                            type="color"
                            value={newSkill.color}
                            onChange={(e) => setNewSkill({ ...newSkill, color: e.target.value })}
                            className="w-full h-[52px] bg-slate-800 border border-slate-600 rounded-lg cursor-pointer"
                          />
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={addSkillCategory}
                        disabled={isLoading}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-medium hover:shadow-lg transition disabled:opacity-50"
                      >
                        {isLoading ? '⏳ Adding...' : '➕ Add Category'}
                      </motion.button>
                    </div>
                  </div>

                  {/* Display Skill Categories */}
                  {userData.skillCategories.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      <p className="text-lg">No skills added yet. Start by adding your first skill category! 🚀</p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      {userData.skillCategories.map((category, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-slate-900/50 p-5 rounded-xl border border-slate-600 relative group"
                        >
                          <div className="absolute top-3 right-3 flex gap-2">
                            {editingSkillIndex === index ? (
                              <>
                                <button
                                  onClick={() => updateSkillCategory(index)}
                                  disabled={isLoading}
                                  className="bg-green-500/20 hover:bg-green-500 text-green-300 hover:text-white px-3 py-1 rounded-lg text-sm transition disabled:opacity-50"
                                >
                                  💾 Save
                                </button>
                                <button
                                  onClick={() => setEditingSkillIndex(null)}
                                  className="bg-gray-500/20 hover:bg-gray-500 text-gray-300 hover:text-white px-3 py-1 rounded-lg text-sm transition"
                                >
                                  ✕ Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => setEditingSkillIndex(index)}
                                  className="bg-blue-500/20 hover:bg-blue-500 text-blue-300 hover:text-white px-3 py-1 rounded-lg text-sm transition"
                                >
                                  ✏️ Edit
                                </button>
                                <button
                                  onClick={() => removeSkillCategory(index)}
                                  disabled={isLoading}
                                  className="bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white px-3 py-1 rounded-lg text-sm transition disabled:opacity-50"
                                >
                                  🗑️
                                </button>
                              </>
                            )}
                          </div>

                          {editingSkillIndex === index ? (
                            <div className="space-y-3 pr-32">
                              <input
                                type="text"
                                value={category.category}
                                onChange={(e) => {
                                  const newCategories = [...userData.skillCategories];
                                  newCategories[index].category = e.target.value;
                                  setUserData({ ...userData, skillCategories: newCategories });
                                }}
                                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm"
                              />
                              <input
                                type="text"
                                value={category.skills.join(', ')}
                                onChange={(e) => {
                                  const newCategories = [...userData.skillCategories];
                                  newCategories[index].skills = e.target.value.split(',').map(s => s.trim());
                                  setUserData({ ...userData, skillCategories: newCategories });
                                }}
                                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm"
                              />
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={category.icon}
                                  onChange={(e) => {
                                    const newCategories = [...userData.skillCategories];
                                    newCategories[index].icon = e.target.value;
                                    setUserData({ ...userData, skillCategories: newCategories });
                                  }}
                                  className="w-20 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm"
                                />
                                <input
                                  type="color"
                                  value={category.color}
                                  onChange={(e) => {
                                    const newCategories = [...userData.skillCategories];
                                    newCategories[index].color = e.target.value;
                                    setUserData({ ...userData, skillCategories: newCategories });
                                  }}
                                  className="w-20 h-10 bg-slate-800 border border-slate-600 rounded-lg cursor-pointer"
                                />
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-center gap-3 mb-3">
                                <span className="text-3xl">{category.icon}</span>
                                <h3 className="text-xl font-bold" style={{ color: category.color }}>
                                  {category.category}
                                </h3>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 bg-slate-700 rounded-full text-sm"
                                    style={{ borderLeft: `3px solid ${category.color}` }}
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Experience Tab - Similar pattern */}
              {activeTab === 'experience' && (
                <motion.div variants={itemVariants} className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Work Experience</h2>

                  {/* Add New Experience Form */}
                  <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-600">
                    <h3 className="text-lg font-semibold mb-4">Add New Experience</h3>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={newExperience.role}
                          onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
                          className="px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="Job Role"
                        />
                        <input
                          type="text"
                          value={newExperience.company}
                          onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                          className="px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="Company Name"
                        />
                      </div>
                      <input
                        type="text"
                        value={newExperience.period}
                        onChange={(e) => setNewExperience({ ...newExperience, period: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Period (e.g., Jan 2023 - Present)"
                      />
                      <textarea
                        value={newExperience.description}
                        onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Job Description"
                        rows={3}
                      />
                      <input
                        type="text"
                        value={newExperience.skills}
                        onChange={(e) => setNewExperience({ ...newExperience, skills: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Skills used (comma-separated)"
                      />
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={addExperience}
                        disabled={isLoading}
                        className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-medium hover:shadow-lg transition disabled:opacity-50"
                      >
                        {isLoading ? '⏳ Adding...' : '➕ Add Experience'}
                      </motion.button>
                    </div>
                  </div>

                  {/* Display Experiences with Edit */}
                  {userData.experiences.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      <p className="text-lg">No experience added yet. Add your professional journey! 💼</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userData.experiences.map((exp, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-slate-900/50 p-6 rounded-xl border border-slate-600 relative"
                        >
                          <div className="absolute top-4 right-4 flex gap-2">
                            {editingExpIndex === index ? (
                              <>
                                <button
                                  onClick={() => updateExperience(index)}
                                  disabled={isLoading}
                                  className="bg-green-500/20 hover:bg-green-500 text-green-300 hover:text-white px-3 py-1 rounded-lg text-sm transition disabled:opacity-50"
                                >
                                  💾 Save
                                </button>
                                <button
                                  onClick={() => setEditingExpIndex(null)}
                                  className="bg-gray-500/20 hover:bg-gray-500 text-gray-300 hover:text-white px-3 py-1 rounded-lg text-sm transition"
                                >
                                  ✕ Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => setEditingExpIndex(index)}
                                  className="bg-blue-500/20 hover:bg-blue-500 text-blue-300 hover:text-white px-3 py-1 rounded-lg text-sm transition"
                                >
                                  ✏️ Edit
                                </button>
                                <button
                                  onClick={() => removeExperience(index)}
                                  disabled={isLoading}
                                  className="bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white px-3 py-1 rounded-lg text-sm transition disabled:opacity-50"
                                >
                                  🗑️
                                </button>
                              </>
                            )}
                          </div>

                          {editingExpIndex === index ? (
                            <div className="space-y-3 pr-40">
                              <input
                                type="text"
                                value={exp.role}
                                onChange={(e) => {
                                  const newExps = [...userData.experiences];
                                  newExps[index].role = e.target.value;
                                  setUserData({ ...userData, experiences: newExps });
                                }}
                                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg"
                                placeholder="Role"
                              />
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => {
                                  const newExps = [...userData.experiences];
                                  newExps[index].company = e.target.value;
                                  setUserData({ ...userData, experiences: newExps });
                                }}
                                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg"
                                placeholder="Company"
                              />
                              <input
                                type="text"
                                value={exp.period}
                                onChange={(e) => {
                                  const newExps = [...userData.experiences];
                                  newExps[index].period = e.target.value;
                                  setUserData({ ...userData, experiences: newExps });
                                }}
                                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg"
                                placeholder="Period"
                              />
                              <textarea
                                value={exp.description}
                                onChange={(e) => {
                                  const newExps = [...userData.experiences];
                                  newExps[index].description = e.target.value;
                                  setUserData({ ...userData, experiences: newExps });
                                }}
                                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg"
                                placeholder="Description"
                                rows={3}
                              />
                              <input
                                type="text"
                                value={exp.skills.join(', ')}
                                onChange={(e) => {
                                  const newExps = [...userData.experiences];
                                  newExps[index].skills = e.target.value.split(',').map(s => s.trim());
                                  setUserData({ ...userData, experiences: newExps });
                                }}
                                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg"
                                placeholder="Skills (comma-separated)"
                              />
                            </div>
                          ) : (
                            <>
                              <h3 className="text-xl font-bold text-blue-400 mb-1">{exp.role}</h3>
                              <p className="text-gray-300 mb-2">{exp.company} • {exp.period}</p>
                              <p className="text-gray-400 mb-3">{exp.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {exp.skills.map((skill, idx) => (
                                  <span key={idx} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Projects Tab */}
              {activeTab === 'projects' && (
                <motion.div variants={itemVariants} className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Projects</h2>

                  {/* Add New Project */}
                  <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-600">
                    <h3 className="text-lg font-semibold mb-4">Add New Project</h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Project Title"
                      />
                      <textarea
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Project Description"
                        rows={3}
                      />
                      <input
                        type="text"
                        value={newProject.image}
                        onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Image URL"
                      />
                      <input
                        type="text"
                        value={newProject.tags}
                        onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Tags (comma-separated)"
                      />
                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={newProject.links.live}
                          onChange={(e) => setNewProject({ ...newProject, links: { ...newProject.links, live: e.target.value } })}
                          className="px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="Live URL"
                        />
                        <input
                          type="text"
                          value={newProject.links.github}
                          onChange={(e) => setNewProject({ ...newProject, links: { ...newProject.links, github: e.target.value } })}
                          className="px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="GitHub URL"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={addProject}
                        disabled={isLoading}
                        className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-medium hover:shadow-lg transition disabled:opacity-50"
                      >
                        {isLoading ? '⏳ Adding...' : '➕ Add Project'}
                      </motion.button>
                    </div>
                  </div>

                  {/* Display Projects */}
                  {userData.projects.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      <p className="text-lg">No projects added yet. Showcase your work! 🚀</p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                      {userData.projects.map((project, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-slate-900/50 rounded-xl border border-slate-600 overflow-hidden relative group"
                        >
                          <div className="absolute top-4 right-4 z-10 flex gap-2">
                            {editingProjectIndex === index ? (
                              <>
                                <button
                                  onClick={() => updateProject(index)}
                                  disabled={isLoading}
                                  className="bg-green-500/90 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm transition disabled:opacity-50"
                                >
                                  💾 Save
                                </button>
                                <button
                                  onClick={() => setEditingProjectIndex(null)}
                                  className="bg-gray-500/90 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-sm transition"
                                >
                                  ✕ Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => setEditingProjectIndex(index)}
                                  className="bg-blue-500/90 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition"
                                >
                                  ✏️ Edit
                                </button>
                                <button
                                  onClick={() => removeProject(index)}
                                  disabled={isLoading}
                                  className="bg-red-500/90 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition disabled:opacity-50"
                                >
                                  🗑️
                                </button>
                              </>
                            )}
                          </div>

                          {editingProjectIndex === index ? (
                            <div className="p-5 space-y-3">
                              <input
                                type="text"
                                value={project.image}
                                onChange={(e) => {
                                  const newProjects = [...userData.projects];
                                  newProjects[index].image = e.target.value;
                                  setUserData({ ...userData, projects: newProjects });
                                }}
                                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm"
                                placeholder="Image URL"
                              />
                              <input
                                type="text"
                                value={project.title}
                                onChange={(e) => {
                                  const newProjects = [...userData.projects];
                                  newProjects[index].title = e.target.value;
                                  setUserData({ ...userData, projects: newProjects });
                                }}
                                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg"
                                placeholder="Title"
                              />
                              <textarea
                                value={project.description}
                                onChange={(e) => {
                                  const newProjects = [...userData.projects];
                                  newProjects[index].description = e.target.value;
                                  setUserData({ ...userData, projects: newProjects });
                                }}
                                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm"
                                placeholder="Description"
                                rows={3}
                              />
                              <input
                                type="text"
                                value={project.tags.join(', ')}
                                onChange={(e) => {
                                  const newProjects = [...userData.projects];
                                  newProjects[index].tags = e.target.value.split(',').map(t => t.trim());
                                  setUserData({ ...userData, projects: newProjects });
                                }}
                                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm"
                                placeholder="Tags (comma-separated)"
                              />
                              <div className="grid grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  value={project.links.live}
                                  onChange={(e) => {
                                    const newProjects = [...userData.projects];
                                    newProjects[index].links.live = e.target.value;
                                    setUserData({ ...userData, projects: newProjects });
                                  }}
                                  className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm"
                                  placeholder="Live URL"
                                />
                                <input
                                  type="text"
                                  value={project.links.github}
                                  onChange={(e) => {
                                    const newProjects = [...userData.projects];
                                    newProjects[index].links.github = e.target.value;
                                    setUserData({ ...userData, projects: newProjects });
                                  }}
                                  className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm"
                                  placeholder="GitHub URL"
                                />
                              </div>
                            </div>
                          ) : (
                            <>
                              {project.image && (
                                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                              )}
                              <div className="p-5">
                                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                <p className="text-gray-400 mb-3 text-sm">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {project.tags.map((tag, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                <div className="flex gap-3">
                                  {project.links.live && (
                                    <a href={project.links.live} target="_blank" rel="noopener noreferrer"
                                      className="text-blue-400 hover:text-blue-300 text-sm">
                                      🌐 Live
                                    </a>
                                  )}
                                  {project.links.github && (
                                    <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                                      className="text-blue-400 hover:text-blue-300 text-sm">
                                      💻 GitHub
                                    </a>
                                  )}
                                </div>
                              </div>
                            </>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}


              {/* Social Links Tab */}
{activeTab === 'social' && (
  <motion.div variants={itemVariants} className="space-y-6">
    <h2 className="text-2xl font-bold mb-6">Social Links</h2>

    {/* Add New Social Link */}
    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-600">
      <h3 className="text-lg font-semibold mb-4">Add New Social Link</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs text-gray-400 mb-1">Icon</label>
            <input
              type="text"
              value={newSocial.icon}
              onChange={(e) => setNewSocial({ ...newSocial, icon: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg"
              placeholder="🔗"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-gray-400 mb-1">Color</label>
            <input
              type="color"
              value={newSocial.color}
              onChange={(e) => setNewSocial({ ...newSocial, color: e.target.value })}
              className="w-full h-[52px] bg-slate-800 border border-slate-600 rounded-lg cursor-pointer"
            />
          </div>
        </div>
        <input
          type="text"
          value={newSocial.label}
          onChange={(e) => setNewSocial({ ...newSocial, label: e.target.value })}
          className="px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Platform (e.g., LinkedIn)"
        />
        <input
          type="text"
          value={newSocial.href}
          onChange={(e) => setNewSocial({ ...newSocial, href: e.target.value })}
          className="px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 md:col-span-2"
          placeholder="Profile URL"
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={addSocialLink}
          disabled={isLoading}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-medium hover:shadow-lg transition md:col-span-2 disabled:opacity-50"
        >
          {isLoading ? '⏳ Adding...' : '➕ Add Social Link'}
        </motion.button>
      </div>
    </div>

    {/* Display Social Links */}
    {userData.socialLinks.length === 0 ? (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg">No social links added yet. Connect your profiles! 🔗</p>
      </div>
    ) : (
      <div className="grid md:grid-cols-3 gap-4">
        {userData.socialLinks.map((social, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: editingSocialIndex === index ? 1 : 1.05 }}
            className="bg-slate-900/50 p-5 rounded-xl border border-slate-600 relative group"
            style={{ borderLeft: editingSocialIndex === index ? `4px solid #6b7280` : `4px solid ${social.color}` }}
          >
            <div className="absolute top-2 right-2 flex gap-1">
              {editingSocialIndex === index ? (
                <>
                  <button
                    onClick={() => updateSocialLink(index)}
                    disabled={isLoading}
                    className="bg-green-500/90 hover:bg-green-600 text-white px-2 py-1 rounded text-xs transition disabled:opacity-50"
                  >
                    💾
                  </button>
                  <button
                    onClick={() => setEditingSocialIndex(null)}
                    className="bg-gray-500/90 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs transition"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setEditingSocialIndex(index)}
                    className="bg-blue-500/20 hover:bg-blue-500 text-blue-300 hover:text-white px-2 py-1 rounded text-xs transition"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => removeSocialLink(index)}
                    disabled={isLoading}
                    className="bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white px-2 py-1 rounded text-xs transition disabled:opacity-50"
                  >
                    🗑️
                  </button>
                </>
              )}
            </div>

            {editingSocialIndex === index ? (
              <div className="space-y-3 pr-16">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={social.icon}
                    onChange={(e) => {
                      const newSocials = [...userData.socialLinks];
                      newSocials[index].icon = e.target.value;
                      setUserData({ ...userData, socialLinks: newSocials });
                    }}
                    className="w-16 px-2 py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm text-center"
                    placeholder="🔗"
                  />
                  <input
                    type="color"
                    value={social.color}
                    onChange={(e) => {
                      const newSocials = [...userData.socialLinks];
                      newSocials[index].color = e.target.value;
                      setUserData({ ...userData, socialLinks: newSocials });
                    }}
                    className="w-16 h-10 bg-slate-800 border border-slate-600 rounded-lg cursor-pointer"
                  />
                </div>
                <input
                  type="text"
                  value={social.label}
                  onChange={(e) => {
                    const newSocials = [...userData.socialLinks];
                    newSocials[index].label = e.target.value;
                    setUserData({ ...userData, socialLinks: newSocials });
                  }}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm"
                  placeholder="Label"
                />
                <input
                  type="text"
                  value={social.href}
                  onChange={(e) => {
                    const newSocials = [...userData.socialLinks];
                    newSocials[index].href = e.target.value;
                    setUserData({ ...userData, socialLinks: newSocials });
                  }}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm"
                  placeholder="URL"
                />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-3xl">{social.icon}</span>
                <div>
                  <h3 className="font-bold" style={{ color: social.color }}>
                    {social.label}
                  </h3>
                  <p className="text-xs text-gray-400 truncate max-w-[150px]">{social.href}</p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    )}
  </motion.div>
)}








            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>

  );
}
