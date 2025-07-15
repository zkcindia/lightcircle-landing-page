"use client";

import React from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-white px-4 py-20 text-black">
      <h2 className="text-xl md:text-2xl mb-8 text-center font-light">
        REACH US <span className="font-bold">ANYTIME ON</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 max-w-4xl w-full">
        {/* WhatsApp */}
        <div className="flex flex-col items-center text-center">
          <MessageCircle size={48} className="mb-4 text-black" />
          <h3 className="font-bold mb-2">WHATSAPP</h3>
          <a
            href="https://wa.me/918595526587"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-sm text-black"
          >
            +91 85955ANKUR (26587)
          </a>
        </div>

        {/* Call */}
        <div className="flex flex-col items-center text-center">
          <Phone size={48} className="mb-4 text-black" />
          <h3 className="font-bold mb-2">CALL</h3>
          <p className="text-sm">+91 1147220000</p>
          <p className="text-xs mt-1">(Mon. to Sat., 10am - 7pm)</p>
        </div>

        {/* Mail */}
        <div className="flex flex-col items-center text-center">
          <Mail size={48} className="mb-4 text-black" />
          <h3 className="font-bold mb-2">MAIL</h3>
          <a
            href="mailto:onlinesales@ankurlighting.com"
            className="underline text-sm text-black"
          >
            onlinesales@ankurlighting.com
          </a>
        </div>
      </div>

      <div className="text-center mb-8">
        <p className="text-xs mb-2">ANY QUESTION IN MIND?</p>
        <h2 className="text-xl md:text-2xl font-light">
          SEND YOUR <span className="font-bold">QUERIES HERE</span>
        </h2>
      </div>

      <form className="w-full max-w-2xl space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border border-black px-4 py-3 rounded text-black"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border border-black px-4 py-3 rounded text-black"
          required
        />
        <textarea
          placeholder="Your Message"
          rows={5}
          className="w-full border border-black px-4 py-3 rounded text-black"
          required
        ></textarea>
        <button
          type="submit"
          className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
