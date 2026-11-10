import TextMotion from '../components/ui/TextMotion'
import Flashcard from '../components/ui/Flashcard'
import ruler from '../assets/icons/ruler-100.webp'
import forest from '../assets/icons/forest-96.webp'
import warehouse from '../assets/icons/warehouse-64.webp'
import truck from '../assets/icons/semi-truck-side-view-50.webp'
import network from '../assets/icons/network.png'

const Products = () => {

const species = [
  {
    index: 1,
    image: "",
    species: "Esa",
    alias: "Celtis, Asan, Ba, Esa-fufuo, Esa-pa",
    uses: "Furniture, Flooring, Joinery, Tool Handles, etc.",
    size: "2''\u00D74''\u00D716ft"
  },
  {
    index: 2,
    image: "",
    species: "Yaya",
    alias: "Asanfran, Bokanga",
    uses: "Mouldings, Doors, Plywood, Veneer, etc.",
    size: "2''\u00D74''\u00D716ft"
  },
  {
    index: 3,
    image: "",
    species: "Ceiba",
    alias: "Fromager, Fuma, Onyaa, Onyina",
    uses: "Boxes, Food Containers, Mouldings, etc.",
    size: "2''\u00D74''\u00D716ft"
  },
  {
    index: 4,
    image: "",
    species: "Denya",
    alias: "Adoum, Edum, Okan",
    uses: "Piling, Bridges, etc.",
    size: "2''\u00D74''\u00D716ft"
  },
  {
    index: 5,
    image: "",
    species: "Wawa",
    alias: "Abache, Ayous",
    uses: "Woodware, Sauna Linings, Shoe Heels, Veneer - Rotary, Trim, Toys, etc.",
    size: "2''\u00D74''\u00D716ft"
  },
  {
    index: 6,
    image: "",
    species: "Kyenkyen",
    alias: "Abako, Baku, Bakure",
    uses: "Toys, Shelving, Boxes, Tool Handles, Carving, Trim, etc.",
    size: "2''\u00D74''\u00D716ft"
  },
  {
    index: 7,
    image: "",
    species: "Essia",
    alias: "Abale, Abine, Abing, Esia",
    uses: "Veneer - Sliced, Sleepers, Construction - Utility, Carpentry, etc.",
    size: "2''\u00D74''\u00D716ft"
  },
  {
    index: 8,
    image: "",
    species: "Ofram",
    alias: "Afara, Afraa, Akom, Faraen",
    uses: "Furniture, Mouldings, Panelling, etc.",
    size: "2''\u00D74''\u00D716ft"
  },
  {
    index: 9,
    image: "",
    species: "Otie",
    alias: "Akomu, Eteng, Etsi",
    uses: "Furniture, Boxes, etc.",
    size: "2''\u00D74''\u00D716ft"
  }
]

const size = [
  {
    index: 1,
    icon: ruler,
    alt: "ruler icon",
    size: "2''\u00D74''\u00D716ft",
  },
  {
    index: 2,
    icon: ruler,
    alt: "ruler icon",
    size: "2''\u00D76''\u00D716ft",
  },
  {
    index: 3,
    icon: ruler,
    alt: "ruler icon",
    size: "2''\u00D78''\u00D716ft",
  },
  {
    index: 4,
    icon: ruler,
    alt: "ruler icon",
    size: "1''\u00D712''\u00D716ft",
  }
]

const services = [
  {
    index: 1,
    icon: forest,
    alt: "Forest icon",
    title: "Log Procurement & Trade",
    description: "We specialise in the sourcing and procurement of quality timber logs from carefully selected suppliers and sources within the Ashanti Region of Ghana. Our procurement process focuses on obtaining suitable timber species to meet varying customer demands and production requirements. By maintaining reliable sourcing channels, we support a steady supply of raw materials for processing, wholesale and distribution."
  },
  {
    index: 2,
    icon: ruler,
    alt: "Ruler icon",
    title: "Processing",
    description: "We transform raw timber logs into quality boards, planks and other usable wood products through our timber processing operations. Our services cater to different construction, furniture-making and commercial requirements, with attention to accurate measurements, suitable dimensions and product quality. We also accommodate custom cutting and sizing requests, allowing customers to obtain timber products that meet the specific needs of their projects."
  },
  {
    index: 3,
    icon: warehouse,
    alt: "",
    title: "Wholesale Supply",
    description: "We provide wholesale timber supply services to retailers, construction companies, contractors, furniture manufacturers and other businesses requiring timber in larger quantities. Whether you are sourcing materials for a major construction project or looking to maintain your business inventory, we offer a range of wood species and dimensions to accommodate different requirements. Our goal is to make quality timber accessible to both established businesses and growing enterprises."
  },
  {
    index: 4,
    icon: network,
    alt: "Warehouse icon",
    title: "Distribution",
    description: "We facilitate the distribution and supply of processed timber products to customers, businesses and commercial partners. Through our procurement, processing and supply operations, we help bridge the gap between timber production and the customers who depend on quality wood materials. We strive to make the sourcing and acquisition of timber more convenient by providing access to various wood species, product dimensions and order quantities.",
  },
  {
    index: 5,
    icon: truck,
    alt: "Truck icon",
    title: "Delivery",
    description: "We offer delivery arrangements to help customers receive their purchased timber products at their preferred locations. Whether you are purchasing for a construction project, furniture production or commercial purposes, we work with customers to coordinate convenient transportation arrangements based on their order requirements and destination. Delivery services are available at an additional cost, which is borne by the customer."
  }
]
  return (
    <section id="products" className="scroll-mt-24">
      <div className="flex gap-5 flex-col px-6 py-10 sm:py-14 sm:px-20 bg-[#1D3929]">
        <TextMotion
            as="h2"
            className="text-white font-bold text-3xl sm:text-5xl max-w-5xl tracking-tight"
            text="Premium Wood Species & Custom Sizes"
            preset="neon"
            trigger="onView"
            delay={0.3}
            splitBy="word"
            replay={false}
            style={{width: "100%"}}
          />
        <TextMotion
            as="p"
            className="text-[#D6DFD4] text-sm sm:text-lg"
            text="We deal in all kinds of wood product, specializing in highly sought-after Ghanaian species."
            preset="slide"
            trigger="onView"
            duration={1.4}
            stagger={0.1}
            splitBy="line"
            replay={false}
            style={{width: "100%"}}
          />
      </div>
      <div id="species" className="scroll-mt-24 bg-[#EEE6D6] sm:py-16 sm:px-20 px-6 py-12 flex flex-col gap-10">
        <TextMotion
              as="h3"
              className="font-bold text-3xl text-[#1F2421] tracking-tight"
              text="Species We Offer"
              preset="drop"
              trigger="onView"
              duration={1.4}
              stagger={0.1}
              splitBy="line"
              replay={false}
              style={{width: "100%"}}
            />
        <div className="bg-[#EEE6D6]">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
            {species.map((species) => (
              <div key={species.index} className="flex flex-col gap-3 border-gray max-w-90">
                <Flashcard
                  className="max-w-md"
                  height="h-40"

                  renderFront={
                    <div className="h-full w-full rounded-2xl border bg-white p-6 shadow-[0_0_10px_rgba(0,0,0,0.1)] flex flex-col justify-center items-center gap-3">
                      <div className="text-black font-bold text-lg sm:text-xl">{species.species}</div>
                      <div className='text-gray-500 text-sm text-[12px]'>See More &gt;</div>
                    </div>
                  }

                  renderBack={
                    <div className="h-full w-full overflow-hidden rounded-2xl border bg-white shadow-md">
                      <div className="h-full w-full overflow-y-auto overscroll-contain p-6 flex flex-col gap-3">
                        <div className="text-[#626960] text-[12px] sm:text-sm"><span className="text-black font-semibold">Alias:</span> {species.alias}</div>
                        <div className="text-[#626960] text-[12px] sm:text-sm"><span className="text-black font-semibold">Usage Examples:</span> {species.uses}</div>
                        <div className="text-[#626960] text-[12px] sm:text-sm"><span className="text-black font-semibold">Available Sizes:</span> {species.size}</div>
                      </div>
                    </div>
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[#F7F5F0] sm:px-20 sm:py-14 flex flex-col gap-5 px-12 py-6">
        <div className="text-[28px] sm:text-3xl font-bold tracking-tight">Standard Sizes Available</div>
        <div className="flex flex-wrap gap-3 rounded-xl justify-center">
          {size.map((size) => (
            <div key={size.index} className="flex bg-white border-[#DEDFD7] border gap-3 items-center p-3 rounded-sm max-w-52 basis-44 grow min-w-40">
              <img src={size.icon} alt={size.alt} className="h-6 w-6 object-contain"/>
              <div className="text-[#1F2421] text-xl font-bold tracking-tight sm:tracking-normal">{size.size}</div>
            </div>
          ))}
        </div>
      </div>
      <div className='py-12 px-6 sm:px-20 sm:py-16 pb-0'>
        <div className=' flex flex-col bg-[#EDF4EA] p-6 sm:p-10 rounded-lg gap-4'>
          <div className='font-bold sm:text-3xl text-[28px]'>Custom Orders</div>
          <div className='text-[#1F2421]'>Need a specific dimension? We offer custom cutting and sizing. <span className='font-bold'>Other sizes can be specially ordered</span> to meet your exact project requirements.</div>
        </div>
      </div>
      <div className='sm:px-20 sm:py-16 py-12 px-6 flex flex-col gap-8'>
          <TextMotion
              as="h2"
              className="font-bold text-3xl"
              text="Our Services"
              preset="split"
              trigger="onView"
              duration={0.5}
              stagger={0.1}
              splitBy="word"
              replay={false}
              style={{width: "100%"}}
            />
          <div className='flex gap-5 flex-col'>
            {
              services.map((service) =>
                <div key={service.index} className='flex flex-col gap border p-6 rounded-lg border-[#DEDFD7] bg-[#EDF4EA]'>
                  <div className='flex flex-row justify-between w-full'>
                    <img src={service.icon} alt="card icon" className='h-15 w-15'/>
                    <div className='self-center text-[#8B5E3C] font-semibold'>{service.index}.</div>
                  </div>
                  <div className="text-black font-bold text-xl mb-5">{service.title}</div>
                  <div className='text-[#626960] text-sm'>{service.description}</div>
                </div>
              )
            }
          </div>
      </div>
    </section>
  )
}

export default Products;