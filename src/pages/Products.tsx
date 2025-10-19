import { useState } from 'react';
import { products } from '../data/products';
import { testimonials } from '../data/testimonials';
import { Product, Inquiry } from '../types';
import Modal from '../components/Modal';
import Carousel from '../components/Carousel';
import Button from '../components/Button';
import { Star, Package, Globe, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface ProductsProps {
  onNavigate: (page: string) => void;
}

export default function Products({ onNavigate }: ProductsProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [inquiryProduct, setInquiryProduct] = useState<Product | null>(null);
  const [carouselIndices, setCarouselIndices] = useState<{ [key: string]: number }>({});
  const [inquiryForm, setInquiryForm] = useState<Inquiry>({
    productName: '',
    customerName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCarouselPrev = (productId: string, imagesLength: number) => {
    setCarouselIndices(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) - 1 + imagesLength) % imagesLength
    }));
  };

  const handleCarouselNext = (productId: string, imagesLength: number) => {
    setCarouselIndices(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % imagesLength
    }));
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Inquiry submitted:', inquiryForm);
    setSubmitted(true);
    setTimeout(() => {
      setInquiryProduct(null);
      setSubmitted(false);
      setInquiryForm({
        productName: '',
        customerName: '',
        email: '',
        phone: '',
        message: ''
      });
    }, 2000);
  };

  const openInquiryModal = (product: Product) => {
    setInquiryProduct(product);
    setInquiryForm(prev => ({
      ...prev,
      productName: `${product.name} - ${product.tagline}`
    }));
  };

  return (
    <div className="pt-16 md:pt-20">
      <section className="relative h-[300px] md:h-[400px] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
        <div className="relative text-center text-white px-4 z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4">
            Find Your Perfect Mirror
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 max-w-2xl mx-auto">
            Discover smart mirrors that transform your daily routine
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Our Product Range
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from our carefully curated selection of smart mirrors
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {products.map((product) => {
              const currentIndex = carouselIndices[product.id] || 0;

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col"
                >
                  <div className="relative h-56 sm:h-64 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
                    <img
                      src={product.images[currentIndex]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCarouselPrev(product.id, product.images.length);
                          }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-1.5 sm:p-2 rounded-full transition-all shadow-lg opacity-0 group-hover:opacity-100"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCarouselNext(product.id, product.images.length);
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-1.5 sm:p-2 rounded-full transition-all shadow-lg opacity-0 group-hover:opacity-100"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {product.images.map((_, index) => (
                            <div
                              key={index}
                              className={`h-1 rounded-full transition-all duration-300 ${
                                index === currentIndex ? 'bg-white w-6' : 'bg-white/60 w-1'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    <div className="absolute top-3 right-3">
                      <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 flex flex-col flex-grow">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2">{product.tagline}</p>

                    <div className="space-y-3 mb-4 flex-grow">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <h4 className="font-semibold text-gray-900 text-xs sm:text-sm mb-2 flex items-center gap-2">
                          <span className="w-1 h-4 bg-blue-600 rounded"></span>
                          Specifications
                        </h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li className="flex items-start gap-1.5">
                            <Check className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{product.hardwareSpecs.display}</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <Check className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{product.hardwareSpecs.ram} | {product.hardwareSpecs.storage}</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 text-xs sm:text-sm mb-2">Key Features</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {product.features.slice(0, 3).map((feature, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium"
                            >
                              {feature}
                            </span>
                          ))}
                          {product.features.length > 3 && (
                            <span className="text-xs bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 px-2 py-1 rounded-md font-semibold">
                              +{product.features.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-4 mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Starting at</p>
                          <p className="text-xl sm:text-2xl font-bold text-blue-600">
                            ₹{(product.price / 1000).toFixed(0)}K
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-green-600 font-semibold">In Stock</p>
                          <p className="text-xs text-gray-500">Free Shipping</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          onClick={() => setSelectedProduct(product)}
                          variant="primary"
                          className="text-xs sm:text-sm py-2.5 font-semibold"
                        >
                          View Details
                        </Button>
                        <Button
                          onClick={() => openInquiryModal(product)}
                          variant="outline"
                          className="text-xs sm:text-sm py-2.5 font-semibold"
                        >
                          Inquire Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-blue-500/20 rounded-2xl mb-6">
                <Globe className="h-7 w-7 md:h-8 md:w-8 text-blue-400" />
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                Worldwide Delivery
              </h2>
              <p className="text-base md:text-lg text-blue-100 leading-relaxed mb-6">
                We ship our premium smart mirrors globally. Experience the future of smart living,
                no matter where you are. Fast, secure, and reliable delivery to your doorstep.
              </p>
              <ul className="space-y-3 text-blue-100">
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span>Free shipping on orders over ₹50,000</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span>Express delivery available</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span>Professional installation support</span>
                </li>
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src="https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg"
                alt="Delivery"
                className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
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

      <Modal
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        title={selectedProduct?.name}
      >
        {selectedProduct && (
          <div className="space-y-6">
            <Carousel images={selectedProduct.images} className="h-64 sm:h-80 md:h-96 rounded-lg" />

            <div>
              <p className="text-base md:text-lg text-blue-600 font-semibold mb-2">{selectedProduct.tagline}</p>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">{selectedProduct.description}</p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Hardware Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-lg">
                {Object.entries(selectedProduct.hardwareSpecs).map(([key, value]) => (
                  <div key={key} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-700 capitalize text-sm">{key}: </span>
                      <span className="text-gray-600 text-sm">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Features</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-50 text-blue-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-1">Price</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                  ₹{selectedProduct.price.toLocaleString('en-IN')}
                </p>
              </div>
              <Button
                onClick={() => {
                  setSelectedProduct(null);
                  openInquiryModal(selectedProduct);
                }}
                variant="primary"
                className="w-full sm:w-auto"
              >
                Send Inquiry
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={inquiryProduct !== null}
        onClose={() => setInquiryProduct(null)}
        title="Send Inquiry"
        maxWidth="max-w-2xl"
      >
        {submitted ? (
          <div className="text-center py-8 sm:py-12">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full mb-4">
              <Package className="h-7 w-7 sm:h-8 sm:w-8 text-green-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Your inquiry has been submitted. We'll get back to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleInquirySubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product
              </label>
              <input
                type="text"
                value={inquiryForm.productName}
                disabled
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={inquiryForm.customerName}
                onChange={(e) =>
                  setInquiryForm({ ...inquiryForm, customerName: e.target.value })
                }
                required
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={inquiryForm.email}
                onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                required
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={inquiryForm.phone}
                onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                required
                pattern="[0-9]{10}"
                placeholder="10-digit mobile number"
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                value={inquiryForm.message}
                onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                onClick={() => setInquiryProduct(null)}
                variant="outline"
                className="flex-1 order-2 sm:order-1"
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="flex-1 order-1 sm:order-2">
                Submit Inquiry
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
