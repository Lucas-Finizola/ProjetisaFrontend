import '../styles/globals.css'; // Importa o Tailwind CSS
import Header from '../src/components/layout/Header';
import Footer from '../src/components/layout/Footer';
import { AnimatePresence } from 'framer-motion';

// Este é o componente principal que envolve todas as suas páginas
function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default MyApp;