import React from 'react';
import TextBlock from './TextBlock';
import ImageBlock from './ImageBlock';

const componentMap = {
  'content-sections.text-block': TextBlock,
  'content-sections.image-block': ImageBlock,
};

const ContentBlockRenderer = ({ contentBlocks }) => {
  if (!contentBlocks) return null;

  return (
    <div className="space-y-8">
      {contentBlocks.map((block, index) => {
        const Component = componentMap[block.__component];
        if (!Component) {
          console.warn(`Componente não mapeado: ${block.__component}`);
          return null;
        }
        return <Component key={index} data={block} />;
      })}
    </div>
  );
};

export default ContentBlockRenderer;