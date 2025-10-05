import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion'; // Importe motion do framer-motion
import { getStrapiImageUrl } from '../../services/api';

/**
 * Componente LocationGrid para Dynamic Zone
 * Renderiza uma grade de localizações onde a empresa atua
 */
const LocationGrid = ({ data }) => {
  const { title, subtitle, locations } = data;

  if (!locations || locations.length === 0) {
    return null;
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location, index) => {
            const locationData = location.data?.attributes || location.attributes || location;
            const imageUrl = getStrapiImageUrl(locationData.image || locationData.imagem);
            
            return (
              <motion.div 
                key={location.id || index}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-transparent hover:border-green-600 hover:shadow-xl transition-all duration-300"
              >
                {imageUrl && (
                  <img 
                    src={imageUrl}
                    alt={locationData.name || locationData.nome}
                    className="w-full h-48 object-cover"
                    onError={(e) => { 
                      e.target.onerror = null; 
                      e.target.src='https://placehold.co/400x300/eeeeee/333333?text=Local'; 
                    }}
                  />
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                    <MapPin className="w-5 h-5 text-green-600 mr-2" />
                    {locationData.name || locationData.nome}
                  </h3>
                  
                  {locationData.description && (
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {locationData.description}
                    </p>
                  )}
                  
                  <div className="space-y-2 text-sm">
                    {locationData.address && (
                      <p className="text-gray-600">
                        <strong>Endereço:</strong> {locationData.address}
                      </p>
                    )}
                    
                    {locationData.phone && (
                      <p className="text-gray-600 flex items-center">
                        <Phone className="w-4 h-4 text-green-600 mr-2" />
                        {locationData.phone}
                      </p>
                    )}
                    
                    {locationData.email && (
                      <p className="text-gray-600 flex items-center">
                        <Mail className="w-4 h-4 text-green-600 mr-2" />
                        {locationData.email}
                      </p>
                    )}
                  </div>
                  
                  {locationData.services && locationData.services.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Serviços:</h4>
                      <div className="flex flex-wrap gap-1">
                        {locationData.services.map((service, serviceIndex) => (
                          <span 
                            key={serviceIndex}
                            className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
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

export default LocationGrid;
