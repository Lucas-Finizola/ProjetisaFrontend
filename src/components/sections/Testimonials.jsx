import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Testimonials = ({ testimonials }) => {
  // Usaremos a coleção Team Members como depoimentos
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">O Que Nossos Clientes Dizem</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">A satisfação de quem confia na Projetisa é a nossa maior conquista.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {/* Adicionando 5 estrelas como padrão */}
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />)}
              </div>
              <blockquote className="text-gray-700 italic mb-4">
                {/* Usaremos o 'cargo' como um depoimento de exemplo */}
                <p>"{testimonial.attributes.cargo || 'Excelente serviço e profissionalismo impecável. Recomendo a Projetisa para todos!'}"</p>
              </blockquote>
              <p className="font-semibold text-gray-900">{testimonial.attributes.nome}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;