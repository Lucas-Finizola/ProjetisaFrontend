import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para fechar o menu ao clicar em um link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-green-600 text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto">
        <nav className="flex justify-between items-center md:grid md:grid-cols-3">
          {/* Coluna da Esquerda: Logo */}
          <div className="justify-self-start">
            <Link href="/">
              <Image 
                src="/images/MARCA PROJETISA.png" 
                alt="Logo da Projetisa" 
                width={120}
                height={48}
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Coluna Central: Navegação Desktop */}
          <div className="hidden md:flex justify-self-center">
            <ul className="flex space-x-4">
              <li><Link href="/" className="hover:text-gray-300">Início</Link></li>
              <li><Link href="/sobre" className="hover:text-gray-300">Sobre</Link></li>
              <li><Link href="/servicos" className="hover:text-gray-300">Serviços</Link></li>
              <li><Link href="/projetos" className="hover:text-gray-300">Projetos</Link></li>
              <li><Link href="/noticias" className="hover:text-gray-300">Notícias</Link></li>
              <li><Link href="/contact" className="hover:text-gray-300">Contato</Link></li>
            </ul>
          </div>

          {/* Coluna da Direita: Botão de Menu Mobile ou Espaço Vazio */}
          <div className="justify-self-end flex items-center">
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Abrir menu">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Menu Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <ul className="flex flex-col items-center space-y-4">
              <li><Link href="/" className="hover:text-gray-300 block py-2" onClick={handleLinkClick}>Início</Link></li>
              <li><Link href="/sobre" className="hover:text-gray-300 block py-2" onClick={handleLinkClick}>Sobre</Link></li>
              <li><Link href="/servicos" className="hover:text-gray-300 block py-2" onClick={handleLinkClick}>Serviços</Link></li>
              <li><Link href="/projetos" className="hover:text-gray-300 block py-2" onClick={handleLinkClick}>Projetos</Link></li>
              <li><Link href="/noticias" className="hover:text-gray-300 block py-2" onClick={handleLinkClick}>Notícias</Link></li>
              <li><Link href="/contact" className="hover:text-gray-300 block py-2" onClick={handleLinkClick}>Contato</Link></li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
