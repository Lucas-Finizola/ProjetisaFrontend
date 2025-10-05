import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, CheckCircle, Mail, MessageCircle } from 'lucide-react';
import { getStrapiMedia } from '../../../utils/strapiUtils';

const HeroSection = ({ data }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', consumption: '', propertyType: 'residencial' });
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleWhatsAppSubmit = () => {
    const { name, phone, consumption, propertyType } = formData;
    if (!name || !phone || !consumption) {
      alert('Por favor, preencha nome, WhatsApp e valor da conta para simular.');
      return;
    }
    const message = `Olá! Gostaria de uma simulação de energia solar.\n- Nome: ${name}\n- WhatsApp: ${phone}\n- Valor da Conta: R$ ${consumption}\n- Tipo de Imóvel: ${propertyType}`;
    const whatsappUrl = `https://wa.me/5583996556931?text=${encodeURIComponent(message)}`; // Substitua pelo seu número
    window.open(whatsappUrl, '_blank');
  };

  if (!data) return null;

  const heroImageUrl = getStrapiMedia(data.backgroundImage);

  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-gray-800 text-white pt-24 pb-12">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroImageUrl || ''})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" dangerouslySetInnerHTML={{ __html: data.title?.replace('Economia Real', '<span class="text-yellow-400">Economia Real</span>') || '' }} />
            <p className="text-xl md:text-2xl mb-8 text-gray-200">{data.subtitle}</p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={data.primaryButtonLink} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white hover:bg-green-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center shadow-lg">
                <Calculator className="mr-2 w-5 h-5" />
                {data.primaryButtonText}
              </motion.a>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {data.checklistItems?.map((item, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div id="simulacao-form" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">{data.formTitle}</h3>

            <div className="space-y-4">
              <input type="text" name="name" placeholder="Seu nome completo" required onChange={handleInputChange} value={formData.name} className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-300" />
              <input type="tel" name="phone" placeholder="WhatsApp com DDD" required onChange={handleInputChange} value={formData.phone} className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-300" />
              <input type="number" name="consumption" placeholder="Valor médio da conta de luz (R$)" required onChange={handleInputChange} value={formData.consumption} className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-300" />
               <select name="propertyType" value={formData.propertyType} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-300">
                  <option value="residencial" className="text-black">Residencial</option>
                  <option value="comercial" className="text-black">Comercial</option>
                  <option value="industrial" className="text-black">Industrial</option>
                  <option value="rural" className="text-black">Rural</option>
              </select>
            </div>

            <div className="mt-6 flex flex-col gap-4">
              <motion.button onClick={handleWhatsAppSubmit} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg flex items-center justify-center">
                <MessageCircle className="mr-2" />
                Simular via WhatsApp
              </motion.button>
              <form action="https://formspree.io/f/xpwzgqjr" method="POST">
                <input type="hidden" name="name" value={formData.name} />
                <input type="hidden" name="phone" value={formData.phone} />
                <input type="hidden" name="consumption" value={formData.consumption} />
                <input type="hidden" name="propertyType" value={formData.propertyType} />

                <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg flex items-center justify-center">
                  <Mail className="mr-2" />
                  {data.formButtonText || "Enviar por E-mail"}
                </motion.button>
              </form>
            </div>

            <p className="text-xs text-gray-300 text-center mt-4">✓ Seus dados estão seguros conosco</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;