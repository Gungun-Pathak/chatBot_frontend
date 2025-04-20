import { motion } from 'framer-motion';

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
              <li className="flex items-start"><span className="text-primary-600 mr-2">•</span>Gender bias mitigation</li>
              <li className="flex items-start"><span className="text-primary-600 mr-2">•</span>Responsible AI implementation</li>
              <li className="flex items-start"><span className="text-primary-600 mr-2">•</span>Privacy-first architecture</li>
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

export default About;
