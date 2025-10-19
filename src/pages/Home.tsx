import { useState } from 'react';
import Carousel from '../components/Carousel';
import Button from '../components/Button';
import { products } from '../data/products';
import { testimonials } from '../data/testimonials';
import {
  Bot,
  TrendingUp,
  Cloud,
  Mail,
  MessageSquare,
  Music,
  Youtube,
  Globe,
  Star,
  ArrowRight
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const heroSlides = [
    {
      image: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg',
      title: 'Making Homes Smarter',
      subtitle: 'Experience the future of connected living with Mirag8 Smart Mirrors'
    },
    {
      image: 'https://images.pexels.com/photos/1667071/pexels-photo-1667071.jpeg',
      title: 'Your Smart Companion',
      subtitle: 'Transforming your daily routine with intelligent technology'
    },
    {
      image: 'https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg',
      title: 'Innovation Meets Design',
      subtitle: 'Elegance and technology perfectly combined'
    }
  ];

  const features = [
    { icon: Bot, title: 'AI ChatBot', description: 'Intelligent assistant at your service' },
    { icon: TrendingUp, title: 'Stock & Crypto', description: 'Real-time market updates' },
    { icon: Cloud, title: 'Weather Forecast', description: 'Always stay prepared' },
    { icon: Mail, title: 'Email Viewer', description: 'Check emails hands-free' },
    { icon: MessageSquare, title: 'WhatsApp', description: 'Stay connected effortlessly' },
    { icon: Music, title: 'Spotify', description: 'Your music, your way' },
    { icon: Youtube, title: 'YouTube', description: 'Entertainment on demand' },
    { icon: Globe, title: 'Google Integration', description: 'All your apps in one place' }
  ];

  const uniqueProducts = products.reduce((acc, product) => {
    if (!acc.find(p => p.name === product.name)) {
      acc.push(product);
    }
    return acc;
  }, [] as typeof products);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="pt-16 md:pt-20">
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px]">
        <Carousel
          images={heroSlides.map(slide => slide.image)}
          className="h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              Making Homes Smarter
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 max-w-2xl mx-auto text-gray-100">
              Experience the future of connected living with Mirag8 Smart Mirrors
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button onClick={() => onNavigate('products')} variant="primary" className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4">
                Explore Products
              </Button>
              <Button onClick={() => onNavigate('waitlist')} variant="outline" className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4 bg-white/10 border-white text-white hover:bg-white hover:text-gray-900">
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              About Our Smart Mirrors
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Our smart mirrors seamlessly integrate into your daily life, providing instant access
              to information, entertainment, and smart home controls - all through an elegant display.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full mb-3 sm:mb-4 group-hover:bg-blue-600 transition-colors">
                  <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Products
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the perfect smart mirror for your home
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {uniqueProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2">{product.tagline}</p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-600 mb-4">
                    ₹{(product.price / 1000).toFixed(0)}K
                  </p>
                  <Button
                    onClick={() => onNavigate('products')}
                    variant="primary"
                    className="w-full text-sm sm:text-base"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Real experiences from real people
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  {testimonial.imageUrl && (
                    <img
                      src={testimonial.imageUrl}
                      alt={testimonial.customerName}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-3"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm truncate">
                      {testimonial.customerName}
                    </h4>
                    {testimonial.customerTitle && (
                      <p className="text-xs text-gray-600 truncate">{testimonial.customerTitle}</p>
                    )}
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 lg:py-24 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-base md:text-lg text-blue-100 mb-8">
            Subscribe to our newsletter for the latest updates, tips, and exclusive offers
          </p>

          {subscribed ? (
            <div className="bg-green-500 text-white px-6 py-4 rounded-lg inline-flex items-center gap-2">
              <Star className="h-5 w-5" />
              <span className="font-medium">Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <Button type="submit" variant="secondary" className="whitespace-nowrap">
                Subscribe <ArrowRight className="inline-block ml-2 h-4 w-4" />
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
