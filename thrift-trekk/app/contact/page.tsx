'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BRAND_INFO, WHATSAPP_URL } from '@/lib/constants';
import Link from 'next/link';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className={`w-full py-3 rounded font-bold transition ${
                  submitted
                    ? 'bg-green-500 text-white'
                    : 'bg-black hover:bg-gray-800 text-white'
                }`}
              >
                {submitted ? '✓ Message Sent' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <Phone className="text-blue-600 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold mb-1">Phone</h3>
                  <a href={`tel:${BRAND_INFO.phone}`} className="text-gray-600 hover:text-black">
                    {BRAND_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="text-blue-600 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold mb-1">Email</h3>
                  <a href={`mailto:${BRAND_INFO.email}`} className="text-gray-600 hover:text-black">
                    {BRAND_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="text-blue-600 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold mb-1">Address</h3>
                  <p className="text-gray-600">{BRAND_INFO.address}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <MessageCircle className="text-blue-600 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold mb-1">WhatsApp</h3>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black"
                  >
                    Chat with us
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-bold mb-2">Response Time</h3>
              <p className="text-sm text-gray-600 mb-4">We typically respond within 24 hours</p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold transition"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="border-t border-gray-200 pt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold mb-2">How long does shipping take?</h3>
              <p className="text-sm text-gray-600">Orders are typically shipped within 2-3 business days. Standard delivery takes 5-7 business days.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold mb-2">What is your return policy?</h3>
              <p className="text-sm text-gray-600">We offer 30-day returns on all items. Products must be unworn and in original packaging.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold mb-2">Do you offer exchanges?</h3>
              <p className="text-sm text-gray-600">Yes! You can exchange items for a different size or color within 30 days.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold mb-2">What payment methods do you accept?</h3>
              <p className="text-sm text-gray-600">We accept COD, debit cards, credit cards, and UPI payments. WhatsApp orders are also available.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
