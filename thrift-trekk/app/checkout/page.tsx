'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useCart } from '@/lib/cart-context'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { Magnetic } from '@/components/effects/magnetic'

type CheckoutStep = 'info' | 'summary' | 'payment' | 'success'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('info')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'cod',
  })

  if (items.length === 0 && currentStep !== 'success') {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-28 text-center">
          <h1 className="text-huge font-display mb-6">Bag is empty.</h1>
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-mono text-xs tracking-[0.2em] uppercase font-bold px-7 py-4 hover:bg-foreground hover:text-background transition-colors"
          >
            Browse the catalog
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep === 'info') setCurrentStep('summary')
    else if (currentStep === 'summary') setCurrentStep('payment')
    else if (currentStep === 'payment') {
      clearCart()
      setCurrentStep('success')
    }
  }

  const steps: CheckoutStep[] = ['info', 'summary', 'payment']
  const stepLabels = { info: 'Info', summary: 'Review', payment: 'Pay', success: 'Done' }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 flex items-center gap-2">
          <span className="inline-block w-6 h-px bg-primary" />
          Checkout
        </p>
        <h1 className="text-huge font-display mb-12">
          Almost <span className="text-primary italic">there.</span>
        </h1>

        {/* Stepper */}
        {currentStep !== 'success' && (
          <div className="flex items-center mb-12 border-y border-border">
            {steps.map((step, idx) => {
              const active = currentStep === step
              const done = steps.indexOf(currentStep) > idx
              return (
                <div
                  key={step}
                  className={`flex items-center gap-3 flex-1 py-4 px-3 md:px-5 ${
                    idx !== steps.length - 1 ? 'border-r border-border' : ''
                  } ${active ? 'bg-primary text-primary-foreground' : done ? 'bg-card' : ''}`}
                >
                  <span className="font-display text-2xl md:text-3xl">0{idx + 1}</span>
                  <span className="font-mono text-[10px] md:text-xs tracking-[0.18em] uppercase font-bold">
                    {stepLabels[step]}
                  </span>
                </div>
              )
            })}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {currentStep === 'success' && (
              <div className="border border-primary bg-card p-8 md:p-12 text-center">
                <CheckCircle size={48} className="text-primary mx-auto mb-6" strokeWidth={2} />
                <h2 className="text-big font-display mb-4">Order placed.</h2>
                <p className="text-muted-foreground mb-8 leading-relaxed max-w-md mx-auto">
                  We&apos;ll send a confirmation via email and WhatsApp shortly. Welcome to the trekk.
                </p>
                <div className="border border-border p-6 mb-8 text-left max-w-md mx-auto space-y-1.5 font-mono text-xs">
                  <p className="text-muted-foreground tracking-[0.18em] uppercase mb-3">[ Receipt ]</p>
                  <p>{formData.firstName} {formData.lastName}</p>
                  <p>{formData.email}</p>
                  <p>{formData.phone}</p>
                  <p>{formData.address}, {formData.city} {formData.zipCode}</p>
                  <p className="font-display text-2xl text-primary pt-3 border-t border-border mt-3">
                    Total: ₹{total.toLocaleString('en-IN')}
                  </p>
                </div>
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-mono text-xs tracking-[0.2em] uppercase font-bold px-7 py-4 hover:bg-foreground hover:text-background transition-colors"
                >
                  Back to home
                </Link>
              </div>
            )}

            {currentStep === 'info' && (
              <form onSubmit={handleSubmit} className="border border-border bg-card p-6 md:p-8">
                <h2 className="font-display text-3xl uppercase tracking-tight mb-8">Shipping info</h2>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Input name="firstName" placeholder="First name" value={formData.firstName} onChange={handleChange} required />
                  <Input name="lastName" placeholder="Last name" value={formData.lastName} onChange={handleChange} required />
                </div>
                <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <Input name="phone" type="tel" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
                <Input name="address" placeholder="Street address" value={formData.address} onChange={handleChange} required />
                <div className="grid grid-cols-2 gap-3">
                  <Input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                  <Input name="zipCode" placeholder="ZIP" value={formData.zipCode} onChange={handleChange} required />
                </div>
                <Magnetic strength={0.15}>
                  <button
                    type="submit"
                    className="group w-full bg-primary text-primary-foreground py-4 font-mono text-xs tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-3 mt-6 hover:bg-foreground hover:text-background transition-colors"
                  >
                    Continue to review
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Magnetic>
              </form>
            )}

            {currentStep === 'summary' && (
              <form onSubmit={handleSubmit} className="border border-border bg-card p-6 md:p-8">
                <h2 className="font-display text-3xl uppercase tracking-tight mb-8">Review</h2>

                <div className="border border-border p-5 mb-6">
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                    Shipping to
                  </p>
                  <p className="text-base mb-1">{formData.firstName} {formData.lastName}</p>
                  <p className="text-sm text-muted-foreground">{formData.address}</p>
                  <p className="text-sm text-muted-foreground">{formData.city} {formData.zipCode}</p>
                  <button
                    type="button"
                    onClick={() => setCurrentStep('info')}
                    className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary hover:text-foreground mt-3 transition-colors"
                  >
                    Edit →
                  </button>
                </div>

                <div className="border-t border-border pt-6">
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
                    Items
                  </p>
                  <div className="space-y-2 font-mono text-sm">
                    {items.map((item) => (
                      <div key={`${item.productId}-${item.size}`} className="flex justify-between">
                        <span className="text-foreground/85">{item.name} (size {item.size}) × {item.quantity}</span>
                        <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="group w-full bg-primary text-primary-foreground py-4 font-mono text-xs tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-3 mt-8 hover:bg-foreground hover:text-background transition-colors"
                >
                  Continue to payment
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}

            {currentStep === 'payment' && (
              <form onSubmit={handleSubmit} className="border border-border bg-card p-6 md:p-8">
                <h2 className="font-display text-3xl uppercase tracking-tight mb-8">Payment</h2>

                <div className="space-y-3 mb-8">
                  {[
                    { v: 'cod', t: 'Cash on Delivery', d: 'Pay when you receive your order' },
                    { v: 'online', t: 'Card / UPI', d: 'Razorpay-secured (demo)' },
                  ].map((opt) => (
                    <label
                      key={opt.v}
                      className={`flex items-start gap-4 p-5 border-2 cursor-pointer transition-colors ${
                        formData.paymentMethod === opt.v
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={opt.v}
                        checked={formData.paymentMethod === opt.v}
                        onChange={handleChange}
                        className="mt-1 accent-primary"
                      />
                      <div>
                        <p className="font-display text-xl uppercase tracking-tight">{opt.t}</p>
                        <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground mt-1">
                          {opt.d}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>

                <Magnetic strength={0.15}>
                  <button
                    type="submit"
                    className="group w-full bg-primary text-primary-foreground py-5 font-mono text-xs tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-3 hover:bg-foreground hover:text-background transition-colors"
                  >
                    Place order — ₹{total.toLocaleString('en-IN')}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Magnetic>
              </form>
            )}
          </div>

          {/* Order Summary */}
          {currentStep !== 'success' && (
            <div className="md:col-span-1">
              <div className="border border-border bg-card p-6 sticky top-32">
                <h3 className="font-display text-xl uppercase tracking-tight mb-6 pb-4 border-b border-border">
                  Total
                </h3>
                <div className="space-y-2 mb-6 font-mono text-xs tracking-[0.15em] uppercase max-h-72 overflow-y-auto pr-2">
                  {items.map((item) => (
                    <div
                      key={`${item.productId}-${item.size}`}
                      className="flex justify-between gap-2"
                    >
                      <span className="text-muted-foreground truncate">
                        {item.name.split(' ').slice(0, 3).join(' ')} ×{item.quantity}
                      </span>
                      <span className="flex-shrink-0">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4 space-y-2 font-mono text-xs tracking-[0.15em] uppercase">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-primary">Free</span>
                  </div>
                  <div className="flex justify-between items-end pt-3 mt-3 border-t border-border">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-display text-3xl">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full bg-input border border-border px-4 py-3 mb-3 font-mono text-sm focus:outline-none focus:border-primary placeholder:text-muted-foreground"
    />
  )
}
