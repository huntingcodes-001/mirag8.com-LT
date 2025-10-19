import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <img
              src="/WhatsApp Image 2025-10-04 at 16.57.05_d87db2c5.jpg"
              alt="Mirag8"
              className="h-8 mb-4 brightness-0 invert"
            />
            <p className="text-sm leading-relaxed">
              Transforming homes with innovative smart mirror technology. Experience the future of connected living.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-sm hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="text-sm hover:text-white transition-colors"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-sm hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-sm hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>302 Rustom Manzil, 106 Hill Road, Bandra, Mumbai 400050</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+919930752917" className="hover:text-white transition-colors">+91 99307 52917</a>
                  <a href="tel:+919892977581" className="hover:text-white transition-colors">+91 98929 77581</a>
                </div>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@mirag8.com" className="hover:text-white transition-colors">
                  info@mirag8.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4 mb-4">
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-blue-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm">
              <span className="font-semibold text-white">Business Hours:</span><br />
              Monday - Saturday: 9:00 AM - 7:00 PM<br />
              Sunday: 10:00 AM - 5:00 PM
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Mirag8. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
