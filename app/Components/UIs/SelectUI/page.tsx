'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, ExternalLink, Maximize2 } from 'lucide-react';

import NavBar from '../../DashBoard/NavBar/page';

interface Template {
  templateId: string;
  name: string;
  description: string;
  thumbnail: string;
  features: string[];
  isInCollection?: boolean;
  isActive?: boolean;
}

export default function TemplateGallery() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [userTemplates, setUserTemplates] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}`;

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setUsername(user.userName);
      fetchTemplates(user.userName);
      fetchUserTemplates(user.userName);
    }
  }, []);

  const fetchTemplates = async (userName: string) => {
    try {
      const response = await fetch(`${API_BASE}/templates`);
      const data = await response.json();
      setTemplates(data);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const fetchUserTemplates = async (userName: string) => {
    try {
      const response = await fetch(`${API_BASE}/profile/${userName}/templates`);
      const data = await response.json();
      setUserTemplates(data);
    } catch (error) {
      console.error('Error fetching user templates:', error);
    }
  };

  const addTemplate = async (templateId: string, name: string, description: string) => {
    if (!username) return;
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/profile/${username}/templates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId, name, description, thumbnail: '' })
      });

      if (response.ok) {
        alert('✅ Template added to your collection!');
        fetchUserTemplates(username);
        setShowPreview(false);
      } else {
        const error = await response.json();
        alert(`❌ ${error.message}`);
      }
    } catch (error) {
      console.error('Error adding template:', error);
      alert('❌ Failed to add template');
    } finally {
      setIsLoading(false);
    }
  };

  const switchTemplate = async (templateId: string) => {
    if (!username) return;
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/profile/${username}/templates/active`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId })
      });

      if (response.ok) {
        alert('✅ Template switched successfully!');
        fetchUserTemplates(username);
        window.open(`/portfolio/${username}`, '_blank');
      } else {
        const error = await response.json();
        alert(`❌ ${error.message}`);
      }
    } catch (error) {
      console.error('Error switching template:', error);
      alert('❌ Failed to switch template');
    } finally {
      setIsLoading(false);
    }
  };

  const removeTemplate = async (templateId: string) => {
    if (!username) return;
    if (!confirm('Are you sure you want to remove this template?')) return;

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/profile/${username}/templates/${templateId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('✅ Template removed!');
        fetchUserTemplates(username);
      } else {
        const error = await response.json();
        alert(`❌ ${error.message}`);
      }
    } catch (error) {
      console.error('Error removing template:', error);
      alert('❌ Failed to remove template');
    } finally {
      setIsLoading(false);
    }
  };

  const openPreview = (template: Template) => {
    setPreviewTemplate(template);
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
    setPreviewTemplate(null);
  };

  const isInCollection = (templateId: string) => {
    return userTemplates.availableTemplates?.some((t: any) => t.templateId === templateId);
  };

  const isActiveTemplate = (templateId: string) => {
    return userTemplates.selectedTemplate === templateId;
  };

  // Get preview URL for template
  const getPreviewUrl = (templateId: string) => {
    return `/Components/UIs/${templateId}/page`;
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 sm:p-8 pt-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Choose Your Portfolio Template
            </h1>
            <p className="text-gray-400 text-lg">
              Select from our collection of professionally designed templates
            </p>
          </motion.div>

          {/* Current Active Template */}
          {userTemplates.selectedTemplate && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-12 p-6 bg-green-500/10 border border-green-500/30 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">✓</span>
                <h3 className="text-xl font-bold text-green-400">Current Active Template</h3>
              </div>
              <p className="text-gray-300">
                Your portfolio is currently using: <span className="font-bold text-white">{userTemplates.selectedTemplate}</span>
              </p>
            </motion.div>
          )}

          {/* Template Gallery */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, index) => {
              const inCollection = isInCollection(template.templateId);
              const isActive = isActiveTemplate(template.templateId);

              return (
                <motion.div
                  key={template.templateId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative"
                >
                  <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700 overflow-hidden hover:border-purple-500/50 transition-all duration-300">
                    {/* Template Preview */}
                    <div className="relative h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 overflow-hidden">
                      {template.thumbnail ? (
                        <img
                          src={template.thumbnail}
                          alt={template.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-6xl opacity-50">🎨</span>
                        </div>
                      )}

                      {/* Preview Button Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openPreview(template)}
                          className="px-6 py-3 bg-white text-black font-bold rounded-lg flex items-center gap-2 shadow-lg"
                        >
                          <Eye size={20} />
                          Preview
                        </motion.button>
                      </div>

                      {/* Status Badge */}
                      {isActive && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                          ACTIVE
                        </div>
                      )}
                      {inCollection && !isActive && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                          IN COLLECTION
                        </div>
                      )}
                    </div>

                    {/* Template Info */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2 text-white">
                        {template.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">
                        {template.description}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {template.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2">
                        {/* Preview Button */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => openPreview(template)}
                          className="w-full px-4 py-2 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-600 transition flex items-center justify-center gap-2"
                        >
                          <Eye size={16} />
                          Preview Template
                        </motion.button>

                        {!inCollection ? (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => addTemplate(template.templateId, template.name, template.description)}
                            disabled={isLoading}
                            className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition disabled:opacity-50"
                          >
                            ➕ Add to Collection
                          </motion.button>
                        ) : isActive ? (
                          <div className="w-full px-4 py-3 bg-green-500/20 text-green-400 font-medium rounded-lg text-center border border-green-500/30">
                            ✓ Currently Active
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => switchTemplate(template.templateId)}
                              disabled={isLoading}
                              className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg hover:shadow-lg transition disabled:opacity-50"
                            >
                              🔄 Switch
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => removeTemplate(template.templateId)}
                              disabled={isLoading}
                              className="px-4 py-3 bg-red-500/20 text-red-400 border border-red-500/30 font-medium rounded-lg hover:bg-red-500/30 transition disabled:opacity-50"
                            >
                              🗑️
                            </motion.button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && previewTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closePreview}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 rounded-3xl w-full max-w-7xl max-h-[90vh] overflow-hidden border border-purple-500/30 shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-700 bg-slate-800/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Eye className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{previewTemplate.name}</h2>
                    <p className="text-gray-400 text-sm">{previewTemplate.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <motion.a
                    href={`/Components/UIs/${previewTemplate.templateId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-blue-600 transition"
                  >
                    <Maximize2 size={16} />
                    Full Screen
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closePreview}
                    className="w-10 h-10 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-lg flex items-center justify-center transition"
                  >
                    <X size={20} />
                  </motion.button>
                </div>
              </div>

              {/* Modal Body - iFrame Preview */}
              <div className="relative h-[calc(90vh-200px)] bg-slate-950">
                <iframe
                  src={`/Components/UIs/${previewTemplate.templateId}`}
                  className="w-full h-full border-0"
                  title={`${previewTemplate.name} Preview`}
                  sandbox="allow-scripts allow-same-origin"
                />
                {/* Loading Overlay */}
                {/* <div className="absolute inset-0 bg-slate-950 flex items-center justify-center pointer-events-none">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
                  />
                </div> */}
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-700 bg-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {previewTemplate.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {!isInCollection(previewTemplate.templateId) ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addTemplate(previewTemplate.templateId, previewTemplate.name, previewTemplate.description)}
                      disabled={isLoading}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition disabled:opacity-50"
                    >
                      ➕ Add to Collection
                    </motion.button>
                  ) : isActiveTemplate(previewTemplate.templateId) ? (
                    <div className="px-6 py-3 bg-green-500/20 text-green-400 font-bold rounded-xl border border-green-500/30">
                      ✓ Currently Active
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => switchTemplate(previewTemplate.templateId)}
                      disabled={isLoading}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-green-500/50 transition disabled:opacity-50"
                    >
                      🔄 Switch to This
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
