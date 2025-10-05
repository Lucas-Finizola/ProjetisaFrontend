import React, { useState } from 'react';
import Link from 'next/link'; // Alterado para next/link
import { List, Grid } from 'lucide-react';
import { fetchAPI, getStrapiMedia, formatDate } from '../../utils/strapiUtils'; // Usando fetchAPI e getStrapiMedia

const Noticias = ({ noticias }) => {
  const [viewMode, setViewMode] = useState('grid');


  return (
    <div className="bg-gray-50">
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Notícias e Artigos
          </h1>
          <p 
            className="text-lg md:text-xl max-w-3xl mx-auto"
          >
            Mantenha-se atualizado com as últimas tendências, tecnologias e projetos do setor de energia e engenharia.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20 min-h-[70vh]">
        <div className="flex justify-end items-center mb-12">
          <div className="flex space-x-2">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}><Grid /></button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}><List /></button>
          </div>
        </div>

        {!noticias || noticias.length === 0 ? (
            <div className="text-center text-gray-500">
                <p className="text-xl mb-4">Ainda não há notícias publicadas.</p>
                <p>Volte em breve para conferir as novidades!</p>
            </div>
        ) : (
          <div className={viewMode === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-10" : "space-y-6"}  initial="hidden" animate="visible">
            {noticias.map((noticia) => {
              const attributes = noticia.attributes;
              const imageUrl = getStrapiMedia(attributes.coverImage); // Usando getStrapiMedia

              return (
                <div key={noticia.id} >
                  <Link href={`/noticias/${attributes.slug}`} className="block h-full">
                    <div className={`bg-white rounded-xl shadow-lg overflow-hidden flex group ${viewMode === 'grid' ? 'flex-col h-full' : 'flex-row items-center'}`}>
                      <div className={`overflow-hidden ${viewMode === 'grid' ? 'h-64' : 'w-48 h-32 flex-shrink-0'}`}>
                        {imageUrl && <img src={imageUrl} alt={attributes.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                      </div>
                      <div className={`flex-grow ${viewMode === 'grid' ? 'p-8' : 'p-6'}`}>
                        {attributes.category && (
                          <p className='text-sm font-semibold text-green-600 mb-2'>{attributes.category}</p>
                        )}
                        <h2 className={`${viewMode === 'grid' ? 'text-2xl' : 'text-xl'} font-bold text-gray-800 mb-2`}>{attributes.title}</h2>
                        <p className="text-gray-500 text-sm">{formatDate(attributes.publishedAt)}</p>
                        {attributes.summary && (
                          <p className="text-gray-600 text-sm mt-2 line-clamp-2">{attributes.summary}</p>
                        )}
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
    const noticiasResponse = await fetchAPI('/news', { populate: '*' });

    return {
      props: {
        noticias: noticiasResponse.data || [],
      },
    };
  } catch (error) {
    console.log('Strapi não disponível durante build, usando dados vazios');
    return {
      props: {
        noticias: [],
      },
    };
  }
}

export default Noticias;
