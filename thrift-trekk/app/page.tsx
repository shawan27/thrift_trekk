import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/sections/hero'
import { FeaturedCategoriesSection } from '@/components/sections/featured-categories'
import { BestsellersSection } from '@/components/sections/bestsellers'
import { ManifestoSection } from '@/components/sections/manifesto'
import { NewArrivalsSection } from '@/components/sections/new-arrivals'
import { TrustBadgesSection } from '@/components/sections/trust-badges'
import { ReviewsSection } from '@/components/sections/reviews'
import { NewsletterSection } from '@/components/sections/newsletter'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <FeaturedCategoriesSection />
      <BestsellersSection />
      <ManifestoSection />
      <NewArrivalsSection />
      <TrustBadgesSection />
      <ReviewsSection />
      <NewsletterSection />
      <Footer />
    </main>
  )
}
