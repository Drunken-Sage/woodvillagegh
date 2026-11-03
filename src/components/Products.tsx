import TextMotion from '../components/ui/TextMotion'
import ruler from '../assets/icons/ruler-100.webp'

const Products = () => {

const species = [
  {
    index: 1,
    image: "",
    species: "Esa",
    description: "2 &times; 4 &times; 16ft",
    size: "Sizes Available: 2 x 4 x 16ft"
  },
  {}
]

const size = [
  {
    index: 1,
    icon: ruler,
    alt: "ruler icon",
    size: "2 x 4 x 16ft",
  }
]
  return (
    <section>
      <div className="flex gap-5 flex-col px-6 py-10 sm:py-14 sm:px-20 bg-[#1D3929]">
        <h2 className='text-white font-bold text-3xl sm:text-5xl max-w-5xl tracking-tight'>
          <TextMotion
            text="Premium Wood Species & Custom Sizes"
            preset="shear"
            trigger="onView"
            duration={1}
            stagger={0.1}
            replay={false}
            style={{width: "100%"}}
          />
        </h2>
        <span className="text-[#D6DFD4] text-sm sm:text-lg">
          <TextMotion
            text="We deal in all kinds of wood product, specializing in highly sought-after Ghanaian species."
            preset="slide"
            trigger="onView"
            duration={1}
            stagger={0.1}
            replay={false}
            style={{width: "100%"}}
          />
        </span>
      </div>
      <div className="bg-[#EEE6D6] sm:py-16 sm:px-20 px-6 py-12 ">
        <div className="font-bold text-3xl text-[#1F2421] tracking-tight">
          <h3>Species We Offer</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {species.map((species) => (
              <div key={species.index} className="flex gap-3 items-center">
                {/* <img className="h-6 w-6 object-contain"/> */}
                <div className="text-[#626960] text-sm">{species.species}</div>
                <div className="text-[#626960] text-sm">{species.description}</div>
                <div className="text-[#626960] text-sm">{species.size}</div>
              </div>
            ))}
        </div>
        <div>
          <div>Standard Sizes Available</div>
          <div className="">
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products;