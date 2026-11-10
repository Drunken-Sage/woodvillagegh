import Header from './components/Header';
import Footer from './components/Footer'
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import Contact from './components/Contact'

function App() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
      <Home />
      <About />
      <Products />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;