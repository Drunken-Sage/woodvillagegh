import inspectionImg from './../assets/images/logInspectionImage.webp';
import ruggedLoggingTruck from './../assets/images/Rugged Logging Truck in the Forest.webp';
import bossImage from '../assets/images/bossImage.webp';
import TextMotion from '../components/ui/TextMotion'
import { Button } from './ui/button';

const About = () => {
  return(
    <div>
      <section className="flex flex-col sm:px-20 sm:py-12 px-6 py-10 pb-20 sm:pb-28 bg-black] backdrop-blur-sm justify-items-center" style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${ruggedLoggingTruck})`,
            maskImage: 'linear-gradient(to left, bg-transparent 0%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to left, transparent 0%, black 100%)',
          }}>
        <div className="text-[#D6DFD4] text-sm">
          <span>
            <TextMotion
              text="WOODVILLAGE GHANA LTD."
              preset="shear"
              trigger="onView"
              duration={1.4}
              stagger={0.1}
              replay={false}
              style={{width: "100%"}}
            />
          </span>
        </div>
        <div className="text-white font-bold text-5xl mt-3">
          <span>
            <TextMotion
              text="About Us"
              preset="slide"
              trigger="onView"
              duration={1.4}
              stagger={0.1}
              replay={false}
              style={{width: "100%"}}
            />
          </span>
        </div>
      </section>
      <section className="py-12 px-6 sm:p-20 flex gap-5 items-center justify-between sm:flex-row flex-col">
        <div className=" flex flex-col gap-3">
          <p className="font-semibold text-xs text-[#8B5E3C]">
            <TextMotion
              text="OUR STORY"
              preset="slide"
              trigger="onView"
              duration={1.4}
              stagger={0.1}
              replay={false}
              style={{width: "100%"}}
            />
          </p>
          <h2 className="font-bold text-3xl  mb-3">
            <TextMotion
              text="Rooted in Quality, Growing with Trust"
              preset="slide"
              trigger="onView"
              duration={1.4}
              stagger={0.1}
              replay={false}
              style={{width: "100%"}}
            />
          </h2>
          <div className="flex-col lg:flex-row flex sm:gap-20 gap-8">
            <div className="lg:self-auto self-center w-[40vw] shrink-0">
              <img src={inspectionImg} alt="Log Inspection" className="block h-auto w-full object-contain" />
            </div>
            <div className="text-[#626960]  text-base sm:text-lg flex flex-col gap-5 self-center ">
              <p>
                <TextMotion
                  text="Every plank we sell begins as a tree in the Ashanti forests. It stood for years before anyone cut it, and much of what Ghana builds depends on that patience: family homes, churches, schools, workshops. We keep that in mind when a log reaches our yard on Bawjiase Road. It has come a long way, and we want to make good use of it."
                  preset="drop"
                  trigger="onView"
                  duration={1.4}
                  stagger={0.1}
                  delay={0.5}
                  replay={false}
                  style={{width: "100%"}}
                  splitBy="line"
                />
              </p>
              <p>
                <TextMotion
                  text="Our work is slow and careful. Each log is sawn into boards and planks and sorted by size and species, because no two woods are alike. Odum is hard and enduring, Wawa is light and easy to work, and Cedar and Mahogany each have their own grain and use. Ask us what suits a roof, a door or a table, and we will tell you plainly, even when the honest answer is the cheaper wood. At Kasoa Timber Market you can walk the rows and put your hands on the wood before you buy."
                  preset="drop"
                  trigger="onView"
                  duration={1.4}
                  stagger={0.1}
                  delay={0.8}
                  splitBy="line"
                  replay={false}
                  style={{width: "100%"}}
                />
              </p>
              <p>
                <TextMotion
                  text="Some of our customers are finishing a single room, and others supply shops and builders along the road. We sell to both, deliver when asked, and cut special sizes when a job needs them. A carpenter who comes back or a distributor who trusts us with a contract means more to us than any one sale. If you are building something, come and tell us about it."
                  preset="drop"
                  trigger="onView"
                  duration={1.4}
                  stagger={0.1}
                  delay={1.1}
                  splitBy="line"
                  replay={false}
                  style={{width: "100%"}}
                />
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 px-6 sm:p-20 flex gap-3 flex-col bg-[#EDF4EA]">
        <div className="font-semibold text-xs text-[#8B5E3C]">
          <TextMotion
              text="THE PEOPLE BEHIND WOODVILLAGE"
              preset="slide"
              trigger="onView"
              duration={1.4}
              stagger={0.1}
              replay={false}
              style={{width: "100%"}}
          />
        </div>
        <div className="font-bold text-3xl">
          <TextMotion
              text="Our team"
              preset="slide"
              trigger="onView"
              duration={1.4}
              stagger={0.1}
              delay={0.5}
              replay={false}
              style={{width: "100%"}}
           />
        </div>
        <img src={bossImage} alt="Team Photo" className="sm:h-96 aspect-video self-center" />
        <div className="border-l-[#8B5E3C] border-l-3 rounded-sm p-5 text-sm">
          <p className="font-black text-sm mb-2">
            <TextMotion
              text="Our Vision"
              preset="drop"
              trigger="onView"
              duration={1.4}
              stagger={0.1}
              splitBy="line"
              delay={0.5}
              replay={false}
              style={{width: "100%"}}
            />
          </p>
          <p className="text-[#626960]">
            <TextMotion
              text="Quality Timber Service All-Day Everyday To The Customer, For The Customer."
              preset="drop"
              trigger="onView"
              duration={1}
              stagger={0.1}
              splitBy="line"
              delay={0.6}
              replay={false}
              style={{width: "100%"}}
            />
          </p>
        </div>
      </section>
      <section className="px-6 py-12 sm:p-14 bg-[#2E7D32]">
        <div className="flex items-center justify-between flex-col sm:flex-row gap-6 sm:gap3">
          <div className="font-bold text-3xl text-white mb-2">
            <span>
              <TextMotion
              text="Visit our storefront or place an order"
              preset="drop"
              trigger="onView"
              duration={1}
              stagger={0.1}
              splitBy="word"
              replay={false}
              style={{width: "100%"}}
              />
            </span>
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