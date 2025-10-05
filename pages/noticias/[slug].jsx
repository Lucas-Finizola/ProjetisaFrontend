import React from 'react';
import Link from 'next/link'; // Alterado para next/link
import { fetchAPI, getStrapiMedia, formatDate } from '../../utils/strapiUtils'; // Usando fetchAPI e getStrapiMedia
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';

const NoticiaDetail = ({ noticia }) => {
  if (!noticia) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100 p-4 text-center">
        <p className="text-red-500 text-xl mb-4">Notícia não encontrada.</p>
        <Link href="/noticias" className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para Notícias
        </Link>
      </div>
    );
  }

  const attributes = noticia.attributes;
  const imageUrl = getStrapiMedia(attributes.coverImage);

  return (
    <div className="bg-white font-sans">
      <div>
        {/* Cabeçalho com Imagem de Destaque */}
        <div className="h-[50vh] md:h-[60vh] relative flex items-end justify-center text-white overflow-hidden p-6 md:p-12">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10"></div>
          {imageUrl && <img src={imageUrl} alt={attributes.title} className="absolute inset-0 w-full h-full object-cover" />}
          <div className="relative z-20 w-full max-w-4xl">
            <div>
              <div className="flex items-center space-x-4 text-sm mb-2">
                  {attributes.category && (
                    <span className="inline-flex items-center bg-green-600 px-3 py-1 rounded-full text-white font-semibold">
                        <Tag className="w-4 h-4 mr-2"/>
                        {attributes.category}
                    </span>
                  )}
                  <span className="inline-flex items-center">
                      <Calendar className="w-4 h-4 mr-2"/>
                      {formatDate(attributes.publishedAt)}
                  </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold shadow-text leading-tight">
                {attributes.title}
              </h1>
              {attributes.summary && (
                <p className="text-xl mt-4 opacity-90 leading-relaxed">
                  {attributes.summary}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Conteúdo da Notícia */}
        <div className="container mx-auto max-w-4xl py-16 lg:py-24 px-6">
          <Link href="/noticias" className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors mb-12 text-lg font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar para todas as notícias
          </Link>

          {attributes.content && (
            <div className="prose prose-lg max-w-none prose-h2:font-bold prose-p:text-gray-700 prose-a:text-green-600">
              <ReactMarkdown>{attributes.content}</ReactMarkdown>
            </div>
          )}

          {/* Tags se existirem */}
          {attributes.tags && attributes.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {attributes.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links relacionados se existirem */}
          {attributes.relatedLinks && attributes.relatedLinks.length > 0 && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Links Relacionados:</h3>
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
    const noticiasResponse = await fetchAPI('/news', { fields: ['slug'] });
    const paths = noticiasResponse.data.map((noticia) => ({
      params: { slug: noticia.attributes.slug },
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
  const noticiaResponse = await fetchAPI(`/news`, {
    filters: { slug: { $eq: slug } },
    populate: ['coverImage'], // Popule as imagens para que os URLs estejam disponíveis
  });

  return {
    props: {
      noticia: noticiaResponse.data[0] || null,
    },
  };
}

export default NoticiaDetail;
