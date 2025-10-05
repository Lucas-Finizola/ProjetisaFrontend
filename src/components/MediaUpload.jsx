import React, { useState, useCallback } from 'react';
import { Upload, X, Image, FileText, Video } from 'lucide-react';

const MediaUpload = ({ 
  onUpload, 
  accept = "image/*", 
  multiple = false, 
  maxSize = 5 * 1024 * 1024, // 5MB
  className = "" 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileSelect = useCallback((e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  }, []);

  const handleFiles = async (files) => {
    setUploading(true);
    
    try {
      const validFiles = files.filter(file => {
        if (file.size > maxSize) {
          alert(`Arquivo ${file.name} é muito grande. Máximo: ${maxSize / 1024 / 1024}MB`);
          return false;
        }
        return true;
      });

      const uploadPromises = validFiles.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        // Simula upload - em produção, integrar com API de upload
        return new Promise((resolve) => {
          setTimeout(() => {
            const url = `/uploads/${file.name}`;
            resolve({
              name: file.name,
              url: url,
              type: file.type,
              size: file.size
            });
          }, 1000);
        });
      });

      const results = await Promise.all(uploadPromises);
      setUploadedFiles(prev => [...prev, ...results]);
      
      if (onUpload) {
        onUpload(multiple ? results : results[0]);
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Erro ao fazer upload dos arquivos');
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return <Image className="w-4 h-4" />;
    if (type.startsWith('video/')) return <Video className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Área de Upload */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${uploading ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-700">
            {uploading ? 'Fazendo upload...' : 'Arraste arquivos aqui'}
          </p>
          <p className="text-sm text-gray-500">
            ou clique para selecionar
          </p>
        </div>

        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
          disabled={uploading}
        />
        
        <label
          htmlFor="file-upload"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition-colors"
        >
          Selecionar Arquivos
        </label>

        <p className="text-xs text-gray-400 mt-2">
          Máximo: {maxSize / 1024 / 1024}MB por arquivo
        </p>
      </div>

      {/* Lista de Arquivos Enviados */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Arquivos Enviados:
          </h4>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(file.type)}
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaUpload;

