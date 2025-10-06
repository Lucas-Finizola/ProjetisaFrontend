import React from 'react';
import { fetchAPI } from '../utils/strapiUtils';

// Importando os componentes de seção
import HeroSection from '../src/components/sections/HeroSection';
import UrgencyBanner from '../src/components/sections/UrgencyBanner';
import Benefits from '../src/components/sections/Benefits';
import Process from '../src/components/sections/Process';
import FinalCTA from '../src/components/sections/FinalCTA';

// Mapa dos componentes da Dynamic Zone
const componentMap = {
  'sections.hero-section': HeroSection,
  'sections.urgency-banner': UrgencyBanner,
  'sections.benefits-section': Benefits,
  'sections.process-section': Process,
  'sections.final-cta': FinalCTA,
};

const Home = ({ homePageData, error }) => {
  if (error) {
    return (
      <div className="text-center p-8 min-h-screen">
        <h1 className="text-2xl font-bold text-red-600">Ocorreu um Erro ao Carregar a Página</h1>
        <p className="mt-4 text-gray-700">Detalhes do erro:</p>
        <pre className="mt-2 p-4 bg-gray-100 rounded text-left whitespace-pre-wrap">{error}</pre>
      </div>
    );
  }
  
  const sections = homePageData?.sections || [];

  return (
    <div className="min-h-screen bg-white">
      {sections.map((section) => {
        const Component = componentMap[section.__component];
        if (Component) {
          return <Component key={`${section.__component}-${section.id}`} data={section} />;
        }
        return null;
      })}
    </div>
  );
};

export async function getStaticProps() {
  const detailedPopulate = {
    sections: {
      on: {
        'sections.hero-section': { populate: '*' },
        'sections.urgency-banner': { populate: '*' },
        'sections.benefits-section': { populate: '*' },
        'sections.process-section': { populate: '*' },
        'sections.final-cta': { populate: '*' },
      },
    },
  };

  try {
    const homePageRes = await fetchAPI('/home', { populate: detailedPopulate });

    // A verificação de segurança MAIS IMPORTANTE:
    const homePageData = homePageRes.data?.attributes || null;

    if (!homePageData) {
      throw new Error("Dados da Home não encontrados. Verifique se a página 'Home' está PUBLICADA no Strapi e se as permissões para 'Public' estão corretas.");
    }

    return {
      props: {
        homePageData: homePageData, // Agora é garantido que seja um objeto ou null
        error: null,
      },
    };
  } catch (error) {
    console.error("ERRO FINAL EM GETSTATICPROPS:", error.message);
    return {
      props: {
        homePageData: null,
        error: error.message,
      },
    };
  }
}

export default Home;