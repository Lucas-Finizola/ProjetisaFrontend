import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, X } from 'lucide-react';
import { getStrapiMedia } from '../../../utils/strapiUtils';

// Componente Modal para exibir o vídeo
const VideoModal = ({ video, onClose }) => {
  const videoUrl = getStrapiMedia(video.attributes.video);
  if (!videoUrl) {
    onClose();
    return null;
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <video src={videoUrl} className="w-full aspect-video" controls autoPlay playsInline />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-1.5 text-black transition-colors"
          aria-label="Fechar vídeo"
        >
          <X size={24} />
        </button>
      </motion.div>
    </motion.div>
  );
};

const VideoSection = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  if (!videos || videos.length === 0) return null;

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Clientes Reais, Histórias Reais</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Veja o impacto da energia solar na vida e nos negócios de nossos clientes.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => {
            const { nomeCliente, thumbnail } = video.attributes;
            const thumbnailUrl = getStrapiMedia(thumbnail);
            return (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedVideo(video)}
                className="relative group bg-white rounded-lg shadow-lg overflow-hidden h-full cursor-pointer"
                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
              >
                <div className="relative aspect-video bg-black">
                  <img src={thumbnailUrl || 'https://placehold.co/600x400/334155/FFFFFF?text=Video'} alt={`Capa do depoimento de ${nomeCliente}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle className="w-16 h-16 text-white drop-shadow-lg transform group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 truncate" title={nomeCliente}>{nomeCliente}</h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      {/* AnimatePresence é do framer-motion, para animar a saída do modal */}
      <motion.AnimatePresence>
        {selectedVideo && <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
      </motion.AnimatePresence>
    </section>
  );
};

export default VideoSection;