import React, { useState } from 'react';
import Link from 'next/link'; // Alterado para next/link
import { List, Grid } from 'lucide-react';
import { fetchAPI, getStrapiMedia } from '../../utils/strapiUtils'; // Usando fetchAPI e getStrapiMedia

const Projetos = ({ projetos }) => {
  const [viewMode, setViewMode] = useState('grid');


  return (
    <div className="bg-gray-50">
      {/* Hero Section Adicionada */}
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Nossos Projetos
          </h1>
          <p 
            className="text-lg md:text-xl max-w-3xl mx-auto"
          >
            Conheça alguns dos projetos de sucesso que entregamos, combinando tecnologia de ponta e engenharia de precisão.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20 min-h-[70vh]">
        <div className="flex justify-end items-center mb-12">
          {/* Botões de visualização */}
          <div className="flex space-x-2">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}><Grid /></button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}><List /></button>
          </div>
        </div>

        {!projetos || projetos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Nenhum projeto encontrado.</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-10" : "space-y-6"}>
            {projetos.map((projeto) => {
              const attributes = projeto.attributes;
              const imageUrl = getStrapiMedia(attributes.coverImage); // Usando getStrapiMedia

              return (
                <div key={projeto.id} >
                  <Link href={`/projetos/${attributes.slug}`} className="block h-full">
                    <div className={`bg-white rounded-xl shadow-lg overflow-hidden flex group ${viewMode === 'grid' ? 'flex-col h-full' : 'flex-row items-center'}`}>
                      <div className={`overflow-hidden ${viewMode === 'grid' ? 'h-64' : 'w-48 h-32 flex-shrink-0'}`}>
                        {imageUrl && <img src={imageUrl} alt={attributes.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                      </div>
                      <div className={`flex-grow ${viewMode === 'grid' ? 'p-8' : 'p-6'}`}>
                        <h2 className={`${viewMode === 'grid' ? 'text-2xl' : 'text-xl'} font-bold text-gray-800 mb-2`}>{attributes.title}</h2>
                        <p className="text-gray-600 leading-relaxed text-sm line-clamp-3">{attributes.summary}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  try {
    const projetosResponse = await fetchAPI('/projects', { populate: '*' });

    return {
      props: {
        projetos: projetosResponse.data || [],
      },
    };
  } catch (error) {
    console.log('Strapi não disponível durante build, usando dados vazios');
    return {
      props: {
        projetos: [],
      },
    };
  }
}

export default Projetos;
