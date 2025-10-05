import React from 'react';
import { motion } from 'framer-motion';

const FinalCTA = ({ data, scrollToForm }) => {
  // Se não houver dados para esta seção, não renderiza nada.
  if (!data) return null;

  return (
    <section id="simulacao-final" className="py-20 bg-green-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.title}</h2>
          <p className="text-xl mb-8">{data.subtitle}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToForm}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-10 py-5 rounded-lg font-bold text-xl transition-colors shadow-lg"
          >
            {data.buttonText}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;