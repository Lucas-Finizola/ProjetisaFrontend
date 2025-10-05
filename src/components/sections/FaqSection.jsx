import React from 'react';
import { motion } from 'framer-motion';

const FaqSection = ({ faqs }) => {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Dúvidas Frequentes</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Respostas para as perguntas mais comuns sobre energia solar.</p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{faq.attributes.pergunta}</h3>
              {/* O Rich Text do Strapi vem como um array de blocos, precisamos mapeá-los */}
              <div className="text-gray-700 space-y-2">
                {faq.attributes.resposta.map(block => 
                  block.children.map(child => <p key={child.text}>{child.text}</p>)
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;