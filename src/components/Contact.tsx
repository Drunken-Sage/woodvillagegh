import TextMotion from "./ui/TextMotion";
import { Button } from "@/components/ui/button";
import { FaEnvelopeOpen, FaEnvelopesBulk, FaPhone, FaLocationDot, FaComment } from 'react-icons/fa6'
import { contactInfo } from "@/lib/contactInfo";

const Contact = () => {

  const contactPoints = [
    { index: 1, icon: FaLocationDot, title: "Shopfront Address", details: "Kasoa Timber Market, Bawjiase Road, Kasoa, Ghana" },
    { index: 2, icon: FaEnvelopesBulk, title: "Postal Address", details: "P. O. Box DK Darkuman-Accra" },
    {
      index: 3,
      icon: FaPhone,
      title: "Phone",
      details: (
        <>
          {contactInfo.phones.map((phone, index) => (
            <span key={phone}>
              {index > 0 && <br />}
              {phone}
            </span>
          ))}
        </>
      ),
    },
    { index: 4, icon: FaEnvelopeOpen, title: "Email:", details: contactInfo.email }
  ]

  return (
    <div id="contact" className="scroll-mt-24">
      <section className="bg-[#1D3929] sm:py-14 sm:px-20 py-10 px-6 flex flex-col gap-5 " aria-label="Contact banner section">
        <TextMotion
          as="h1"
          className="text-white font-bold sm:text-5xl mt-3 text-3xl"
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
        <div className="sm:py-16 sm:px-20 py-12 px-6">
          <TextMotion
            as="h2"
            className="text-black mb-4 text-2xl sm:text-3xl font-bold"
            text="Get in touch"
            preset="slide"
            trigger="onView"
            duration={1.4}
            stagger={0.1}
            splitBy="line"
            replay={false}
            style={{width: "100%"}}
          />
          <div className="mx-auto flex gap-4 flex-col max-w-4xl justify-center items-center self-center" aria-label="Contact information list">
            {
              contactPoints.map((contact) => (
                <div key={contact.index} className="border border-[#DEDFD7] flex flex-row items-center p-6 rounded-sm w-full" aria-label={`${contact.title}: ${typeof contact.details === 'string' ? contact.details : 'Contact information'}`}>
                  <div className="mr-4 flex h-12 w-12 items-center self-start justify-center rounded-lg bg-[#2E7D32]/10 text-[#2E7D32]">
                    {(() => {
                      const Icon = contact.icon;
                      return <Icon size={18} />;
                    })()}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">{contact.title}</span>
                    <span className="text-[#626960]">{contact.details}</span>
                  </div>
                </div>
              ))
            }
            <div className="flex items-center justify-between gap-4 border border-[#DEDFD7] p-6 rounded-sm w-full" aria-label="WhatsApp contact information">
              <div className="flex flex-col gap-5 w-full">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#2E7D32]/10 text-[#2E7D32]">
                    <FaComment size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">Whatsapp</span>
                    <span className="text-[#2E7D32] font-semibold text-[18px]">{contactInfo.whatsappDisplay}</span>
                  </div>
                </div>
                <div className="w-full">
                  <Button
                    render={<a href={`https://wa.me/${contactInfo.whatsappPhone}`} target="_blank" rel="noreferrer" aria-label="Chat with WoodVillage on WhatsApp" />}
                    className="w-full h-12 text-[14px] bg-[#2E7D32] hover:bg-[#3a8a3e]"
                  >
                    Click to Chat
                  </Button>
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