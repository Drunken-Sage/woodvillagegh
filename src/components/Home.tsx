import { Button } from './ui/button';


const assurances = [
  {
    index: 1,
    icon: '',
    title: '100% Legally Sourced',
  },
  {
    index: 2,
    icon: '',
    title: '10 Years of Experience',
  },
  {
    index: 3,
    icon: '',
    description: 'Delivery Available'
  }
]

const processingSteps = [
  {
    index: 1,
    icon: '',
    title: 'Log Procurement and Trade',
    description: 'Sourcing quality logs from the Ashanti Region for your timber needs.'
  },
  {
    index: 2,
    icon: '',
    title: 'Processing',
    description: 'Precision processing into boards and planks, sized for your project.'
  },
  {
    index: 3,
    icon: '',
    title: 'Distribution',
    description: 'Supplying individual builders and large-scale timber distributors.'
  },
  {
    index: 4,
    icon: '',
    title: 'Delivery',
    description: 'Moving your timber to Kasoa Timber Market and beyond.'
  }
]

const Home = () => {
  return(
    <div className="w-auto mt-[5rem] p-auto bg-green-950">
      <div>
        <span>GHANAIAN LOCAL TIMBER EXPERTISE</span>
      </div>
      <div>Quality Ghanaian Timber, From the Forest to Your Site.</div>
      <div>Procuring, processing, and delivering premium logs, boards, and planks from the Ashanti Region to Kasoa Timber Market and beyond.</div>
      <div>
        <Button>View Our Wood Species</Button>
        <Button>Contact Us On Whatsapp</Button>
      </div>
      <section className="flex">
        {assurances.map((assurance, index) => (
          <div
            key={index}
            className="flex flex-1 p-1 flex-row justify-center items-center bg-[#DEDFD7] h-10"
          >
            <div className="h-7">{assurance.icon}</div>
            <div className="flex flex-col items-start">
              <h4 className="text-black font-semibold">{assurance.title}</h4>
              <p className="text-black font-semibold">{assurance.description}</p>
            </div>
          </div>
          ))
        }
      </section>
      <section>
        <div>
          <div>ROOTED IN GHANA</div>
          <div>Woodvillage Ghana Ltd. is a leading supplier of high-quality wood products. We manage the entire process, from sustainable procurement in the Ashanti Region forests to precision processing into boards and planks. Whether you are an individual builder or a large-scale distributor, we deliver the right wood at the right size.</div>
        </div>
        <div>
          {/* image of processing */}
        </div>
      </section>
      <section>
        <div>
          <span>WHAT WE DO</span>
        </div>
        <div>
          <span>Timber support, at every step.</span>
        </div>
        <div>
        {
          processingSteps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="h-10">{step.icon}</div>
              <div className="text-black font-semibold">{step.title}</div>
              <div className="text-black font-semibold">{step.description}</div>
            </div>
          ))
        }
        </div>
      </section>
    </div>
  )
}

export default Home;