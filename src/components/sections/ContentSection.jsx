import React from 'react';
import { motion } from 'framer-motion'; // Importe motion do framer-motion
import { Target, Eye, Gem, Wind, Handshake, Users, Award, Zap } from 'lucide-react';
import { getStrapiMedia } from '../../../utils/strapiUtils';
import ReactMarkdown from 'react-markdown';

// Mapeamento de ícones disponíveis
const iconMap = {
  Target: <Target className="w-12 h-12 text-green-600" />,
  Eye: <Eye className="w-12 h-12 text-green-600" />,
  Gem: <Gem className="w-12 h-12 text-green-600" />,
  Wind: <Wind className="w-12 h-12 text-green-600" />,
  Handshake: <Handshake className="w-12 h-12 text-green-600" />,
  Users: <Users className="w-12 h-12 text-green-600" />,
  Award: <Award className="w-12 h-12 text-green-600" />,
  Zap: <Zap className="w-12 h-12 text-green-600" />,
};

/**
 * Componente ContentSection para Dynamic Zone
 * Renderiza seções de conteúdo flexíveis com texto, imagens e cards
 */
const ContentSection = ({ data }) => {
  const { 
    title, 
    content, 
    image, 
    layout = 'text-only', // text-only, text-image, cards, stats
    backgroundColor = 'white',
    cards = [],
    stats = []
  } = data;

  const imageUrl = getStrapiMedia(image);
  const bgClass = backgroundColor === 'gray' ? 'bg-gray-50' : 'bg-white';

  const renderCardsGrid = () => {
    if (!cards || cards.length === 0) return null;

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {cards.map((card, index) => (
          <motion.div 
            key={index}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-md border-2 border-transparent hover:border-green-600 hover:shadow-xl transition-all duration-300 text-center"
          >
            {card.icon && iconMap[card.icon] && (
              <div className="flex justify-center mb-4">
                {iconMap[card.icon]}
              </div>
            )}
            {card.title && (
              <h3 className="text-xl font-bold text-gray-800 mb-3">{card.title}</h3>
            )}
            {card.description && (
              <p className="text-gray-600 leading-relaxed">{card.description}</p>
            )}
          </motion.div>
        ))}
      </div>
    );
  };

  const renderStats = () => {
    if (!stats || stats.length === 0) return null;

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-lg shadow-sm text-center"
          >
            <h3 className="text-4xl font-bold text-green-600 mb-2">{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderTextImage = () => {
    return (
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          {title && (
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{title}</h2>
          )}
          {content && (
            <div className="prose prose-lg max-w-none prose-h2:font-bold prose-p:text-gray-700 prose-a:text-green-600">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
          {renderStats()}
        </div>
        {imageUrl && (
          <div>
            <img 
              src={imageUrl}
              alt={title || 'Imagem da seção'}
              className="w-full h-auto rounded-lg shadow-lg object-cover"
              onError={(e) => { 
                e.target.onerror = null; 
                e.target.src='https://placehold.co/600x400/eeeeee/333333?text=Imagem'; 
              }}
            />
          </div>
        )}
      </div>
    );
  };

  const renderTextOnly = () => {
    return (
      <div className="max-w-4xl mx-auto text-center">
        {title && (
          <h2 className="text-3xl font-bold text-gray-800 mb-6">{title}</h2>
        )}
        {content && (
          <div className="prose prose-lg max-w-none prose-h2:font-bold prose-p:text-gray-700 prose-a:text-green-600 mx-auto">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
        {renderStats()}
      </div>
    );
  };

  const renderCardsLayout = () => {
    return (
      <div>
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
          </div>
        )}
        {renderCardsGrid()}
      </div>
    );
  };

  return (
    <section className={`${bgClass} py-20`}>
      <div className="container mx-auto px-6">
        {layout === 'text-image' && renderTextImage()}
        {layout === 'text-only' && renderTextOnly()}
        {layout === 'cards' && renderCardsLayout()}
      </div>
    </section>
  );
};

export default ContentSection;

