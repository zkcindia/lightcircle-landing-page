"use client";

import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-gray-700 border-t border-gray-200 px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Tagline */}
        <div>
          <h2 className="text-2xl font-bold tracking-widest mb-2">VOYLITE</h2>
          <p className="text-sm mb-4">Lights for people who love great design</p>
          <div className="flex items-center gap-2 mb-4">
            <Image
              src="/images/verified.png"
              alt="Verified & Secured"
              width={120}
              height={30}
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-2">CONNECT</h3>
            <div className="flex gap-4">
              <FaFacebookF className="text-blue-600" />
              <FaTwitter className="text-blue-400" />
              <FaInstagram className="text-pink-500" />
            </div>
          </div>
        </div>

        {/* About Links */}
        <div>
          <h3 className="text-sm font-semibold mb-4">MORE ABOUT VOYLITE</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="text-sm font-semibold mb-4">SUBSCRIBE TO OFFERS AND UPDATES</h3>
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full border-b border-gray-400 mb-4 px-2 py-1 focus:outline-none"
          />
          <div className="flex items-center gap-2 mb-4">
            <Image
              src="/images/captcha.png"
              alt="Captcha"
              width={100}
              height={30}
            />
            <input
              type="text"
              placeholder="Enter Captcha"
              className="flex-1 border-b border-gray-400 px-2 py-1 focus:outline-none"
            />
          </div>
          <button className="border border-gray-700 text-sm px-4 py-1">
            SUBSCRIBE
          </button>
        </div>

        {/* Payment Partners */}
        <div>
          <h3 className="text-sm font-semibold mb-4">PAYMENT PARTNERS</h3>
          <div className="flex flex-wrap gap-4">
            <Image src="/images/visa.png" alt="Visa" width={40} height={24} />
            <Image src="/images/mastercard.png" alt="Mastercard" width={40} height={24} />
            <Image src="/images/paytm.png" alt="Paytm" width={40} height={24} />
            <Image src="/images/gpay.png" alt="Google Pay" width={40} height={24} />
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-6xl mx-auto mt-8 text-xs text-gray-500">
        <p className="mb-4">
          Disclaimer: The information contained in this website is for general
          information purposes only. The information is provided by
          www.voylite.com, a property of Voylite Designs Private Limited. While
          we endeavor to keep the information up to date and correct, we make no
          representations or warranties of any kind, express or implied, about
          the completeness, accuracy, reliability, suitability or availability
          with respect to the website or the information, products, services, or
          related graphics contained on the website for any purpose. Any
          reliance you place on such information is therefore strictly at your
          own risk. In no event will we be liable for any loss or damage
          including without limitation, indirect or consequential loss or damage,
          or any loss or damage whatsoever arising from loss of data or profits
          arising out of, or in connection with, the use of this website.
        </p>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-300 pt-4">
          <div className="flex gap-4 text-xs">
            <a href="#" className="hover:underline">Returns</a>
            <a href="#" className="hover:underline">Terms of Use</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Intellectual Property</a>
          </div>
          <div className="text-xs">&copy; All rights reserved by Voylite 2019</div>
        </div>
      </div>
    </footer>
  );
}
