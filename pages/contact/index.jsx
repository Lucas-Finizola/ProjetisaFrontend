import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [state, handleSubmit] = useForm("xpwzgqjr"); // Seu ID Formspree

  if (state.succeeded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-50 py-12 lg:py-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">Mensagem Enviada!</h1>
        <p className="text-lg text-gray-700 max-w-xl">Obrigado por entrar em contato. Sua mensagem foi recebida com sucesso e entraremos em contato em breve.</p>
        <button
          onClick={() => window.location.reload()} // Recarrega a página para permitir novo envio
          className="mt-8 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors shadow-lg"
        >
          Enviar Outra Mensagem
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Fale Conosco</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Tem alguma dúvida ou quer iniciar um projeto? Estamos aqui para ajudar.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Formulário de Contato */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envie sua Mensagem</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <input type="text" id="name" name="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Seu nome" required />
                <ValidationError prefix="Name" field="name" errors={state.errors} />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="seu@email.com" required />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">WhatsApp com DDD</label>
                  <input type="tel" id="phone" name="phone" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="(XX) XXXXX-XXXX" required />
                  <ValidationError prefix="Phone" field="phone" errors={state.errors} />
                </div>
              </div>

              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">Assunto de Interesse</label>
                <input type="text" id="interest" name="interest" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Ex: Orçamento para Energia Solar" />
                <ValidationError prefix="Interest" field="interest" errors={state.errors} />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Endereço (opcional, para agilizar orçamento)</label>
                <input type="text" id="address" name="address" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Rua, Número, Bairro, Cidade" />
                <ValidationError prefix="Address" field="address" errors={state.errors} />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Sua Mensagem</label>
                <textarea id="message" name="message" rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Digite aqui os detalhes do seu projeto ou sua dúvida..." required></textarea>
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>

              <button type="submit" disabled={state.submitting} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-md hover:shadow-lg">
                {state.submitting ? "Enviando..." : "Enviar Mensagem"}
              </button>
              <ValidationError errors={state.errors} />
            </form>
          </div>

          {/* Informações de Contato */}
          <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nossos Canais</h2>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                 <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Telefone Fixo</h3>
                <p className="text-gray-600">(83) 2186-7527</p>
              </div>
            </div>
             <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                 <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">WhatsApp</h3>
                <a href="https://wa.me/5583996556931" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">(83) 9 9655-6931</a>
              </div>
            </div>
            <div className="flex items-start space-x-4">
               <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Email</h3>
                <a href="mailto:contato@projetisa.eng.br" className="text-green-600 hover:underline">contato@projetisa.eng.br</a>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Endereço</h3>
                <p className="text-gray-600">R. Empresário João Rodrigues Alves, 125 - Sala 910 - Jardim Oceania, João Pessoa - PB, 58037-050</p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200">
                <a href="https://wa.me/5583996556931" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                    <MessageCircle className="w-6 h-6 mr-3" />
                    Chamar no WhatsApp
                </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
