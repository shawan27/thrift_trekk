import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">About THRIFT TREKK</h1>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">Our Story</h2>
            <p className="mb-4 text-pretty">
              THRIFT TREKK is a premium sustainable denim brand born from a passion for quality, style, and authenticity. We believe that great fashion should be accessible, timeless, and made to last.
            </p>
            <p className="text-pretty">
              Founded in 2023, we&apos;ve been on a mission to revolutionize the denim industry by offering premium sustainable products without compromising on style or comfort.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">Our Mission</h2>
            <p className="text-pretty">
              To create premium, sustainable denim and streetwear that empowers individuals to express their authentic style while making conscious choices for the planet. We believe fashion should be inclusive, accessible, and transformative.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-lg mb-2 text-black">Quality First</h3>
                <p>Every piece is crafted with meticulous attention to detail using premium materials.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-black">Sustainability</h3>
                <p>We&apos;re committed to reducing our environmental impact through sustainable practices.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-black">Authenticity</h3>
                <p>We celebrate individuality and empower our customers to express their unique style.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-black">Community</h3>
                <p>We&apos;re building a community of like-minded individuals who value quality and style.</p>
              </div>
            </div>
          </section>

          <section className="bg-black text-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Join the Movement</h2>
            <p className="mb-6 text-pretty">
              Be part of the THRIFT TREKK community. Follow us on social media and subscribe to our newsletter for exclusive offers, styling tips, and new collection drops.
            </p>
            <Link href="/" className="inline-block bg-white text-black px-6 py-3 rounded font-bold hover:bg-gray-100 transition">
              Shop Now
            </Link>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
