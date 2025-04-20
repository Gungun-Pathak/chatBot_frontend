import { motion } from 'framer-motion';

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

export default Hero;
