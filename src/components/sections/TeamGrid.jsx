import React from 'react';
import { getStrapiImageUrl } from '../../services/api';

/**
 * Componente TeamGrid para Dynamic Zone
 * Renderiza uma grade de membros da equipe
 */
const TeamGrid = ({ data }) => {
  const { title, subtitle, teamMembers } = data;

  if (!teamMembers || teamMembers.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 text-center">
        {title && (
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
        )}
        {subtitle && (
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">{subtitle}</p>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => {
            const memberData = member.data?.attributes || member.attributes || member;
            const imageUrl = getStrapiImageUrl(memberData.photo || memberData.foto);
            
            return (
              <motion.div 
                key={member.id || index}
                whileHover={{ y: -8 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden text-center border-2 border-transparent hover:border-green-600 hover:shadow-xl transition-all duration-300"
              >
                <img 
                  src={imageUrl}
                  alt={`Foto de ${memberData.name || memberData.nome}`}
                  className="w-full h-64 object-cover object-center"
                  onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src='https://placehold.co/400x400/eeeeee/333333?text=Sem+Foto'; 
                  }}
                />
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-800">
                    {memberData.name || memberData.nome}
                  </h4>
                  <p className="text-green-600 font-semibold">
                    {memberData.position || memberData.cargo}
                  </p>
                  {memberData.bio && (
                    <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                      {memberData.bio}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamGrid;
