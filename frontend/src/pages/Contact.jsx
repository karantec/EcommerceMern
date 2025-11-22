// src/components/ContactUs.jsx
import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [openFAQ, setOpenFAQ] = useState(null);

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Thank you for your inquiry! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Inline SVG for chevron (no external icons)
  const Chevron = ({ open }) => (
    <svg
      className={`w-5 h-5 text-lime-600 transition-transform`}
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const PhoneSVG = () => (
    <span className="text-2xl">📞</span>
  );

  const MailSVG = () => (
    <span className="text-2xl">✉️</span>
  );

  const MapPinSVG = () => (
    <span className="text-2xl">📍</span>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-lime-600 to-green-600 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg sm:text-xl text-lime-50 max-w-2xl mx-auto">
            We'd love to hear from you. Get in touch with our team.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12 sm:mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phone Card (hardcoded) */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PhoneSVG />
            </div>
            <a href="tel:+919239261803" className="text-xl font-bold text-gray-900 hover:text-lime-600 transition-colors">
              +91 9239261803
            </a>
            <p className="text-sm text-gray-500 mt-2">Mon - Sat: 9:00 AM - 6:00 PM</p>
          </div>

          {/* Email Card (hardcoded) */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MailSVG />
            </div>
            <a href="mailto:desikrishiagro.pvt@gmail.com" className="text-lg font-bold text-gray-900 hover:text-lime-600 transition-colors break-all">
              desikrishiagro.pvt@gmail.com
            </a>
            <p className="text-sm text-gray-500 mt-2">Typically replies within 24 hours</p>
          </div>

          {/* Address Card (hardcoded) */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPinSVG />
            </div>
            <p className="text-gray-900 font-semibold leading-relaxed">
              Onda Cinema Road, Onda,
              <br />
              Bankura, West Bengal - 722144
            </p>
            <p className="text-sm text-gray-500 mt-2">Visit by appointment</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Drop Your Enquiries</h2>

            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all outline-none"
                  placeholder="Your name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all outline-none"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all outline-none"
                  placeholder="Subject of your inquiry"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message (optional)</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all outline-none resize-none"
                  placeholder="Your message..."
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-lime-600 hover:bg-lime-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
                type="button"
              >
                SUBMIT
              </button>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-[400px] lg:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.8916847344186!2d87.1931!3d23.1731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDEwJzIzLjIiTiA4N8KwMTEnMzUuMiJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="DesiKrishi Location Map"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* FAQ Section (hardcoded items) */}
      <div className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions!</h2>
            <div className="flex justify-center">
              <svg className="w-16 h-8" viewBox="0 0 80 40" fill="none">
                <path d="M10 20 L30 35 L50 20 L70 35" stroke="#84cc16" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* FAQ 1 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-lime-500 transition-colors">
              <button onClick={() => toggleFAQ(0)} className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-900 pr-4">What products does DesiKrishi offer?</span>
                <Chevron open={openFAQ === 0} />
              </button>
              {openFAQ === 0 && (
                <div className="p-4 pt-0 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We offer organic fertilizers, home garden kits, protected farming solutions, integrated pest management products, and eco-friendly agricultural inputs for sustainable farming.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 2 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-lime-500 transition-colors">
              <button onClick={() => toggleFAQ(1)} className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-900 pr-4">Do you provide home delivery services?</span>
                <Chevron open={openFAQ === 1} />
              </button>
              {openFAQ === 1 && (
                <div className="p-4 pt-0 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Yes, we provide home delivery services across West Bengal and other select regions. Contact us for delivery details in your area.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 3 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-lime-500 transition-colors">
              <button onClick={() => toggleFAQ(2)} className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-900 pr-4">How can I start organic farming at home?</span>
                <Chevron open={openFAQ === 2} />
              </button>
              {openFAQ === 2 && (
                <div className="p-4 pt-0 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    You can start with our home garden kits which include organic seeds, fertilizers, and growing instructions. Our team also provides guidance for beginners.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 4 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-lime-500 transition-colors">
              <button onClick={() => toggleFAQ(3)} className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-900 pr-4">What is the return policy?</span>
                <Chevron open={openFAQ === 3} />
              </button>
              {openFAQ === 3 && (
                <div className="p-4 pt-0 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We have a customer-friendly return policy. If you're not satisfied with our products, you can return them within 7 days of delivery with proper documentation.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 5 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-lime-500 transition-colors">
              <button onClick={() => toggleFAQ(4)} className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-900 pr-4">Do you offer bulk orders for farmers?</span>
                <Chevron open={openFAQ === 4} />
              </button>
              {openFAQ === 4 && (
                <div className="p-4 pt-0 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Yes, we offer special pricing and packages for bulk orders. Please contact our sales team for customized solutions for your farming needs.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 6 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-lime-500 transition-colors">
              <button onClick={() => toggleFAQ(5)} className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-900 pr-4">How do I track my order?</span>
                <Chevron open={openFAQ === 5} />
              </button>
              {openFAQ === 5 && (
                <div className="p-4 pt-0 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Once your order is shipped, you'll receive a tracking ID via email and SMS. You can use this to track your order status in real-time.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
