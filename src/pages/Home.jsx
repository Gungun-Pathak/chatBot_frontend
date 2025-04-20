import { useState } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { ChatBubbleLeftRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-primary-600">Asha</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {['Home', 'Features', 'About'].map((item) => (
                <Link
                  key={item}
                  to={item.toLowerCase()}
                  smooth={true}
                  duration={500}
                  className="text-gray-600 hover:text-primary-600 cursor-pointer"
                >
                  {item}
                </Link>
              ))}
              <Link
                to="home"
                smooth={true}
                duration={500}
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
              >
                Try Asha
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Meet Asha: Your Career Companion
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Empowering women through AI-driven career guidance
            </p>
            <button className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-primary-700 transition-colors">
              Try Asha Now
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <div className="space-y-4">
                <div className="bg-gray-100 rounded p-3">
                  Hi! I'm Asha. How can I help with your career journey?
                </div>
                <div className="bg-primary-100 rounded p-3 ml-8">
                  I'm looking for job opportunities in tech.
                </div>
                <div className="bg-gray-100 rounded p-3">
                  I can help you find relevant tech positions and provide guidance on application processes.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { title: 'Women Career Guidance', description: 'Personalized career advice tailored for women professionals' },
    { title: 'Real-Time Job Listings', description: 'Access to latest job opportunities across industries' },
    { title: 'Event & Mentorship', description: 'Connect with mentors and attend career development events' },
    { title: 'Personalized Recommendations', description: 'AI-driven suggestions based on your profile' },
    { title: 'Ethical & Bias-Free', description: 'Ensuring fair and unbiased career guidance' },
    { title: 'Privacy-Conscious', description: 'Your data security is our top priority' },
  ];

  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">About Asha</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-600">
              Asha is built to offer seamless access to public career resources for women, working as a virtual assistant
              to guide users across job listings, events, mentorships, and community updates.
            </p>
            <p className="text-lg text-gray-600">
              With context-aware response generation, Asha provides personalized guidance for user-specific queries,
              ensuring relevant and helpful interactions.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <h3 className="text-2xl font-semibold mb-6">Built on Ethical AI Principles</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Gender bias mitigation
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Responsible AI implementation
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Privacy-first architecture
              </li>
            </ul>
            <div className="mt-8">
              <h4 className="font-semibold mb-4">Technologies Used:</h4>
              <div className="flex flex-wrap gap-2">
                {['React.js', 'Tailwind CSS', 'LangChain', 'OpenAI API', 'VectorDB', 'RAG Pipeline', 'NLP'].map((tech) => (
                  <span key={tech} className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700"
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
        )}
      </motion.button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-20 right-0 w-80 bg-white rounded-lg shadow-xl"
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Chat with Asha</h3>
            <p className="text-gray-600 mb-4">Start your career journey with AI-powered guidance.</p>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700"
            >
              Start Chat
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <About />
      </main>
      <FloatingChatButton />
    </div>
  );
}

export default Home;