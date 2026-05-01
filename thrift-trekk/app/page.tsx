import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/sections/hero';
import { FeaturedCategoriesSection } from '@/components/sections/featured-categories';
import { BestsellersSection } from '@/components/sections/bestsellers';
import { NewArrivalsSection } from '@/components/sections/new-arrivals';
import { TrustBadgesSection } from '@/components/sections/trust-badges';
import { ReviewsSection } from '@/components/sections/reviews';
import { NewsletterSection } from '@/components/sections/newsletter';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeaturedCategoriesSection />
      <BestsellersSection />
      <NewArrivalsSection />
      <TrustBadgesSection />
      <ReviewsSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
