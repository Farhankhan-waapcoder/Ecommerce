import React, { useState, useEffect } from 'react';
import { Settings, Shield, BarChart3, Target, X, Check } from 'lucide-react';

const COOKIE_PREF_KEY = 'cookiePreferences';

const defaultPrefs = {
  essential: true,
  analytics: false,
  marketing: false,
};

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState(defaultPrefs);

  useEffect(() => {
    // On mount, check if cookie preferences are saved
    const savedPrefs = JSON.parse(sessionStorage.getItem(COOKIE_PREF_KEY) || 'null');
    if (!savedPrefs) {
      // Show banner if no prefs set
      setShowBanner(true);
    } else {
      setPreferences(savedPrefs);
    }
  }, []);

  function savePreferences(prefs) {
    setPreferences(prefs);
    sessionStorage.setItem(COOKIE_PREF_KEY, JSON.stringify(prefs));
    setShowBanner(false);
    setShowModal(false);

    // Here you could add logic to enable/disable analytics or marketing scripts
    // depending on prefs.analytics and prefs.marketing
  }

  function handleAcceptAll() {
    savePreferences({
      essential: true,
      analytics: true,
      marketing: true,
    });
  }

  function handleAcceptEssential() {
    savePreferences({
      essential: true,
      analytics: false,
      marketing: false,
    });
  }

  const cookieTypes = [
    {
      key: 'essential',
      icon: Shield,
      title: 'Essential Cookies',
      description: 'Required for basic site functionality and security.',
      required: true
    },
    {
      key: 'analytics',
      icon: BarChart3,
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website.',
      required: false
    },
    {
      key: 'marketing',
      icon: Target,
      title: 'Marketing Cookies',
      description: 'Used to deliver personalized advertisements and track campaign performance.',
      required: false
    }
  ];

  return (
    <>
      {/* Cookie Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-2xl z-50 transform animate-in slide-in-from-bottom duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Settings className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    We value your privacy
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                    By clicking "Accept All", you consent to our use of cookies.{' '}
                    <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline font-medium">
                      Read our Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 lg:flex-shrink-0">
                <button
                  onClick={handleAcceptEssential}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 order-2 sm:order-1"
                >
                  Essential Only
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 order-3 sm:order-2"
                >
                  Customize
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 rounded-lg transition-colors duration-200 order-1 sm:order-3"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Preferences Modal */}
      {showModal && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-opacity-50 dark:bg-opacity-70 z-50 animate-in fade-in duration-200 absolute  bg-black/30 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-2xl transform animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Cookie Preferences</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Choose which cookies you're comfortable with</p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                  {cookieTypes.map(({ key, icon: Icon, title, description, required }) => (
                    <div key={key} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-10 h-10 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center shadow-sm">
                          <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h4>
                          <div className="flex-shrink-0 ml-4">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={preferences[key]}
                                disabled={required}
                                onChange={(e) =>
                                  setPreferences(prev => ({ ...prev, [key]: e.target.checked }))
                                }
                                className="sr-only peer"
                              />
                              <div className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                                preferences[key] 
                                  ? 'bg-blue-600 dark:bg-blue-500' 
                                  : 'bg-gray-200 dark:bg-gray-600'
                              } ${required ? 'opacity-50' : ''}`}>
                                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white dark:bg-gray-200 rounded-full transition-transform duration-200 ${
                                  preferences[key] ? 'translate-x-5' : 'translate-x-0'
                                }`}>
                                  {preferences[key] && (
                                    <Check className="w-3 h-3 text-blue-600 dark:text-blue-500 absolute top-1 left-1" />
                                  )}
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">{description}</p>
                        {required && (
                          <span className="inline-block mt-2 px-2 py-1 text-xs font-medium text-orange-800 dark:text-orange-200 bg-orange-100 dark:bg-orange-900 rounded-full">
                            Required
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-xl">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => savePreferences(preferences)}
                    className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 rounded-lg transition-colors duration-200"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}