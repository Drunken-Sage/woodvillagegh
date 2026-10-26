import Header from './components/Header';
import Home from './components/Home';

function App() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
      <Home />
      {/* <main className="min-h-screen" aria-label="Main content">
        <section id="home" className="min-h-screen bg-green-950" />
      </main> */}
    </div>
  );
}

export default App;