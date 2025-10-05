import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { testApiIntegration } from '../../utils/testApi';

/**
 * Componente de desenvolvimento para monitorar status da API
 * Só deve ser usado em desenvolvimento
 */
const ApiStatus = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastTest, setLastTest] = useState(null);

  const runTests = async () => {
    setLoading(true);
    try {
      const testResults = await testApiIntegration();
      setResults(testResults);
      setLastTest(new Date());
    } catch (error) {
      console.error('Erro ao executar testes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Executar testes automaticamente na montagem
    runTests();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'empty':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <RefreshCw className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'empty':
        return 'border-yellow-200 bg-yellow-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  // Só renderizar em desenvolvimento
  if (typeof process !== 'undefined' && process?.env?.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Status da API Strapi</h3>
        <button
          onClick={runTests}
          disabled={loading}
          className="p-1 rounded hover:bg-gray-100 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {results.map((result, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-2 rounded border ${getStatusColor(result.status)}`}
          >
            <div className="flex items-center space-x-2">
              {getStatusIcon(result.status)}
              <span className="text-sm font-medium text-gray-700">
                {result.name}
              </span>
            </div>
            
            <div className="text-xs text-gray-500">
              {result.status === 'success' && Array.isArray(result.data) && (
                <span>{result.data.length} itens</span>
              )}
              {result.status === 'error' && (
                <span title={result.error}>Erro</span>
              )}
              {result.status === 'empty' && (
                <span>Vazio</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {lastTest && (
        <div className="mt-3 pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Último teste: {lastTest.toLocaleTimeString()}
          </p>
        </div>
      )}

      {results.length === 0 && !loading && (
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">Clique em atualizar para testar</p>
        </div>
      )}
    </div>
  );
};

export default ApiStatus;
