// src/components/AboutUs.jsx
import React from "react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <div className="bg-gradient-to-r from-lime-600 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block mb-6">
           
          </div>

          <h1 className="text-5xl font-bold mb-4">About DesiKrishi</h1>
          <p className="text-xl text-lime-50">Better Farming, Better Future</p>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 py-20 space-y-16">

        {/* ABOUT COMPANY */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              About the Company
            </h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                <span className="font-semibold text-gray-900">
                  DesiKrishi Agro Industries Pvt. Ltd.
                </span>{" "}
                is a forward-thinking agribusiness dedicated to promoting organic and
                sustainable farming for a healthier and greener future.
              </p>

              <p>
                We specialize in eco-friendly agricultural inputs, innovative protected
                farming solutions, and integrated pest management products that empower
                farmers, agri-entrepreneurs, and home growers alike.
              </p>

              <p>
                At DesiKrishi, we believe that healthy living begins with homegrown
                food. Through our home garden kits, organic fertilizers, and easy-to-use
                growing solutions, we encourage individuals and families to grow their
                own fresh, chemical-free vegetables.
              </p>

              <p className="font-semibold text-lime-700 text-xl">
                Our mission — “Better Farming, Better Future” — drives us to make
                agriculture sustainable, profitable, and accessible for everyone.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80"
              alt="Organic Farming"
              className="w-full h-96 object-cover"
            />
          </div>
        </section>

        {/* WHAT WE OFFER */}
        <section className="bg-white rounded-2xl shadow-xl p-12">
          <div className="text-center mb-12">
          

            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-gray-600 text-lg">
              Sustainable solutions for modern agriculture
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Hardcoded item 1 */}
            <div className="flex items-center space-x-3 p-4 bg-lime-50 rounded-lg">
              
              <span className="text-gray-800 font-medium">
                Organic Fertilizers
              </span>
            </div>

            {/* Hardcoded item 2 */}
            <div className="flex items-center space-x-3 p-4 bg-lime-50 rounded-lg">
             
              <span className="text-gray-800 font-medium">
                Home Garden Kits
              </span>
            </div>

            {/* Hardcoded item 3 */}
            <div className="flex items-center space-x-3 p-4 bg-lime-50 rounded-lg">
              
              <span className="text-gray-800 font-medium">
                Protected Farming Solutions
              </span>
            </div>

            {/* Hardcoded item 4 */}
            <div className="flex items-center space-x-3 p-4 bg-lime-50 rounded-lg">
              
              <span className="text-gray-800 font-medium">
                Pest Management Products
              </span>
            </div>

            {/* Hardcoded item 5 */}
            <div className="flex items-center space-x-3 p-4 bg-lime-50 rounded-lg">
             
              <span className="text-gray-800 font-medium">
                Growing Solutions
              </span>
            </div>

            {/* Hardcoded item 6 */}
            <div className="flex items-center space-x-3 p-4 bg-lime-50 rounded-lg">
          
              <span className="text-gray-800 font-medium">
                Eco-Friendly Inputs
              </span>
            </div>

          </div>
        </section>

        {/* LEADERSHIP TEAM */}
        <section>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-lime-100 rounded-full mb-4">
            
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Leadership Team
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

            {/* Leader 1 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
                alt="CEO"
                className="w-full h-80 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Mr. Aniruddha Biswas
                </h3>
                <p className="text-lime-600 font-semibold mb-3">
                  Chief Executive Officer (CEO)
                </p>
                <p className="text-gray-600 text-sm">
                  Visionary agriculturist and entrepreneur driving innovation and sustainability.
                </p>
              </div>
            </div>

            {/* Leader 2 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80"
                alt="CMO"
                className="w-full h-80 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Mr. Tapank Das
                </h3>
                <p className="text-lime-600 font-semibold mb-3">
                  Chief Marketing Officer (CMO)
                </p>
                <p className="text-gray-600 text-sm">
                  Focused on brand development and strategic marketing.
                </p>
              </div>
            </div>

            {/* Leader 3 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
                alt="CFO"
                className="w-full h-80 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Mr. Animesh Biswas
                </h3>
                <p className="text-lime-600 font-semibold mb-3">
                  Chief Financial Officer (CFO)
                </p>
                <p className="text-gray-600 text-sm">
                  Oversees financial growth and investment strategies.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* CONTACT */}
        <section className="bg-gradient-to-br from-lime-600 to-green-600 text-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            <div className="p-12 space-y-8">

              <h2 className="text-4xl font-bold">Get In Touch</h2>

              {/* Address */}
              <div className="flex space-x-4">
             
                <div>
                  <h3 className="font-semibold text-lg">Office Address</h3>
                  <p className="text-lime-50">
                    DesiKrishi Agro Industries Pvt. Ltd.<br />
                    Onda Cinema Road, Onda, Bankura,<br />
                    West Bengal – 722144
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex space-x-4">
               
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <a href="tel:+919239261803" className="text-white text-lg">
                    +91 9239261803
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex space-x-4">
                
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <a
                    href="mailto:desikrishiagro.pvt@gmail.com"
                    className="text-white block"
                  >
                    desikrishiagro.pvt@gmail.com
                  </a>
                </div>
              </div>

            </div>

            <div className="hidden lg:block relative">
              <img
                src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80"
                alt="Contact"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-lime-700/40" />
            </div>

          </div>
        </section>

      </div>

      {/* CTA */}
      <div className="bg-gray-900 text-white py-16 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Join Us in Building a Sustainable Future
        </h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          Whether you're a farmer, entrepreneur, or home gardener, DesiKrishi has the right solutions for you.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-lime-600 hover:bg-lime-700 text-white px-8 py-4 rounded-lg shadow-lg">
            Explore Our Products
          </button>
          <button className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-lg shadow-lg">
            Contact Us Today
          </button>
        </div>
      </div>
    </div>
  );
}
