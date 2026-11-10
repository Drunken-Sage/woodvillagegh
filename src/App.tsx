import Header from './components/Header';
import Footer from './components/Footer'
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import Contact from './components/Contact'

function App() {
  return (
    <div className="min-h-screen w-full bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#1D3929]"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="focus:outline-none">
        <Home />
        <About />
        <Products />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;