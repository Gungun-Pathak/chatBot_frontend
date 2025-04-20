import { motion } from 'framer-motion';

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

export default Features;
