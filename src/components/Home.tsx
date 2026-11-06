import { Button } from './ui/button';
import TiltedGridHero from './ui/tilted-grid-hero';
import woodFloorGrains from '../assets/images/woodFloorGrains.webp';
import treeTrunkForest from '../assets/images/treeTrunkForest.webp';
import treeTrunkClearing from '../assets/images/treeTrunkClearing.webp';
import treeTopsWithDirtPath from '../assets/images/treeTopsWithDirtPath.webp';
import treeTopsAngled from '../assets/images/treeTopsAngled.webp';
import treeTops from '../assets/images/treeTops.webp';
import treeCrossSection from '../assets/images/treeCrossSection.webp';
import treeCanopy from '../assets/images/treeCanopy.webp';
import sawedWoodStack from '../assets/images/sawedWoodStack.webp';
import ruggedLoggingTruck from '../assets/images/Rugged Logging Truck in the Forest.webp';
import clockIcon from '../assets/icons/wait.gif';
import leafIcon from '../assets/icons/leaves.gif';
import deliveryIcon from '../assets/icons/truck.gif';
import sawedWood from '../assets/images/sawedWood.webp';
import planksImage from '../assets/images/planksImage.webp';
import logsImage from '../assets/images/logs.webp';
import logInspectionImage from '../assets/images/logInspectionImage.webp';
import godRaysInWoods from '../assets/images/godRaysInWoods.webp';
import forestImage from '../assets/images/forestImage.webp';
import chainsawOnLog from '../assets/images/chainsawOnLog.webp';
import chainsawMan from '../assets/images/chainsawMan.webp';
import forestIcon from '../assets/icons/forest-96.webp';
import rulerIcon from '../assets/icons/ruler-100.webp';
import truckIcon from '../assets/icons/semi-truck-side-view-50.webp';
import warehouseIcon from '../assets/icons/warehouse-64.webp';
import TextMotion from '../components/ui/TextMotion'
import { motion } from 'framer-motion';


const assurances = [
  {
    index: 1,
    icon: leafIcon,
    alt: 'leaf icon',
    title: '100% Legally Sourced',
    description: `Timber sourced in line with Ghana's forestry and timber regulations.`
  },
  {
    index: 2,
    icon: clockIcon,
    alt: 'clock icon',
    title: '10 Years of Experience',
    description: 'A decade of experience sourcing, processing, and supplying quality Ghanaian timber.'
  },
  {
    index: 3,
    icon: deliveryIcon,
    alt: 'delivery icon',
    title: 'Delivery Available',
    description: 'Delivery to Kasoa Timber Market and beyond.'
  }
]

const processingSteps = [
  {
    index: 1,
    icon: forestIcon,
    title: 'Log Procurement and Trade',
    description: 'Sourcing quality logs from the Ashanti Region for your timber needs.'
  },
  {
    index: 2,
    icon: rulerIcon,
    title: 'Processing',
    description: 'Precision processing into boards and planks, sized for your project.'
  },
  {
    index: 3,
    icon: warehouseIcon,
    title: 'Distribution',
    description: 'Supplying individual builders and large-scale timber distributors.'
  },
  {
    index: 4,
    icon: truckIcon,
    title: 'Delivery',
    description: 'Moving your timber to Kasoa Timber Market and beyond.'
  }
]

const processingStepsContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.35,
      delayChildren: 0.3,
    },
  },
};

const processingStepVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

