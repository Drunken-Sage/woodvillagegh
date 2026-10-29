import inspectionImg from './../assets/images/logInspectionImage.webp';
import ruggedLoggingTruck from './../assets/images/Rugged Logging Truck in the Forest.webp';
import bossImage from '../assets/images/bossImage.webp';

// import 
import { Button } from './ui/button';

const About = () => {
  return(
    <div>
      <section className="flex flex-col px-20 py-12 pb-28 bg-black] backdrop-blur-sm" style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${ruggedLoggingTruck})`,
            maskImage: 'linear-gradient(to left, bg-transparent 0%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to left, transparent 0%, black 100%)',
          }}>
        <div className="text-[#D6DFD4] text-sm">
          <span>WOODVILLAGE GHANA LTD.</span>
        </div>
        <div className="text-white font-bold text-5xl mt-3">
          <span>About Us</span>
        </div>
      </section>
      <section className="p-20 pl-0 flex gap-5 items-center justify-between">
        <div className="w-[33vw] shrink-0">
          <img src={inspectionImg} alt="Log Inspection" className="block h-auto w-full object-contain" />
        </div>
        <div className="max-w-3xl">
          <div className="flex flex-col gap-5">
            <p className="font-semibold text-xs">OUR STORY</p>
            <h2 className="font-bold text-3xl">Rooted in Quality, Growing with Trust</h2>
            <div className="text-[#626960] text-lg flex flex-col gap-5">
              <p>Every plank we sell begins as a tree in the Ashanti forests. It stood for years before anyone cut it, and much of what Ghana builds depends on that patience: family homes, churches, schools, workshops. We keep that in mind when a log reaches our yard on Bawjiase Road. It has come a long way, and we want to make good use of it.</p>
              <p>Our work is slow and careful. Each log is sawn into boards and planks and sorted by size and species, because no two woods are alike. Odum is hard and enduring, Wawa is light and easy to work, and Cedar and Mahogany each have their own grain and use. Ask us what suits a roof, a door or a table, and we will tell you plainly, even when the honest answer is the cheaper wood. At Kasoa Timber Market you can walk the rows and put your hands on the wood before you buy.</p>
              <p>Some of our customers are finishing a single room, and others supply shops and builders along the road. We sell to both, deliver when asked, and cut special sizes when a job needs them. A carpenter who comes back or a distributor who trusts us with a contract means more to us than any one sale. If you are building something, come and tell us about it.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="p-20 flex gap-3 flex-col bg-[#EDF4EA]">
        <div className="font-semibold text-xs text-[#8B5E3C]">THE PEOPLE BEHIND WOODVILLAGE</div>
        <div className="font-bold text-3xl">Our team</div>
        <img src={bossImage} alt="Team Photo" className="h-96 aspect-video self-center" />
        <div className="border-l-[#8B5E3C] border-l-3 rounded-sm p-5 text-sm">
          <p className="font-black text-sm">Caption placeholder</p>
          <p className="text-[#626960]">Short owner or team caption to be supplied.</p>
        </div>
      </section>
      <section className="p-14 bg-[#2E7D32]">
        <div className="flex items-center justify-between">
          <div className="font-bold text-3xl text-white mb-2">
            <span>Visit our storefront or place an order</span>
          </div>
          <div>
            <Button className="border-0 bg-transparent p-8 ml-1.5 py-6 ring-1 ring-inset ring-white hover:cursor-pointer hover:bg-white/20">Contact</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About;