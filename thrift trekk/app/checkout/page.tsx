'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useCart } from '@/lib/cart-context';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

type CheckoutStep = 'info' | 'summary' | 'payment' | 'success';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('info');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'cod',
  });

  if (items.length === 0 && currentStep !== 'success') {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <p className="text-center text-gray-600 mb-6">Your cart is empty</p>
          <div className="text-center">
            <Link href="/shop" className="inline-block bg-black text-white px-6 py-3 rounded font-semibold hover:bg-gray-800 transition">
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 'info') {
      setCurrentStep('summary');
    } else if (currentStep === 'summary') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      clearCart();
      setCurrentStep('success');
    }
  };

  const steps = ['info', 'summary', 'payment'];
  const stepLabels = {
    info: 'Shipping Info',
    summary: 'Order Summary',
    payment: 'Payment',
    success: 'Success',
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {/* Progress Indicator */}
        {currentStep !== 'success' && (
          <div className="flex justify-between mb-8">
            {steps.map((step, idx) => (
              <div key={step} className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${
                  (currentStep === step || steps.indexOf(currentStep) > idx)
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {idx + 1}
                </div>
                <p className="text-sm font-medium text-center">{Object.values(stepLabels)[idx]}</p>
                {idx < steps.length - 1 && (
                  <div className={`h-1 flex-1 mt-2 ${
                    steps.indexOf(currentStep) > idx ? 'bg-black' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            {currentStep === 'success' && (
              <div className="text-center py-12">
                <CheckCircle size={64} className="text-green-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">Order Placed Successfully!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for your order. You will receive a confirmation email and WhatsApp message shortly.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
                  <h3 className="font-bold mb-3">Order Details</h3>
                  <p className="text-sm mb-2">Name: {formData.firstName} {formData.lastName}</p>
                  <p className="text-sm mb-2">Email: {formData.email}</p>
                  <p className="text-sm mb-2">Phone: {formData.phone}</p>
                  <p className="text-sm mb-2">Address: {formData.address}, {formData.city} {formData.zipCode}</p>
                  <p className="text-sm font-bold mt-4 pt-4 border-t">Total: ₹{total}</p>
                </div>
                <Link href="/" className="inline-block bg-black text-white px-6 py-3 rounded font-semibold hover:bg-gray-800 transition">
                  Back to Home
                </Link>
              </div>
            )}

            {currentStep === 'info' && (
              <form onSubmit={handleSubmit}>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-6">Shipping Information</h2>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP Code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded font-bold transition"
                  >
                    Continue to Summary
                  </button>
                </div>
              </form>
            )}

            {currentStep === 'summary' && (
              <form onSubmit={handleSubmit}>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-bold mb-3">Shipping To:</h3>
                    <p className="text-sm mb-1">{formData.firstName} {formData.lastName}</p>
                    <p className="text-sm mb-1">{formData.address}</p>
                    <p className="text-sm mb-1">{formData.city} {formData.zipCode}</p>
                    <p className="text-sm font-semibold mt-3 text-blue-600 cursor-pointer" onClick={() => setCurrentStep('info')}>
                      Edit Address
                    </p>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-bold mb-3">Items</h3>
                    {items.map(item => (
                      <div key={`${item.productId}-${item.size}`} className="flex justify-between text-sm mb-2">
                        <span>{item.name} (Size {item.size}) x{item.quantity}</span>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded font-bold transition mt-6"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            )}

            {currentStep === 'payment' && (
              <form onSubmit={handleSubmit}>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-6">Payment Method</h2>

                  <div className="space-y-3 mb-6">
                    <label className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded cursor-pointer hover:border-blue-500 transition" style={{borderColor: formData.paymentMethod === 'cod' ? '#1e40af' : '#d1d5db'}}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                      />
                      <div>
                        <p className="font-semibold">Cash on Delivery (COD)</p>
                        <p className="text-sm text-gray-600">Pay when you receive your order</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded cursor-pointer hover:border-blue-500 transition" style={{borderColor: formData.paymentMethod === 'online' ? '#1e40af' : '#d1d5db'}}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        checked={formData.paymentMethod === 'online'}
                        onChange={handleInputChange}
                      />
                      <div>
                        <p className="font-semibold">Online Payment</p>
                        <p className="text-sm text-gray-600">Credit/Debit Card or UPI (Demo)</p>
                      </div>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded font-bold transition"
                  >
                    Place Order
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Order Summary Sidebar */}
          {currentStep !== 'success' && (
            <div className="md:col-span-1">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-24">
                <h3 className="font-bold text-lg mb-4">Order Total</h3>

                <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                  {items.map(item => (
                    <div key={`${item.productId}-${item.size}`} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name} x{item.quantity}</span>
                      <span className="font-semibold">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-300 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>₹0</span>
                  </div>
                  <div className="border-t border-gray-300 pt-2 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
