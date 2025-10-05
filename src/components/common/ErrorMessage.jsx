import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

/**
 * Componente de mensagem de erro reutilizável
 * @param {Object} props - Propriedades do componente
 * @param {string} props.message - Mensagem de erro
 * @param {Function} props.onRetry - Função para tentar novamente
 * @param {string} props.className - Classes CSS adicionais
 * @param {boolean} props.showIcon - Se deve mostrar o ícone de erro
 * @param {boolean} props.compact - Versão compacta do componente
 * @returns {JSX.Element} Componente de erro
 */
const ErrorMessage = ({ 
  message = 'Ocorreu um erro inesperado', 
  onRetry = null,
  className = '',
  showIcon = true,
  compact = false
}) => {
  if (compact) {
    return (
      <div className={`flex items-center justify-center p-4 text-red-600 ${className}`}>
        {showIcon && <AlertTriangle className="w-5 h-5 mr-2" />}
        <span>{message}</span>
        {onRetry && (
          <button
            onClick={onRetry}
            className="ml-3 text-sm text-red-700 hover:text-red-800 underline"
          >
            Tentar novamente
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`text-center bg-red-50 p-8 rounded-lg border border-red-200 ${className}`}>
      {showIcon && (
        <AlertTriangle className="mx-auto text-red-500 w-12 h-12 mb-4" />
      )}
      <h3 className="text-xl font-semibold text-red-700 mb-2">
        Ops! Algo deu errado
      </h3>
      <p className="text-red-600 mb-4">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Tentar Novamente
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;

