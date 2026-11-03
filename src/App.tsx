import Header from './components/Header';
import Footer from './components/Footer'
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';

function App() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
      <Home />
      <About />
      <Footer />
      <Products />
    </div>
  );
}

export default App;