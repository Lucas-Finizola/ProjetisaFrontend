import React from 'react';
import { fetchAPI } from '../../utils/strapiUtils';
import ReactMarkdown from 'react-markdown';

// Importe os componentes de seção que serão usados na Dynamic Zone
import TeamGrid from '../../src/components/sections/TeamGrid';
import LocationGrid from '../../src/components/sections/LocationGrid';
import DynamicZoneRenderer from '../../src/components/sections/DynamicZoneRenderer';

const About = ({ aboutPageData }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {aboutPageData?.title || 'Sobre a Projetisa'}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            {aboutPageData?.subtitle || 'Conheça nossa história, missão e valores'}
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {aboutPageData?.content && (
          <div className="prose prose-lg max-w-none mb-16">
            <ReactMarkdown>{aboutPageData.content}</ReactMarkdown>
          </div>
        )}

        {/* Dynamic Zone Sections */}
        {aboutPageData?.sections && aboutPageData.sections.length > 0 && (
          <div className="space-y-16">
            {aboutPageData.sections.map((section, index) => (
              <DynamicZoneRenderer
                key={index}
                section={section}
                components={{
                  'sections.team-grid': TeamGrid,
                  'sections.location-grid': LocationGrid,
                }}
              />
            ))}
          </div>
        )}

        {/* Fallback content when no data is available */}
        {!aboutPageData && (
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sobre a Projetisa</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Somos uma empresa especializada em soluções de engenharia elétrica e energia solar,
              comprometida em fornecer serviços de alta qualidade para nossos clientes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  try {
    const aboutPageResponse = await fetchAPI('/about-page', {
      populate: {
        sections: {
          populate: {
            team_members: { populate: '*' }, // Popula os membros da equipe
            locations: { populate: '*' },    // Popula as localizações
          },
        },
      },
    });

    return {
      props: {
        aboutPageData: aboutPageResponse.data?.attributes || null,
      },
    };
  } catch (error) {
    console.log('Strapi não disponível durante build, usando dados vazios');
    return {
      props: {
        aboutPageData: null,
      },
    };
  }
}

export default About;
