// Placeholder para serviços de API
export const fetchLocations = async () => {
  // Implementar quando Strapi estiver configurado
  return [];
};

export const fetchTeamMembers = async () => {
  // Implementar quando Strapi estiver configurado
  return [];
};

export const getStrapiImageUrl = (imageData) => {
  // Implementar quando Strapi estiver configurado
  if (!imageData) return '/images/placeholder.jpg';
  return imageData.url || '/images/placeholder.jpg';
};
