"use client";

import { useRef, useState, type FormEvent } from "react";
import { m as motion, useInView, useReducedMotion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { CONTACT_INFO } from "@/lib/constants";
import { fadeInUp, slideInLeft, slideInRight, reducedMotionFade } from "@/lib/animations";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import MagneticButton from "./MagneticButton";

type FormStatus = "idle" | "sending" | "success" | "error";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

const ContactUs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15%" });
  const prefersReduced = useReducedMotion();
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formStatus === "sending") return;
    setFormStatus("sending");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current!,
        EMAILJS_PUBLIC_KEY,
      );
      setFormStatus("success");
      formRef.current?.reset();
      setTimeout(() => setFormStatus("idle"), 3000);
    } catch {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
    }
  };

  const contactCards = [
    {
      icon: <MapPin size={20} />,
      label: "Address",
      value: CONTACT_INFO.address,
      hoverClass: "group-hover:animate-bounce",
    },
    {
      icon: <Phone size={20} />,
      label: "Phone",
      value: CONTACT_INFO.phone,
      href: `tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`,
      hoverClass: "group-hover:rotate-12",
    },
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: CONTACT_INFO.email,
      href: `mailto:${CONTACT_INFO.email}`,
      hoverClass: "",
    },
    {
      icon: <MessageCircle size={20} />,
      label: "WhatsApp",
      value: "Chat with us",
      href: CONTACT_INFO.whatsapp,
      hoverClass: "group-hover:scale-110",
      green: true,
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] overflow-hidden"
    >
      {/* Wave background */}
      <div className="absolute top-0 left-0 right-0 h-40 overflow-hidden">
        <svg viewBox="0 0 1920 320" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,160 C320,220 640,100 960,160 C1280,220 1600,100 1920,160 L1920,320 L0,320 Z"
            fill="var(--color-primary)"
            fillOpacity="0.05"
            style={{ animation: "wave1 6s ease-in-out infinite" }}
          />
          <path
            d="M0,200 C320,140 640,260 960,200 C1280,140 1600,260 1920,200 L1920,320 L0,320 Z"
            fill="var(--color-accent)"
            fillOpacity="0.04"
            style={{ animation: "wave2 8s ease-in-out infinite" }}
          />
          <path
            d="M0,240 C320,200 640,280 960,240 C1280,200 1600,280 1920,240 L1920,320 L0,320 Z"
            fill="var(--color-accent-light)"
            fillOpacity="0.03"
            style={{ animation: "wave3 10s ease-in-out infinite" }}
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-[family-name:var(--font-clash,_'Clash_Display')] font-bold text-center mb-16"
          data-cursor="text"
          variants={prefersReduced ? reducedMotionFade : fadeInUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <span className="text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]">Let&apos;s Build</span>{" "}
          <span className="text-gradient">Together</span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Contact cards + Map */}
          <div className="space-y-6">
            {contactCards.map((card, i) => (
              <motion.div
                key={card.label}
                variants={prefersReduced ? reducedMotionFade : slideInLeft}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={i}
              >
                {card.href ? (
                  <a
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 p-4 min-h-[44px] rounded-2xl border border-[var(--color-primary)]/10 dark:border-white/10 hover:border-[var(--color-accent)]/30 transition-colors"
                    data-cursor="pointer"
                  >
                    <span className={`text-[var(--color-primary)] dark:text-[var(--color-accent)] transition-transform ${card.hoverClass} ${card.green ? "text-green-500 dark:text-green-400" : ""}`}>
                      {card.icon}
                    </span>
                    <div>
                      <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider">{card.label}</p>
                      <p className="font-medium text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]">{card.value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="group flex items-center gap-4 p-4 rounded-2xl border border-[var(--color-primary)]/10 dark:border-white/10">
                    <span className={`text-[var(--color-primary)] dark:text-[var(--color-accent)] transition-transform ${card.hoverClass}`}>
                      {card.icon}
                    </span>
                    <div>
                      <p className="text-xs text-[var(--color-muted)] uppercase tracking-wider">{card.label}</p>
                      <p className="font-medium text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]">{card.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Google Maps */}
            <motion.div
              className="rounded-2xl overflow-hidden border-2 border-cyan-500/20"
              style={{ boxShadow: "0 0 30px rgba(0,180,216,0.1)" }}
              variants={prefersReduced ? reducedMotionFade : fadeInUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={5}
            >
              <iframe
                title="BANCO Office Location"
                src="https://maps.google.com/maps?q=Nyerere+Road+Dar+Es+Salaam+Tanzania&output=embed"
                className="w-full h-[250px] md:h-[300px] grayscale dark:grayscale-0 dark:hue-rotate-180"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>

          {/* Right: Contact Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-8"
            variants={prefersReduced ? reducedMotionFade : slideInRight}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {[
              { name: "name", label: "Full Name", type: "text" },
              { name: "email", label: "Email Address", type: "email" },
              { name: "phone", label: "Phone Number", type: "tel" },
            ].map((field) => (
              <div key={field.name} className="relative">
                <input
                  type={field.type}
                  name={field.name}
                  required
                  placeholder=" "
                  className="floating-input text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]"
                  aria-label={field.label}
                />
                <label className="floating-label">{field.label}</label>
              </div>
            ))}

            <div className="relative">
              <textarea
                name="message"
                required
                placeholder=" "
                rows={4}
                className="floating-input text-[var(--color-text-light)] dark:text-[var(--color-text-dark)] resize-none"
                aria-label="Message"
              />
              <label className="floating-label">Message</label>
            </div>

            {/* Submit button */}
            <MagneticButton
              type="submit"
              disabled={formStatus === "sending"}
              className={`w-full py-4 rounded-full font-semibold text-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                formStatus === "success"
                  ? "bg-green-500"
                  : formStatus === "error"
                  ? "bg-red-500 animate-[shake_0.5s_ease-in-out]"
                  : "bg-[var(--color-primary)] hover:shadow-lg hover:shadow-[var(--color-primary)]/30"
              }`}
              ariaLabel="Send message"
            >
              {formStatus === "idle" && "Send Message →"}
              {formStatus === "sending" && (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                  Sending...
                </span>
              )}
              {formStatus === "success" && "Message Sent! ✅"}
              {formStatus === "error" && "Error — Try Again"}
            </MagneticButton>

            <div aria-live="polite" className="sr-only">
              {formStatus === "success" && "Your message has been sent successfully."}
              {formStatus === "error" && "There was an error sending your message."}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
