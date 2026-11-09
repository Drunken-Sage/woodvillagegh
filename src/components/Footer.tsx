import {
  FaBoxOpen,
  FaEnvelope,
  FaHouse,
  FaInfo,
  FaLocationDot,
  FaPhone,
} from 'react-icons/fa6';
import logo from '../assets/images/WoodVillage Ghana Logo.avif';

const Footer = () => {
  const quickLinks = [
    { label: 'Home', href: '#home', icon: <FaHouse /> },
    { label: 'About', href: '#about', icon: <FaInfo /> },
    { label: 'Products', href: '#products', icon: <FaBoxOpen /> },
    { label: 'Contact', href: '#contact', icon: <FaPhone /> },
  ];

  return (
    <section id="contact" className="scroll-mt-24 flex gap-6 sm:flex-row flex-col bg-[#182C20] text-white justify-between items-start sm:p-15 py-12 px-6">
      <div className="flex flex-col self-center ">
        <img src={logo} alt="woodvillage logo" className="h-20 w-15 scale-200 object-contain self-center" />
        <div className="text-lg text-center w-full">Quality Ghanaian Timber</div>
      </div>

      <div>
        <div className="font-bold text-sm mb-3">Quick Links</div>
        <div className="text-[#D6DFD4] text-sm">
          {quickLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="my-2 flex items-center gap-2 text-[#D6DFD4] no-underline"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D6DFD4]/10 text-xs text-[#F3F7F2]">
                {link.icon}
              </span>
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div>
        <div className="font-bold text-sm mb-3">Get in Touch</div>
        <div className="text-[#D6DFD4] text-sm">
          <div className="mb-2 flex items-center gap-2 font-medium text-white">
            <FaPhone className="text-sm" />
            <span>Phone:</span>
          </div>
          <div className="ml-1 space-y-1">
            <a href="tel:+233504537373" className="flex items-center gap-2 text-[#D6DFD4] no-underline">
              <span className="text-xs text-[#F3F7F2]">•</span>
              +233 (0)50-453-7373
            </a>
            <a href="tel:+233550573773" className="flex items-center gap-2 text-[#D6DFD4] no-underline">
              <span className="text-xs text-[#F3F7F2]">•</span>
              +233 (0)55-507-7373
            </a>
            <a href="tel:+233558554524" className="flex items-center gap-2 text-[#D6DFD4] no-underline">
              <span className="text-xs text-[#F3F7F2]">•</span>
              +233 (0)55-855-4524
            </a>
          </div>

          <div className="mt-3 flex items-center gap-2 font-medium text-white">
            <FaEnvelope className="text-sm" />
            <span>Email:</span>
          </div>
          <a href="mailto:oforiawuahp@gmail.com" className="ml-1 mt-1 flex items-center gap-2 text-[#D6DFD4] no-underline">
            <span className="text-xs text-[#F3F7F2]">•</span>
            oforiawuahp@gmail.com
          </a>
        </div>
      </div>

      <div>
        <div className="font-bold text-sm mb-3">Find Us</div>
        <a
          href="https://maps.google.com/?q=Kasoa+Timber+Market+Bawjiase+Road+Kasoa+Ghana"
          target="_blank"
          rel="noreferrer"
          className="flex items-start gap-2 text-[#D6DFD4] text-sm no-underline"
        >
          <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#D6DFD4]/10 text-[#F3F7F2]">
            <FaLocationDot className="text-[0.7rem]" />
          </span>
          <span>
            Kasoa Timber Market, Bawjiase Road - <br /> Kasoa, Ghana
          </span>
        </a>
      </div>
    </section>
  );
};

export default Footer;