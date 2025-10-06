import React, { Fragment } from 'react';

// Componente para renderizar os 'filhos' de um bloco (o texto e suas formatações)
const Text = ({ children }) => {
  return children.map((child, i) => {
    let element = <Fragment key={i}>{child.text}</Fragment>;

    if (child.bold) {
      element = <strong key={i}>{element}</strong>;
    }
    if (child.italic) {
      element = <em key={i}>{element}</em>;
    }
    if (child.underline) {
      element = <u key={i}>{element}</u>;
    }
    if (child.strikethrough) {
      element = <s key={i}>{element}</s>;
    }

    return element;
  });
};

// Componente principal que renderiza a lista de blocos
const BlocksRenderer = ({ content }) => {
  if (!content) {
    return null;
  }

  return content.map((block, i) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={i}>
            <Text>{block.children}</Text>
          </p>
        );
      case 'heading':
        switch (block.level) {
          case 1:
            return <h1 key={i}><Text>{block.children}</Text></h1>;
          case 2:
            return <h2 key={i}><Text>{block.children}</Text></h2>;
          case 3:
            return <h3 key={i}><Text>{block.children}</Text></h3>;
          case 4:
            return <h4 key={i}><Text>{block.children}</Text></h4>;
          case 5:
            return <h5 key={i}><Text>{block.children}</Text></h5>;
          case 6:
            return <h6 key={i}><Text>{block.children}</Text></h6>;
          default:
            return <h1 key={i}><Text>{block.children}</Text></h1>;
        }
      case 'list':
        const ListComponent = block.format === 'ordered' ? 'ol' : 'ul';
        return (
          <ListComponent key={i}>
            {block.children.map((listItem, j) => (
              <li key={j}>
                <Text>{listItem.children}</Text>
              </li>
            ))}
          </ListComponent>
        );
      default:
        // Retorna null para tipos de bloco não suportados
        return null;
    }
  });
};

export default BlocksRenderer;