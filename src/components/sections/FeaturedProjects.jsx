import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getStrapiMedia } from '../../../utils/strapiUtils';

const FeaturedProjects = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Projetos em Destaque</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Conheça alguns dos nossos projetos mais recentes e o impacto que geramos.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const { title, summary, coverImage, slug } = project.attributes;
            const imageUrl = getStrapiMedia(coverImage);

            return (
              <motion.div 
                key={project.id} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group"
              >
                <Link href={`/projetos/${slug}`} legacyBehavior>
                  <a className="block">
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={imageUrl || 'https://placehold.co/600x400/e2e8f0/334155?text=Projetisa'} 
                        alt={`Imagem do projeto ${title}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{summary}</p>
                      <span className="text-green-600 font-medium group-hover:text-green-700 flex items-center">
                        Ver projeto <ArrowRight className="ml-1 w-4 h-4" />
                      </span>
                    </div>
                  </a>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link href="/projetos" legacyBehavior>
            <a className="bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg inline-flex items-center">
              <span>Ver Todos os Projetos</span>
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;