import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Building, Zap, Construction } from 'lucide-react';

// Adapte este mapa de ícones para corresponder aos seus serviços
const iconMap = {
  default: <Building className="w-10 h-10" />,
  redes: <Zap className="w-10 h-10" />,
  obras: <Construction className="w-10 h-10" />,
};

const OtherServices = ({ services }) => {
  if (!services || services.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Soluções Completas em Engenharia Elétrica</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Além da energia solar, oferecemos um portfólio completo para grandes projetos.</p>
        </motion.div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="text-green-600 mb-5 flex justify-center">
                {/* Acessando o ícone pelo nome que você definir no Strapi */}
                {iconMap[service.attributes.icon] || iconMap.default}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.attributes.title}</h3>
              <p className="text-gray-600 line-clamp-3">{service.attributes.summary}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/servicos" legacyBehavior>
            <a className="bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg inline-flex items-center">
              <span>Conheça Todos os Serviços</span>
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OtherServices;