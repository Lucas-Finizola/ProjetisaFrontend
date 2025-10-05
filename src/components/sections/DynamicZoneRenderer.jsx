import React from 'react';
import DynamicHero from './DynamicHero';
import ContentSection from './ContentSection';
import TeamGrid from './TeamGrid';
import LocationGrid from './LocationGrid';

/**
 * Mapeamento de componentes para Dynamic Zone
 * Cada tipo de componente do Strapi é mapeado para um componente React
 */
const componentMap = {
  'sections.hero': DynamicHero,
  'sections.content': ContentSection,
  'sections.team-grid': TeamGrid,
  'sections.location-grid': LocationGrid,
  // Adicione mais componentes conforme necessário
};

/**
 * Componente DynamicZoneRenderer
 * Renderiza componentes dinamicamente baseado no tipo definido no Strapi
 */
const DynamicZoneRenderer = ({ pageBuilder }) => {
  if (!pageBuilder || !Array.isArray(pageBuilder)) {
    return null;
  }

  return (
    <>
      {pageBuilder.map((component, index) => {
        const ComponentToRender = componentMap[component.__component];
        
        if (!ComponentToRender) {
          console.warn(`Componente não encontrado para tipo: ${component.__component}`);
          return null;
        }

        return (
          <ComponentToRender 
            key={`${component.__component}-${index}`}
            data={component}
          />
        );
      })}
    </>
  );
};

export default DynamicZoneRenderer;