const timberGalleryImages = [
  { src: forestImage, alt: 'Forest in Ghana' },
  { src: treeCanopy, alt: 'Tree canopy' },
  { src: treeTops, alt: 'Tree tops in the forest' },
  { src: treeTopsAngled, alt: 'Angled view of tree tops' },
  { src: treeTopsWithDirtPath, alt: 'Forest with a dirt path' },
  { src: treeTrunkForest, alt: 'Tree trunks in the forest' },
  { src: treeTrunkClearing, alt: 'Tree trunks in a clearing' },
  { src: treeCrossSection, alt: 'Cross-section of a tree trunk' },
  { src: logsImage, alt: 'Timber logs' },
  { src: logInspectionImage, alt: 'Timber log inspection' },
  { src: chainsawMan, alt: 'Worker cutting timber with a chainsaw' },
  { src: chainsawOnLog, alt: 'Chainsaw resting on a log' },
  { src: sawedWood, alt: 'Freshly sawn timber' },
  { src: sawedWoodStack, alt: 'Stack of freshly sawn timber' },
  { src: planksImage, alt: 'Timber planks ready for use' },
  { src: woodFloorGrains, alt: 'Wood grain texture' },
  { src: godRaysInWoods, alt: 'Sunlight shining through the woods' },
  { src: ruggedLoggingTruck, alt: 'Logging truck in the forest' },
];

const fullWidth = {width: "100%"}

