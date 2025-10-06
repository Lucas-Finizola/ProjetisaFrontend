import React from 'react';
import Link from 'next/link'; // Alterado para next/link
import { fetchAPI, getStrapiMedia } from '../../utils/strapiUtils'; // Usando fetchAPI e getStrapiMedia
import ReactMarkdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';

const ProjetoDetail = ({ projeto }) => {
  if (!projeto) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100 p-4 text-center">
        <p className="text-red-500 text-xl mb-4">Projeto não encontrado.</p>
        <Link href="/projetos" className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para Projetos
        </Link>
      </div>
    );
  }

  const attributes = projeto.attributes;
  const imageUrl = getStrapiMedia(attributes.coverImage);

  return (
    <div className="bg-white font-sans">
      <div>
        <div className="h-[50vh] md:h-[60vh] relative flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
          {imageUrl && <img src={imageUrl} alt={attributes.title} className="absolute inset-0 w-full h-full object-cover" />}
          <div className="relative z-20 text-center p-6">
            <h1 className="text-4xl md:text-5xl font-extrabold shadow-text">
              {attributes.title}
            </h1>
            {attributes.summary && (
              <p className="text-xl md:text-2xl mt-4 max-w-3xl mx-auto">
                {attributes.summary}
              </p>
            )}
          </div>
        </div>

        <div className="container mx-auto max-w-4xl py-16 lg:py-24 px-6">
          <Link href="/projetos" className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors mb-12 text-lg font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar para todos os projetos
          </Link>

          {attributes.contentBlocks && <ContentBlockRenderer contentBlocks={attributes.contentBlocks} />}

          {/* Galeria de imagens se existir */}
          {attributes.gallery?.data && attributes.gallery.data.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Galeria do Projeto</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {attributes.gallery.data.map((image, index) => (
                  <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                    <img 
                      src={getStrapiMedia(image)} 
                      alt={`Imagem ${index + 1} do projeto`}
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links relacionados se existirem */}
          {attributes.relatedLinks && attributes.relatedLinks.length > 0 && (
            <div className="mt-16 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Links Relacionados</h3>
              <div className="space-y-2">
                {attributes.relatedLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-green-600 hover:text-green-800 transition-colors"
                  >
                    {link.title || link.url}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  // Durante o build, retorna paths vazios para evitar erro de conexão
  try {
    const projetosResponse = await fetchAPI('/projects', { fields: ['slug'] });
    const paths = projetosResponse.data.map((projeto) => ({
      params: { slug: projeto.attributes.slug },
    }));

    return {
      paths,
      fallback: 'blocking', // Permite gerar páginas sob demanda
    };
  } catch (error) {
    console.log('Strapi não disponível durante build, usando fallback');
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const projetoResponse = await fetchAPI(`/projects`, { 
    filters: { slug: { $eq: slug } },
    populate: ['coverImage', 'gallery'], // Popule as imagens para que os URLs estejam disponíveis
  });

  return {
    props: {
      projeto: projetoResponse.data[0] || null,
    },
  };
}

export default ProjetoDetail;
