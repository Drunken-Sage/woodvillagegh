import { useRef, useState, type FormEvent } from "react";
import TextMotion from "./ui/TextMotion";
import { Button } from "@/components/ui/button";
import { FaEnvelopeOpen, FaEnvelopesBulk, FaPhone, FaLocationDot } from 'react-icons/fa6'
import { buildWhatsAppUrl, contactInfo } from "@/lib/contactInfo";

const Contact = () => {
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);
  const [submitError, setSubmitError] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");

  const handleQuoteSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const customerMessage = String(formData.get("message") ?? "").trim();
    const phoneDigits = phone.replace(/\D/g, "");

    if (!name) {
      nameInputRef.current?.setCustomValidity("Please enter your name.");
      nameInputRef.current?.reportValidity();
      return;
    }

    if (!/^\+?[0-9\s()-]+$/.test(phone) || phoneDigits.length < 9 || phoneDigits.length > 15) {
      phoneInputRef.current?.setCustomValidity("Enter a phone number with 7-15 digits.");
      phoneInputRef.current?.reportValidity();
      return;
    }

    if (!customerMessage) {
      messageInputRef.current?.setCustomValidity("Please enter a message.");
      messageInputRef.current?.reportValidity();
      return;
    }

    const quoteMessage = [
      "Hello, I would like to request a quote.",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      "Message:",
      customerMessage,
    ].join("\n");
    const whatsappWindow = window.open(buildWhatsAppUrl(quoteMessage), "_blank");

    if (!whatsappWindow) {
      setSubmitError("Your browser blocked the WhatsApp window. Allow pop-ups and try again.");
      setSubmitStatus("");
      return;
    }

    whatsappWindow.opener = null;
    setSubmitError("");
    setSubmitStatus("WhatsApp opened with your quote request. Review it and press Send there.");
  };

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
          as="h2"
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
      <section className="flex flex-col lg:flex-row sm:justify-center">
        <div className="sm:py-16 sm:px-20 py-12 px-6">
          <h2 className="text-black mb-4 text-2xl sm:text-3xl font-bold tracking-tight">Get in Touch</h2>
          <div className=" flex gap-4 flex-col max-w-4xl" aria-label="Contact information list">
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
          </div>
        </div>
        <div className="sm:px-20 sm:py-16 px-6 py-12">
          <h2 className="text-black mb-4 text-2xl sm:text-3xl font-bold tracking-tight">Send us a message</h2>
          <p className="text-[#626960]">Tell us about the wood, quantities and delivery arrangements you need.</p>
          <div className="mt-6 max-w-4xl rounded-lg border border-[#DEDFD7] bg-[#F7F5F0] p-6 sm:p-8">
            <form className="grid gap-5 sm:grid-cols-2" onSubmit={handleQuoteSubmit} aria-label="Request a quote">
              <div className="flex flex-col gap-2">
                <label htmlFor="quote-name" className="text-[14px] font-semibold text-[#1F2421]">Name</label>
                <input
                  ref={nameInputRef}
                  id="quote-name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  autoComplete="name"
                  required
                  onChange={() => nameInputRef.current?.setCustomValidity("")}
                  className="w-full rounded-sm border border-[#DEDFD7] bg-white px-4 py-3 text-[#1F2421] outline-none focus-visible:border-[#2E7D32] focus-visible:ring-2 focus-visible:ring-[#2E7D32]/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="quote-phone" className="text-[14px] font-semibold text-[#1F2421]">Phone number</label>
                <input
                  ref={phoneInputRef}
                  id="quote-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  pattern={"\\+?[0-9\\s()-]+"}
                  title="Use 7-15 digits. A leading +, spaces, hyphens, and parentheses are allowed."
                  required
                  placeholder="0*********"
                  onChange={() => phoneInputRef.current?.setCustomValidity("")}
                  className="w-full rounded-sm border border-[#DEDFD7] bg-white px-4 py-3 text-[#1F2421] outline-none focus-visible:border-[#2E7D32] focus-visible:ring-2 focus-visible:ring-[#2E7D32]/20"
                />
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2">
                <label htmlFor="quote-email" className="text-[14px] font-semibold text-[#1F2421]">Email</label>
                <input
                  id="quote-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="johndoe@email.com"
                  className="w-full rounded-sm border border-[#DEDFD7] bg-white px-4 py-3 text-[#1F2421] outline-none focus-visible:border-[#2E7D32] focus-visible:ring-2 focus-visible:ring-[#2E7D32]/20"
                />
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2">
                <label htmlFor="quote-message" className="text-[14px] font-semibold text-[#1F2421]">Message</label>
                <textarea
                  ref={messageInputRef}
                  id="quote-message"
                  name="message"
                  rows={5}
                  placeholder="How can we help?"
                  required
                  onChange={() => messageInputRef.current?.setCustomValidity("")}
                  className="w-full resize-y rounded-sm border border-[#DEDFD7] bg-white px-4 py-3 text-[#1F2421] outline-none focus-visible:border-[#2E7D32] focus-visible:ring-2 focus-visible:ring-[#2E7D32]/20"
                />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" className="h-12 w-full bg-[#2E7D32] px-6 text-[14px] text-white hover:bg-[#3a8a3e] sm:w-auto">
                  Send Quote Request
                </Button>
                <p className="mt-3 text-sm text-[#626960]">
                  Your details will be added to a WhatsApp draft. Review it and press Send in WhatsApp.
                </p>
                {submitError && <p className="mt-2 text-sm text-red-700" role="alert">{submitError}</p>}
                {submitStatus && <p className="mt-2 text-sm text-[#1D3929]" role="status">{submitStatus}</p>}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact;