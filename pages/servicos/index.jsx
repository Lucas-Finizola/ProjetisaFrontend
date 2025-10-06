import React, { useState } from 'react';
import Link from 'next/link'; // Alterado para next/link
import { ArrowRight, Grid, List } from 'lucide-react';
import BlocksRenderer from '../../src/components/common/BlocksRenderer'; // <-- Adicione esta linha
import { fetchAPI, getStrapiMedia } from '../../utils/strapiUtils'; // Usando fetchAPI e getStrapiMedia

const Services = ({ services }) => {
  const [viewMode, setViewMode] = useState('grid');


  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nossos Serviços</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos soluções completas em engenharia elétrica e energia solar para residências, comércios e indústrias.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-colors ${
                viewMode === 'grid' ? 'bg-green-600 text-white' : 'text-gray-600 hover:text-green-600'
              }`}>
              <Grid className="w-4 h-4" />
              <span>Grade</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-colors ${
                viewMode === 'list' ? 'bg-green-600 text-white' : 'text-gray-600 hover:text-green-600'
              }`}>
              <List className="w-4 h-4" />
              <span>Lista</span>
            </button>
          </div>
        </div>

        {/* Services Grid/List */}
        {services && services.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
            {services.map((service) => (
              <div
                key={service.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                  viewMode === 'list' ? 'flex' : ''
                }`}>
                {service.attributes.featuredImage && (
                  <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : 'h-48'}>
                    <img
                      src={getStrapiMedia(service.attributes.featuredImage)}
                      alt={service.attributes.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.attributes.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {service.attributes.summary}
                  </p>
                  <Link
                    href={`/servicos/${service.attributes.slug}`}
                    className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                  >
                    Saiba mais
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum serviço encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  try {
    const servicesResponse = await fetchAPI('/services', { populate: '*' });

    return {
      props: {
        services: servicesResponse.data || [],
      },
    };
  } catch (error) {
    console.log('Strapi não disponível durante build, usando dados vazios');
    return {
      props: {
        services: [],
      },
    };
  }
}

export default Services;
