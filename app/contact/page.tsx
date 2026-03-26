"use client";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";

import AnimatedHeading from "./_components/AnimatedHeading";
import ContactSidebar from "./_components/ContactSidebar";
import FormField from "./_components/FormField";
import SendButton from "./_components/SendButton";
import ContactFooter from "./_components/ContactFooter";

const fields = [
  {
    number: "01",
    name: "name",
    label: "What's your name?",
    placeholder: "John Doe *",
    type: "text",
  },
  {
    number: "02",
    name: "email",
    label: "What's your email?",
    placeholder: "john@doe.com *",
    type: "email",
  },
  {
    number: "03",
    name: "org",
    label: "What's the name of your organization?",
    placeholder: "John & Doe ®",
    type: "text",
  },
  {
    number: "04",
    name: "services",
    label: "What services are you looking for?",
    placeholder: "Web Design, Web Development …",
    type: "text",
  },
  {
    number: "05",
    name: "message",
    label: "Your message",
    placeholder: "Hello Ashish, can you help me with … *",
    multiline: true,
  },
] as const;

type FieldName = (typeof fields)[number]["name"];

export default function ContactPage() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, {
    once: false,
    margin: "0px 0px -20% 0px",
  });

  const [form, setForm] = useState<Record<FieldName, string>>({
    name: "",
    email: "",
    org: "",
    services: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (name: FieldName) => (val: string) =>
    setForm((prev) => ({ ...prev, [name]: val }));

  const handleSubmit = async () => {
    if (submitting || sent) return;

    setSubmitting(true);

    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbwARWerk5pmh2qrdR6mMjLjmCdeyuHEJSotMK8d08QTAbcA4sXp5kZoXjSKFe3W4wzziQ/exec", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          org: form.org,
          services: form.services,
          message: form.message,
        }),
      });

      const data = await res.json();
      console.log(data);

      setSent(true);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

    setSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-[var(--dark)] text-white">
      <div className="px-5 sm:px-10 md:px-16 lg:px-24 xl:px-40">
        {/* ── Two-column layout: form left, sidebar right ── */}
        <div className="pt-[clamp(100px,16vh,200px)] grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-x-20 items-start">
          {/* ── LEFT: heading + form ── */}
          <div>
            <div ref={headingRef} className="pb-[clamp(48px,8vh,80px)]">
              <AnimatedHeading
                text={"Let's start a\nproject together"}
                isInView={isInView}
              />
            </div>

            {fields.map((field, i) => (
              <FormField
                key={field.name}
                number={field.number}
                label={field.label}
                placeholder={field.placeholder}
                name={field.name}
                type={"type" in field ? field.type : "text"}
                multiline={"multiline" in field ? field.multiline : false}
                index={i}
                value={form[field.name]}
                onChange={handleChange(field.name)}
              />
            ))}

            {sent ? (
              <div className="py-16 text-center">
                <div className="w-full h-px bg-white/10 mb-16" />
                <p
                  className="text-white/50 font-light"
                  style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}
                >
                  Message sent — I&apos;ll be in touch soon. ✦
                </p>
              </div>
            ) : (
              <SendButton onSubmit={handleSubmit} submitting={submitting} />
            )}
          </div>

          {/* ── RIGHT: sidebar sticky (desktop only) ── */}
          <div
            className="hidden lg:block sticky"
            style={{ top: "clamp(100px, 16vh, 200px)" }}
          >
            <ContactSidebar isInView={isInView} />
          </div>
        </div>

        {/* ── Mobile sidebar — below form ── */}
        <div className="block lg:hidden mt-16 pb-4">
          <ContactSidebar isInView={true} />
        </div>

        {/* ── Footer ── */}
        <ContactFooter />
      </div>
    </main>
  );
}
