import Button from '../components/Button';
import { Globe, Users, Award, Target } from 'lucide-react';

interface AboutProps {
  onNavigate: (page: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
  const teamMembers = [
    {
      name: 'Arjun Mehta',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
    },
    {
      name: 'Neha Kapoor',
      role: 'Chief Technology Officer',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
    },
    {
      name: 'Rohan Sharma',
      role: 'Head of Design',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
    },
    {
      name: 'Kavya Reddy',
      role: 'Product Manager',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Innovation First',
      description: 'We constantly push boundaries to bring cutting-edge technology to everyday life.'
    },
    {
      icon: Users,
      title: 'Customer Centric',
      description: 'Your satisfaction and experience drive every decision we make.'
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'We never compromise on quality, ensuring premium products every time.'
    },
    {
      icon: Globe,
      title: 'Global Vision',
      description: 'Making smart homes accessible to everyone, everywhere around the world.'
    }
  ];

  return (
    <div className="pt-16 md:pt-20">
      <section className="relative h-[400px] bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg"
            alt="About Us"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Mirag8
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Pioneering the future of smart living, one mirror at a time
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Founded in 2020, Mirag8 was born from a simple vision: to transform the way
                  people interact with technology in their homes. We believe that smart home
                  technology should be seamless, elegant, and accessible to everyone.
                </p>
                <p>
                  Our team of engineers, designers, and innovators came together with a shared
                  passion for creating products that enhance daily life without adding complexity.
                  The result? Smart mirrors that are not just functional, but truly transformative.
                </p>
                <p>
                  Today, Mirag8 is proud to serve thousands of customers worldwide, helping them
                  make their homes smarter, one mirror at a time. We're not just selling products;
                  we're building a community of forward-thinking individuals who embrace the future
                  of connected living.
                </p>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                alt="Our Story"
                className="w-full h-[500px] object-cover rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                  <value.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The passionate people behind Mirag8
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex items-center">
              <img
                src="https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg"
                alt="Delivery"
                className="w-full h-80 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div className="flex items-center">
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Worldwide Delivery
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  We're proud to serve customers around the globe. Our premium smart mirrors are
                  shipped with care to ensure they arrive in perfect condition, ready to transform
                  your space. Fast, secure, and reliable delivery, no matter where you are.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Free shipping on orders over ₹50,000</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Express delivery available</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Professional installation support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how our smart mirrors can transform your space. Our team is here to help
            you find the perfect solution.
          </p>
          <Button onClick={() => onNavigate('contact')} variant="secondary">
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
}
