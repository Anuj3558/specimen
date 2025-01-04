import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
};

const plans = [
  {
    name: 'Starter',
    price: '$99',
    features: ['Basic prompt testing', 'Weekly security reports', 'Email support'],
  },
  {
    name: 'Pro',
    price: '$299',
    features: ['Advanced prompt testing', 'Daily security reports', '24/7 phone support', 'Custom integrations'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: ['Full-suite security solution', 'Real-time monitoring', 'Dedicated account manager', 'On-site training'],
  },
];

const Pricing = () => {
  return (
    <motion.main
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <section className="py-20 px-4" id="pricing">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-12 text-center">Pricing Plans</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center"
              >
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <p className="text-4xl font-bold mb-6 text-neon-purple">{plan.price}</p>
                <ul className="text-left mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center mb-2">
                      <Check className="w-5 h-5 text-neon-green mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-neon-purple text-white px-6 py-2 rounded-full font-semibold hover:bg-neon-pink transition-colors"
                >
                  Choose Plan
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  );
};

export default Pricing;

