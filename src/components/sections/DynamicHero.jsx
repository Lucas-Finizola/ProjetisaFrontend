import React from 'react';
import { getStrapiMedia } from '../../../utils/strapiUtils';
import { motion } from 'framer-motion'; // Importe motion do framer-motion
import Image from 'next/image';

/**
 * Componente DynamicHero para Dynamic Zone
 * Renderiza uma seção hero com título, subtítulo e imagem de fundo opcional
 */
const DynamicHero = ({ data }) => {
  const { title, subtitle, backgroundImage, textColor = 'white', backgroundColor = 'green-600' } = data;

  const backgroundImageUrl = getStrapiMedia(backgroundImage);
  const hasBackgroundImage = backgroundImageUrl && backgroundImageUrl !== '/placeholder-image.jpg';

  return (
    <section className={`${hasBackgroundImage ? 'relative' : `bg-${backgroundColor}`} text-${textColor} py-20`}>
      {hasBackgroundImage && (
        <>
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
          <Image 
            src={backgroundImageUrl} 
            alt={title || 'Hero background'}
            layout="fill"
            objectFit="cover"
            priority
            className="absolute inset-0 w-full h-full object-cover"
          />
        </>
      )}
      
      <div className={`container mx-auto px-6 text-center ${hasBackgroundImage ? 'relative z-20' : ''}`}>
        {title && (
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h1>
        )}
        
        {subtitle && (
          <motion.p 
            className="text-lg md:text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default DynamicHero;

