import React from 'react';
import { Shield, BarChart3, Target, Clock, Mail, ArrowLeft } from 'lucide-react';

// Mock Link component for demonstration
const Link = ({ to, children, className }) => (
  <a href={to} className={className}>
    {children}
  </a>
);

const CookiePolicyPage = () => {
  const cookieTypes = [
    {
      icon: Shield,
      title: 'Essential Cookies',
      description: 'These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms.',
      examples: [
        'Session management cookies',
        'Authentication tokens',
        'Security cookies',
        'Load balancing cookies'
      ],
      retention: 'Session or up to 1 year'
    },
    {
      icon: BarChart3,
      title: 'Analytics Cookies',
      description: 'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.',
      examples: [
        'Google Analytics',
        'Page view tracking',
        'User behavior analysis',
        'Performance monitoring'
      ],
      retention: 'Up to 2 years'
    },
    {
      icon: Target,
      title: 'Marketing Cookies',
      description: 'These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.',
      examples: [
        'Advertising targeting',
        'Social media pixels',
        'Retargeting cookies',
        'Campaign tracking'
      ],
      retention: 'Up to 13 months'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cookie Policy</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">How we use cookies on our website</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Introduction */}
        <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">What are cookies?</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
            They are widely used to make websites work more efficiently and provide information to website owners.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            This policy explains how we use cookies on our website and the choices you have regarding their use.
          </p>
        </section>

        {/* Last Updated */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
          <Clock className="w-4 h-4" />
          <span>Last updated: January 15, 2025</span>
        </div>

        {/* Cookie Types */}
        <section className="space-y-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Types of cookies we use</h2>
          
          {cookieTypes.map((cookie, index) => (
            <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <cookie.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{cookie.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{cookie.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Examples include:</h4>
                      <ul className="space-y-1">
                        {cookie.examples.map((example, idx) => (
                          <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Retention period:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{cookie.retention}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Managing Cookies */}
        <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Managing your cookie preferences</h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              You have several options to manage cookies:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">On our website</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
                  Use our cookie consent banner to customize your preferences when you first visit our site, 
                  or access your preferences at any time.
                </p>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200">
                  Manage Cookie Preferences
                </button>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">In your browser</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Most browsers allow you to control cookies through their settings. You can set your browser to 
                  refuse cookies or delete existing cookies. Note that disabling cookies may affect website functionality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Third Party Cookies */}
        <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Third-party cookies</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Some cookies on our site are set by third-party services. These include:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-lg border border-gray-200/30 dark:border-gray-600/30">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Google Analytics</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Website traffic analysis and user behavior tracking</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Social Media</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Social sharing buttons and embedded content</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Advertising</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Targeted advertising and remarketing campaigns</p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-950/50 dark:to-indigo-950/50 backdrop-blur-md rounded-xl border border-blue-200/50 dark:border-blue-800/50 p-8 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2">Questions about cookies?</h2>
              <p className="text-blue-800 dark:text-blue-200 leading-relaxed mb-4">
                If you have any questions about our use of cookies or this policy, please don't hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:privacy@company.com"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
                >
                  <Mail className="w-4 h-4" />
                  Contact Privacy Team
                </a>
                <Link
                  to="/privacy"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-lg border border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  View Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CookiePolicyPage;