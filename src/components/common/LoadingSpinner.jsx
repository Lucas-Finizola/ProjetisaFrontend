import React from 'react';
import { Loader } from 'lucide-react';

/**
 * Componente de loading spinner reutilizável
 * @param {Object} props - Propriedades do componente
 * @param {string} props.size - Tamanho do spinner (small, default, large, xl)
 * @param {string} props.message - Mensagem de loading opcional
 * @param {string} props.className - Classes CSS adicionais
 * @param {boolean} props.fullScreen - Se deve ocupar a tela toda
 * @returns {JSX.Element} Componente de loading
 */
const LoadingSpinner = ({ 
  size = 'default', 
  message = '', 
  className = '',
  fullScreen = false
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    default: 'w-6 h-6',
    large: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-50'
    : 'flex flex-col items-center justify-center p-8';

  return (
    <div className={`${containerClasses} ${className}`}>
      <Loader className={`animate-spin text-green-600 ${sizeClasses[size]} ${message ? 'mb-4' : ''}`} />
      {message && (
        <p className="text-gray-600 text-center">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;

