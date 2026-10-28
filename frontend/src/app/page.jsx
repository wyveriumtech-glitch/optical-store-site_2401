import Hero from '@/components/home/Hero';
import OffersShowcase from '@/components/home/OffersShowcase';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedSlider from '@/components/home/FeaturedSlider';
import FaceShapeGuide from '@/components/home/FaceShapeGuide';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import { api } from '@/lib/api';

export const revalidate = 0; // Always fresh in development

export default async function HomePage() {
  let products = [];
  let offers = [];
  let reviews = [];

  try {
    const [prodRes, offRes, revRes] = await Promise.all([
      api.getProducts().catch(() => ({ data: [] })),
      api.getOffers().catch(() => ({ data: [] })),
      api.getReviews().catch(() => ({ data: [] })),
    ]);

    products = prodRes?.data || [];
    offers = offRes?.data || [];
    reviews = revRes?.data || [];
  } catch (error) {
    console.error('Home page fetch error:', error);
  }

  return (
    <div className="min-h-screen">
      {/* 1. Cinematic Hero Section */}
      <Hero />

      {/* 2. High-Impact AI Visual Offers Showcase */}
      <OffersShowcase offers={offers} />

      {/* 3. Luxury Category Grid */}
      <CategoryGrid />

      {/* 4. Featured Masterpieces Slider */}
      <FeaturedSlider products={products} />

      {/* 5. Interactive Face-Shape Frame Guide */}
      <FaceShapeGuide />

      {/* 6. Clinical Technologies & Services */}
      <WhyChooseUs />

      {/* 7. Patron Testimonials & Store Gallery */}
      <TestimonialsSection reviews={reviews} />
    </div>
  );
}
