import logo from '../assets/images/logo.png'

const Footer = () => {
 return(
  <section className="flex gap-6 sm:flex-row flex-col bg-[#182C20] text-white justify-between items-start p-15">
    <div className="flex flex-col">
      <img src={logo} alt="woodvillage logo" className="h-20 w-15 object-contain"/>
      <div className="text-lg">Quality Ghanaian Timber</div>
    </div>
    <div>
      <div className="font-bold text-sm mb-3">Quick Links</div>
      <div className="text-[#D6DFD4] text-sm">
        <div className="my-1">Home</div>
        <div className="my-1">About</div>
        <div className="my-1">Products</div>
        <div className="my-1">Contact</div>
      </div>
    </div>
    <div>
      <div className="font-bold text-sm mb-3">Get in Touch</div>
      <div className="text-[#D6DFD4] text-sm">
        <div>Phone:</div>
        <div className="ml-1">
          <div>+233 (0)50-453-7373</div>
          <div>+233 (0)55-507-7373</div>
          <div>+233 (0)55-855-4524</div>
        </div>
        <div className="mt-1">Email:</div>
        <div className="ml-1">oforiawuahp@gmail.com</div>
      </div>
    </div>
    <div>
      <div className="font-bold text-sm mb-3">Find Us</div>
      <div className="text-[#D6DFD4] text-sm">Kasoa Timber Market, Bawjiase Road <br /> Kasoa, Ghana</div>
    </div>
  </section>
 )
}
export default Footer;