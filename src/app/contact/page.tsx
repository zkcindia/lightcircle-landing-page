"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { saveContactUs } from "./../../service/apiContact";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await saveContactUs(formData);
      setSuccessMessage("Thank you for contacting us!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-white px-4 py-20 text-black pt-55">
      <h2 className="text-xl md:text-2xl mb-8 text-center font-light">
        <span className="font-bold">REACH US ANYTIME ON</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 max-w-6xl w-full">
        <div className="flex flex-col items-center text-center">
          <SiWhatsapp size={48} className="mb-4 text-black" />
          <h3 className="font-bold mb-4">WHATSAPP</h3>
          <a
            href="https://wa.me/+918093442657"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-sm text-black"
          >
            +91 8093442657
          </a>
        </div>

        <div className="flex flex-col items-center text-center">
          <Phone size={48} className="mb-4 text-black" />
          <h3 className="font-bold mb-2">CALL</h3>
          <p className="text-sm">+91 8093442657</p>
          <p className="text-xs mt-1">(Mon. to Sat., 10am - 7pm)</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <Mail size={48} className="mb-4 text-black" />
          <h3 className="font-bold mb-2">MAIL</h3>
          <a
            href="mailto:info@lightcircle.in"
            className="underline text-sm text-black"
          >
            info@lightcircle.in
          </a>
        </div>

        <div className="flex flex-col items-center text-center">
          <MapPin size={48} className="mb-4 text-black" />
          <h3 className="font-bold mb-2">ADDRESS</h3>
          <p className="text-sm">
            Plot no 88, Lane 6, Bapuji Nagar,
            <br />
            Bhubaneswar, Odisha 751009
          </p>
        </div>
      </div>

      <div className="text-center mb-8">
        <p className="text-xs mb-2">ANY QUESTION IN MIND?</p>
        <h2 className="text-xl md:text-2xl font-light">
          <span className="font-bold">SEND YOUR QUERIES HERE</span>
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl space-y-4"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full border border-black px-4 py-3 rounded text-black"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full border border-black px-4 py-3 rounded text-black"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows={5}
          className="w-full border border-black px-4 py-3 rounded text-black"
          required
        ></textarea>

        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            Submit
          </button>
          {successMessage && (
            <span className="text-green-600 text-sm font-medium">
              {successMessage}
            </span>
          )}
        </div>
      </form>
    </main>
  );
}
