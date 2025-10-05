import React from 'react';
import { fetchAPI } from '../utils/strapiUtils';

// Importando TODOS os componentes de seção
import HeroSection from '../src/components/sections/HeroSection';
import UrgencyBanner from '../src/components/sections/UrgencyBanner';
import Benefits from '../src/components/sections/Benefits';
import Process from '../src/components/sections/Process';
import FeaturedProjects from '../src/components/sections/FeaturedProjects';
import Testimonials from '../src/components/sections/Testimonials';
import FaqSection from '../src/components/sections/FaqSection';
import FinalCTA from '../src/components/sections/FinalCTA';
import VideoSection from '../src/components/sections/VideoSection';
import OtherServices from '../src/components/sections/OtherServices';

// Mapa que conecta os nomes do Strapi aos componentes React
const componentMap = {
  'sections.hero-section': HeroSection,
  'sections.urgency-banner': UrgencyBanner,
  'sections.benefits': Benefits, // Assumindo que o nome do componente no Strapi será "Benefits"
  'sections.process': Process,     // Assumindo que o nome do componente no Strapi será "Process"
  'sections.final-cta': FinalCTA,
};

const Home = ({ homePageData, projects, faqs, teamMembers, videos, services }) => {
  // Condição de carregamento CORRIGIDA para 'sections'
  if (!homePageData || !homePageData.sections) {
    return <div className="text-center p-8">Carregando conteúdo... Verifique se o Strapi está rodando e se a "About Page" tem seções publicadas na Dynamic Zone.</div>;
  }

  // Desestruturação CORRIGIDA para 'sections'
  const { sections } = homePageData;

  const scrollToHeroForm = () => {
    document.getElementById('simulacao-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen bg-white">
      {sections.map((section, index) => {
        const Component = componentMap[section.__component];
        if (!Component) {
          console.warn(`Componente não mapeado no index.jsx: ${section.__component}`);
          return null;
        }
        return <Component key={index} data={section} scrollToForm={scrollToHeroForm} />;
      })}

      <FeaturedProjects projects={projects} />
      <VideoSection videos={videos} />
      <OtherServices services={services} />
      <FaqSection faqs={faqs} />
      <Testimonials testimonials={teamMembers} />
    </div>
  );
};

export async function getStaticProps() {
  try {
    const [homePageRes, projectsRes, faqsRes, teamMembersRes, videosRes, servicesRes] = await Promise.all([
      fetchAPI('/about-page', { populate: 'deep' }), // 'deep' é mais robusto que '*' para nested components
      fetchAPI('/projects', { pagination: { limit: 3 }, populate: 'coverImage' }),
      fetchAPI('/faqs'),
      fetchAPI('/team-members', { pagination: { limit: 3 }, populate: 'photo' }),
      fetchAPI('/feedback-videos', { populate: 'thumbnail' }),
      fetchAPI('/services', { pagination: { limit: 3 } })
    ]);

    return {
      props: {
        homePageData: homePageRes.data || null,
        projects: projectsRes.data || [],
        faqs: faqsRes.data || [],
        teamMembers: teamMembersRes.data || [],
        videos: videosRes.data || [],
        services: servicesRes.data || [],
      },
    };
  } catch (error) {
    console.error("Erro ao buscar dados do Strapi para a Home:", error);
    return { props: { homePageData: null, projects: [], faqs: [], teamMembers: [], videos: [], services: [] } };
  }
}

export default Home;