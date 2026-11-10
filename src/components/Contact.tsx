import TextMotion from "./ui/TextMotion";
import { Button } from "./ui/button";
import { FaEnvelopeOpen, FaEnvelopesBulk, FaPhone, FaLocationDot, FaComment } from 'react-icons/fa6'

const Contact = () => {

  const contactPoints = [
    { index: 1, icon: FaLocationDot, title: "Shopfront Address", details: "Kasoa Timber Market, Bawjiase Road, Kasoa, Ghana" },
    { index: 2, icon: FaEnvelopesBulk, title: "Postal Address", details: "P. O. Box DK Darkuman-Accra" },
    { index: 3, icon: FaPhone, title: "Phone", details: (<>0504537373<br/>0558554524<br/>0555077373</>) },
    { index: 4, icon: FaEnvelopeOpen, title: "Email:", details: "oforiwawuah@gmail.com" }
  ]

  return (
    <div id="contact" className="scroll-mt-24">
      <section className="bg-[#1D3929] py-14 px-20 flex flex-col gap-5">
        <TextMotion
          as="h1"
          className="text-white font-bold text-5xl mt-3"
          text="Visit Us or Place an Order"
          preset="slide"
          trigger="onView"
          duration={1.4}
          stagger={0.1}
          replay={false}
          style={{width: "100%"}}
        />
        <TextMotion
          as="p"
          className="text-[#D6DFD4] text-sm sm:text-lg"
          text="Come to our shopfront to inspect the wood yourself, or reach out to us for bulk orders and delivery arrangements."
          preset="drop"
          trigger="onView"
          duration={1.4}
          stagger={0.1}
          splitBy="line"
          replay={false}
          style={{width: "100%"}}
        />
      </section>
      <section>
        <div className="py-16 px-20">
          <TextMotion
            as="h2"
            className="text-black mb-4 text-3xl sm:text-3xl font-bold"
            text="Get in touch"
            preset="slide"
            trigger="onView"
            duration={1.4}
            stagger={0.1}
            splitBy="line"
            replay={false}
            style={{width: "100%"}}
          />
          <div className="flex gap-4 flex-col max-w-3xl">
            {
              contactPoints.map((contact) => (
                <div key={contact.index} className="border border-[#DEDFD7] flex flex-row items-center p-6 rounded-sm">
                  <div className="mr-4 flex h-12 w-12 items-center self-start justify-center rounded-lg bg-[#2E7D32]/10 text-[#2E7D32]">
                    {(() => {
                      const Icon = contact.icon;
                      return <Icon size={18} />;
                    })()}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold ">{contact.title}</span>
                    <span className="text-[#626960]">{contact.details}</span>
                  </div>
                </div>
              ))
            }
            <div className="flex items-center justify-between gap-4 border border-[#DEDFD7] p-6 rounded-sm">
              <div className="flex flex-col gap-5 w-full">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#2E7D32]/10 text-[#2E7D32]">
                    <FaComment size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">Whatsapp</span>
                    <span className="text-[#2E7D32] font-semibold">0558-554-524</span>
                  </div>
                </div>
                <div className="w-full">
                  <Button className="w-full h-12 text-[14px] bg-[#2E7D32] hover:bg-[#3a8a3e]">Click to Chat</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact;