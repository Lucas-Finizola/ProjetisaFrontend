import React from 'react';
import Link from 'next/link'; // Alterado para next/link
import { ArrowLeft } from 'lucide-react';
import { fetchAPI, getStrapiMedia } from '../../utils/strapiUtils'; // Usando fetchAPI e getStrapiMedia
import ReactMarkdown from 'react-markdown';

const ServiceDetail = ({ service }) => {
  if (!service) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100 p-4 text-center">
        <p className="text-red-500 text-xl mb-4">Serviço não encontrado.</p>
        <Link href="/servicos" className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para Serviços
        </Link>
      </div>
    );
  }

  const attributes = service.attributes;
  const phoneNumber = '5583996556931';
  const message = `Olá! Tenho interesse no serviço de "${attributes.title}". Gostaria de um orçamento.`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  const imageUrl = getStrapiMedia(attributes.coverImage);

  return (
    <div className="bg-white py-20">
        <div className="container mx-auto px-6">
            {service && (
                <div>
                    <div className="mb-8">
                        <Link href="/servicos" className="flex items-center text-green-600 hover:text-green-800 font-semibold">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Voltar para todos os serviços
                        </Link>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{attributes.title}</h1>
                    
                    {attributes.summary && (
                      <p className="text-xl text-gray-600 mb-8 leading-relaxed">{attributes.summary}</p>
                    )}
                    
                    <div className="my-10 shadow-xl rounded-lg overflow-hidden">
                        {imageUrl && <img src={imageUrl} alt={attributes.title} className="w-full h-auto object-cover" onError={(e) => { e.target.onerror = null; e.target.src='https://via.placeholder.com/800x400/cccccc/000000?text=Erro+na+Imagem'; }}/>}
                    </div>

                   {attributes.contentBlocks && <ContentBlockRenderer contentBlocks={attributes.contentBlocks} />}

                    <div className="mt-12 py-10 border-t border-gray-200 text-center">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Pronto para começar?</h3>
                      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Clique no botão abaixo para falar com um de nossos especialistas e solicitar um orçamento sem compromisso.</p>
                      <a 
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-green-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 transition-transform transform hover:scale-105"
                      >
                        <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.486 5.236 3.486 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z"/>
                        </svg>
                        Solicitar Orçamento via WhatsApp
                      </a>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export async function getStaticPaths() {
  // Durante o build, retorna paths vazios para evitar erro de conexão
  try {
    const servicesResponse = await fetchAPI('/services', { fields: ['slug'] });
    const paths = servicesResponse.data.map((service) => ({
      params: { slug: service.attributes.slug },
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
  const serviceResponse = await fetchAPI(`/services`, {
    filters: { slug: { $eq: slug } },
    populate: ['coverImage'], // Popule as imagens para que os URLs estejam disponíveis
  });

  return {
    props: {
      service: serviceResponse.data[0] || null,
    },
  };
}

export default ServiceDetail;
