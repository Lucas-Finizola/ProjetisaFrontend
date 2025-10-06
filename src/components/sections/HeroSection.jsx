import React from 'react';
import { getStrapiMedia } from '../../../utils/strapiUtils';
import { CheckCircle } from 'lucide-react';

const HeroSection = ({ data }) => {
  // Guarda de segurança: se não houver dados, não renderiza nada
  if (!data) {
    return null;
  }

  // Extração segura dos dados com valores padrão
  const { title = '', subtitle = '', backgroundImage, checklistItems = [] } = data;
  const heroImageUrl = getStrapiMedia(backgroundImage);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center bg-gray-800 text-white pt-24 pb-12"
      style={heroImageUrl ? { backgroundImage: `url(${heroImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              {subtitle}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {checklistItems.map((item) => (
                <div key={item.id} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          {/* O formulário pode ser adicionado aqui depois */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;