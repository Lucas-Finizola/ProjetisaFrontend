import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  // Adicionando os links corretos das redes sociais
  const socialLinks = [
    { icon: <Facebook />, href: 'https://www.facebook.com/projetisaenergiasolar', name: 'Facebook' },
    { icon: <Instagram />, href: 'https://www.instagram.com/projetisa_engenharia/', name: 'Instagram' },
    { icon: <Linkedin />, href: 'https://www.linkedin.com/company/projetisa-solu%C3%A7%C3%B5es-engenharia/about/', name: 'LinkedIn' },
  ];

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Serviços', path: '/servicos' },
    { name: 'Projetos', path: '/projetos' },
    { name: 'Contato', path: '/contact' },
  ];

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-1">
            <Image 
              src="/images/MARCA PROJETISA.png" 
              alt="Projetisa Logo" 
              width={120}
              height={48}
              className="h-12 w-auto mb-4" 
            />
            <p className="text-gray-400 text-sm">
              Soluções inovadoras em engenharia elétrica e energia solar.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.name}>
                  <Link href={link.path} className="text-gray-400 hover:text-white transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Entre em Contato</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="mailto:contato@projetisa.eng.br" className="hover:text-white">contato@projetisa.eng.br</a></li>
              <li><a href="tel:+5583996556931" className="hover:text-white">(83) 9 9655-6931</a></li>
              <li><a href="tel:+558321867527" className="hover:text-white">(83) 2186-7527</a></li>
              <li className="pt-2">R. Empresário João Rodrigues Alves, 125 - Sala 910 - Jardim Oceania, João Pessoa - PB</li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Siga-nos</h3>
            <div className="flex space-x-4">
              {socialLinks.map(social => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Projetisa Engenharia. Todos os direitos reservados.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link href="/privacy" className="hover:text-white">Política de Privacidade</Link>
            <Link href="/terms" className="hover:text-white">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
