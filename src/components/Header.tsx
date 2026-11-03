import { useState, useEffect } from 'react';
import logo from '../assets/images/logo.png';
import { FaWhatsapp } from 'react-icons/fa';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Contact', href: '#contact' },
  ];

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={`pl-auto justify-between fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        isScrolled
          ? 'bg-transparent text-black backdrop-blur-sm shadow-xl'
          : 'bg-white/50 text-black backdrop-blur-sm shadow-xl'
      }`}
    >
      <nav
        className="relative mx-auto flex w-[calc(100%-1rem)] max-w-400 items-center justify-between gap-6 py-3 min-[721px]:w-[calc(100%-2rem)] min-[721px]:py-4"
        aria-label="Main navigation"
      >
        <div className="flex h-13 w-19 shrink-0 items-center justify-center" aria-label="Wood Village home">
          <img className="object-contain w-max" src={logo} alt="Wood Village logo" />
        </div>

        <div
          className={`relative flex flex-1 items-center justify-center gap-8 transition-[opacity,transform] duration-200 max-[640px]:absolute max-[640px]:top-[calc(100%+0.5rem)] max-[640px]:right-0 max-[640px]:left-0 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-4 max-[640px]:rounded-[18px] max-[640px]:border max-[640px]:border-slate-400/25 max-[640px]:bg-[#2E7D32] max-[640px]:p-4 max-[640px]:shadow-[0_18px_35px_rgba(15,23,42,0.35)] ${
            isMobileMenuOpen
            // rgb(15,23,42,0.35) is the same as rgb(130, 225, 111)
              ? 'max-[640px]:translate-y-0 max-[640px]:opacity-100 max-[640px]:pointer-events-auto hover:text-white'
              : 'max-[640px]:-translate-y-2 max-[640px]:opacity-0 max-[640px]:pointer-events-none'
          }`}
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`relative inline-block text-[0.96rem] font-semibold no-underline transition-[color,padding-left] duration-200 after:absolute after:bottom-[-0.35rem] after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-[#25d366] after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100 focus-visible:outline-none focus-visible:after:scale-x-100 max-[640px]:w-full max-[640px]:whitespace-nowrap max-[640px]:py-1 max-[640px]:text-[0.85rem] max-[640px]:text-white hover:pl-1 ${
                isScrolled
                  ? 'text-black hover:text-[#25d366] focus-visible:text-neutral-800'
                  : 'text-black hover:text-[#25d366] focus-visible:text-white'
              }`}
              onClick={closeMenu}
            >
              {item.name}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="ml-auto hidden h-11.5 w-11.5 shrink-0 cursor-pointer flex-col items-center justify-center gap-[0.3rem] rounded-full border border-white/15 bg-white/5 p-0 max-[640px]:flex"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((current) => !current)}
        >
          <span className="block h-0.5 w-4.5 rounded-full bg-current" />
          <span className="block h-0.5 w-4.5 rounded-full bg-current" />
          <span className="block h-0.5 w-4.5 rounded-full bg-current" />
        </button>

        <a
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#25d366] px-4 py-[0.7rem] font-bold text-[#081b11] no-underline shadow-[0_5px_10px_rgba(37,211,102,0.28)] transition-[transform,box-shadow] duration-200 hover:-translate-y-px hover:shadow-[0_10px_15px_rgba(37,211,102,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25d366] max-[640px]:hidden max-[640px]:px-[0.8rem] max-[640px]:py-[0.6rem] max-[640px]:text-[0.8rem]"
          href="#contact"
          aria-label="WhatsApp"
          onClick={closeMenu}
        >
          <FaWhatsapp aria-hidden="true" />
          <span>Chat on WhatsApp</span>
        </a>
      </nav>
    </header>
  );
};

export default Header;