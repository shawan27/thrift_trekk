import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-12">Policies</h1>

        {/* Shipping Policy */}
        <section className="mb-12 pb-12 border-b border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Shipping Policy</h2>
          <div className="space-y-4 text-gray-700 text-pretty">
            <p>
              <strong>Order Processing:</strong> All orders are processed within 2-3 business days (excluding weekends and holidays). You will receive a confirmation email with tracking information once your order ships.
            </p>
            <p>
              <strong>Delivery Timeline:</strong> Standard delivery takes 5-7 business days from the date of shipment. Express delivery options may be available in select areas.
            </p>
            <p>
              <strong>Free Shipping:</strong> Free shipping is available on all orders above ₹1499. Orders below this amount incur a flat shipping charge of ₹99.
            </p>
            <p>
              <strong>Tracking:</strong> You will receive a tracking link via email and SMS. You can use this to monitor your package in real-time.
            </p>
            <p>
              <strong>Delivery Issues:</strong> If your package doesn&apos;t arrive within the expected timeframe, please contact us immediately via WhatsApp or email.
            </p>
          </div>
        </section>

        {/* Returns Policy */}
        <section className="mb-12 pb-12 border-b border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Returns & Exchanges</h2>
          <div className="space-y-4 text-gray-700 text-pretty">
            <p>
              <strong>30-Day Returns:</strong> We offer hassle-free returns within 30 days of purchase. The item must be unworn, unwashed, and in its original packaging with all tags intact.
            </p>
            <p>
              <strong>Return Process:</strong> To initiate a return, contact us via WhatsApp with your order number and reason for return. We&apos;ll provide you with a return label and instructions.
            </p>
            <p>
              <strong>Refund Timeline:</strong> Refunds are processed within 5-7 business days after we receive and inspect your returned item.
            </p>
            <p>
              <strong>Exchanges:</strong> Want a different size or color? No problem! We offer free exchanges within 30 days. Simply contact us with your preference.
            </p>
            <p>
              <strong>Non-Returnable Items:</strong> Items that have been worn, washed, or damaged are not eligible for returns or exchanges.
            </p>
          </div>
        </section>

        {/* Privacy Policy */}
        <section className="mb-12 pb-12 border-b border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
          <div className="space-y-4 text-gray-700 text-pretty">
            <p>
              <strong>Data Collection:</strong> We collect personal information such as name, email, phone number, and address when you place an order or subscribe to our newsletter. This information is used to process orders and communicate with you.
            </p>
            <p>
              <strong>Data Security:</strong> We use industry-standard encryption and security measures to protect your personal information. Your data is never shared with third parties without your consent.
            </p>
            <p>
              <strong>Cookies:</strong> Our website uses cookies to enhance your browsing experience. You can disable cookies in your browser settings if you prefer.
            </p>
            <p>
              <strong>Newsletter:</strong> When you subscribe to our newsletter, we&apos;ll send you updates about new collections, exclusive offers, and styling tips. You can unsubscribe anytime.
            </p>
            <p>
              <strong>Contact:</strong> For privacy-related concerns or to request data deletion, please contact us via email or WhatsApp.
            </p>
          </div>
        </section>

        {/* Terms & Conditions */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>
          <div className="space-y-4 text-gray-700 text-pretty">
            <p>
              <strong>Use License:</strong> We grant you a limited license to access and use our website for personal, non-commercial purposes. You may not modify, distribute, or republish any content without permission.
            </p>
            <p>
              <strong>Product Information:</strong> We strive to provide accurate product descriptions and pricing. However, we do not warrant the accuracy of all information and reserve the right to make corrections.
            </p>
            <p>
              <strong>Pricing:</strong> Prices are subject to change without notice. We reserve the right to limit order quantities and cancel orders at our discretion.
            </p>
            <p>
              <strong>Intellectual Property:</strong> All content on our website, including text, images, and logos, is the property of THRIFT TREKK and protected by copyright laws.
            </p>
            <p>
              <strong>Limitation of Liability:</strong> THRIFT TREKK is not responsible for any indirect, incidental, or consequential damages arising from the use of our website or products.
            </p>
            <p>
              <strong>Governing Law:</strong> These terms and conditions are governed by the laws of India. Any disputes shall be resolved in the appropriate courts.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