const Home = () => {
  return(
    <div className="w-auto p-auto bg-green-950">
      <section id="home" className="scroll-mt-24 relative isolate flex flex-col text-white overflow-hidden bg-green-950 p-6 pt-26 sm:pt-40 sm:px-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage: `url(${treeTops})`,
            maskImage: 'linear-gradient(to right, transparent 0%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 100%)',
          }}
        />
        <div className="relative text-xs text-[#D6DFD4] py-3.5 sm:text-sm">
          <TextMotion
              text="GHANAIAN LOCAL TIMBER EXPERTISE"
              preset="fade"
              trigger="onView"
              duration={1.4}
              stagger={0.1}
              replay={false}
              style={{width: "100%"}}
            />
        </div>
        <div className="relative max-w-5xl whitespace-normal text-3xl font-bold py-3.5 sm:text-5xl"
          role="heading"
          aria-level={1}
          aria-label="Quality Ghanaian Timber, From the Forest to Your Site."
          >
            <div aria-hidden="true">
              <TextMotion
                text="Quality Ghanaian Timber, From the Forest to Your Site."
                preset="wipe"
                trigger="onView"
                delay={0.2}
                duration={1.9}
                stagger={1}
                replay={false}
                style={fullWidth}
                intensity={0.2}
              />
            </div>
        </div>
        <div className="relative max-w-2xl whitespace-normal sm:text-lg text-{#D6DFD4] py-3.5 text-sm">
          <TextMotion
            text="Procuring, processing, and delivering premium logs, boards, and planks from the Ashanti Region to Kasoa Timber Market and beyond."
            preset="rise"
            trigger="onMount"
            delay={0.6}
            stagger={0.015}
            replay={false}
            style={fullWidth}
            />
        </div>
        <div className="relative text-sm font-semibold py-3.5 flex flex-col sm:flex-row gap-3">
          <Button className="bg-[#2E7D32] p-8 py-6 mr-1.5 hover:bg-[#3a8a3e] hover:cursor-pointer">View Our Wood Species</Button>
          <Button className="border-0 bg-transparent p-8 sm:ml-1.5 py-6 ring-1 ring-inset ring-white hover:cursor-pointer hover:bg-white/20">Contact Us On Whatsapp</Button>
        </div>
      </section>
      <section className="flex bg-[#FFFFFF] justify-items-center py-5 px-4 flex-col sm:flex-row gap-6 sm:gap-0 justify-center">
        {assurances.map((assurance, index) => (
          <div
            key={index}
            className="flex flex-1 border-0 items-center min-h-10 h-auto"
          >
            <img src={assurance.icon} alt={assurance.alt} className="h-7 mr-0.5 w-7 object-contain" />
            <div className="flex flex-col ml-2">
              <h4 className="text-black font-semibold text-sm m-0.5">{assurance.title}</h4>
              <p className="text-[#626960] font-semibold text-xs m-0.5">{assurance.description}</p>
            </div>
          </div>
          ))
        }
      </section>
      <section className="flex bg-[#E8DFD0] flex-col justify-items-center sm:p-20 py-12 px-6">
        <div className="">
          <span className="text-[#8B5E3C] text-xs font-semibold">
            <TextMotion
              text="ROOTED IN GHANA"
              preset="drop"
              trigger="onView"
              duration={1.4}
              stagger={0.1}
              replay={false}
              splitBy="word"
              style={{width: "100%"}}
            />
          </span>
        </div>
        <h2 className=" my-5">
          <span className="text-3xl font-bold">
            <TextMotion
              text="Your Trusted Partner in Timber Trade"
              preset="drop"
              trigger="onView"
              duration={1.4}
              stagger={0.1}
              delay={0.5}
              replay={false}
              splitBy="word"
              style={{width: "100%"}}
            />
          </span>
        </h2>
        <span className="text-base text-[#626960] ">
          <TextMotion
            text="Woodvillage Ghana Ltd. is a leading supplier of high-quality wood products. We manage the entire process, from sustainable procurement in the Ashanti Region forests to precision processing into boards and planks. Whether you are an individual builder or a large-scale distributor, we deliver the right wood at the right size."
            preset="drop"
            trigger="onView"
            duration={1.4}
            stagger={0.1}
            delay={1.1}
            splitBy="line"
            replay={false}
            style={{width: "100%"}}
          />
        </span>
        <TiltedGridHero
         images={timberGalleryImages}
         className="h-72 w-full rounded-lg border border-border bg-transparent">
        </TiltedGridHero>
      </section>
      <section className="flex flex-col bg-[#F7F5F0] justify-items-center sm:p-20 py-12 px-6  ">
        <div>
          <span className="text-[#8B5E3C] text-xs font-semibold">
            <TextMotion
              text="WHAT WE DO"
              preset="slide"
              trigger="onView"
              duration={1.4}
              stagger={0.1}
              replay={false}
              style={{width: "100%"}}
            />
          </span>
        </div>
        <div>
          <span className="sm:text-3xl font-bold text-2xl">
            <TextMotion
              text="Timber support, at every step."
              preset="slide"
              trigger="onView"
              duration={1.4}
              stagger={0.1}
              delay={0.5}
              replay={false}
              style={{width: "100%"}}
            />
            </span>
        </div>
        <motion.div
          variants={processingStepsContainer}
          initial="hidden"
          whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="flex flex-col sm:flex-row gap-4 justify-between mt-10 flex-wrap"
        >
          {
            processingSteps.map((step, index) => (
              <motion.div key={index} variants={processingStepVariant} className="flex flex-col bg-white rounded-xl p-5 basis-44 grow">
                <div className="h-10 w-10">
                  <img src={step.icon} alt="Item Icon" aria-hidden="true" className="h-3/4 w-3/4 object-contain" />
                </div>
                <div className="text-black font-bold text-xl p-1.5 pl-0.5">{step.title}</div>
                <div className="text-[#626960] text-sm p-0.5">{step.description}</div>
              </motion.div>
            ))
          }
        </motion.div>
      </section>
      <section className="px-6 py-12 sm:p-14 bg-[#2E7D32]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <div className="font-bold text-3xl text-white mb-2">
              <span>
                <TextMotion
                  text="Need a custom size? Talk to us today."
                  preset="pop"
                  trigger="onView"
                  duration={0.5}
                  stagger={0.1}
                  splitBy="word"
                  replay={false}
                  style={{width: "100%"}}
                />
              </span>
            </div>
            <div>
              <span className="text-white">
                <TextMotion
                  text="Tell us the dimensions and quantity you need."
                  preset="pop"
                  trigger="onView"
                  duration={0.5}
                  stagger={0.1}
                  splitBy="word"
                  replay={false}
                  style={{width: "100%"}}
                />
              </span>
            </div>
          </div>
          <div>
            <Button className="border-0 bg-transparent p-8 ml-1.5 py-6 ring-1 ring-inset ring-white hover:cursor-pointer hover:bg-white/20 ">Contact Us On Whatsapp</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home;