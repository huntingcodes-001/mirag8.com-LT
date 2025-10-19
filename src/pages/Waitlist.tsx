import { useState, useEffect } from 'react';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { supabase } from '../lib/supabase';
import { Users, Mail, CheckCircle, X, Sparkles } from 'lucide-react';

export default function Waitlist() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [position, setPosition] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalWaitlist, setTotalWaitlist] = useState(372);

  useEffect(() => {
    setShowModal(true);
    fetchTotalWaitlist();
  }, []);

  const fetchTotalWaitlist = async () => {
    const { count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (count !== null) {
      setTotalWaitlist(count + 372);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { data, error: insertError } = await supabase
        .from('waitlist')
        .insert([
          {
            name: formData.name,
            email: formData.email
          }
        ])
        .select()
        .single();

      if (insertError) {
        if (insertError.code === '23505') {
          setError('This email is already on the waitlist!');
        } else {
          setError('Something went wrong. Please try again.');
        }
        setIsSubmitting(false);
        return;
      }

      if (data) {
        setPosition(data.position);
        await fetchTotalWaitlist();
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '' });
    setPosition(null);
    setError(null);
    setShowModal(true);
  };

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <section className="relative py-12 md:py-20">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg')] bg-cover bg-center opacity-5"></div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-blue-500/20 rounded-3xl mb-6">
              <Sparkles className="h-8 w-8 md:h-10 md:w-10 text-blue-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
              Join the Waitlist
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
              Be the first to experience the future of smart mirrors. Get exclusive early access and special launch offers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/30 rounded-xl mb-4">
                <Users className="h-6 w-6 text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Early Access</h3>
              <p className="text-blue-100 text-sm">
                Get notified before the official launch and be among the first to own a Mirag8 smart mirror.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/30 rounded-xl mb-4">
                <Sparkles className="h-6 w-6 text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Exclusive Offers</h3>
              <p className="text-blue-100 text-sm">
                Waitlist members get special discounts and exclusive bundle offers not available to others.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/30 rounded-xl mb-4">
                <Mail className="h-6 w-6 text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Stay Updated</h3>
              <p className="text-blue-100 text-sm">
                Receive updates on new features, product launches, and exclusive content directly to your inbox.
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20 text-center">
            <div className="mb-8">
              <p className="text-blue-100 text-lg mb-2">People on the waitlist</p>
              <p className="text-5xl md:text-6xl font-bold text-white">{totalWaitlist.toLocaleString()}</p>
            </div>

            {!position ? (
              <Button
                onClick={() => setShowModal(true)}
                variant="primary"
                className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700"
              >
                Join the Waitlist Now
              </Button>
            ) : (
              <div className="bg-green-500/20 border border-green-400/50 rounded-2xl p-6 md:p-8">
                <CheckCircle className="h-12 w-12 md:h-16 md:w-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  You're on the list!
                </h3>
                <p className="text-blue-100 mb-4">
                  You are <span className="text-3xl md:text-4xl font-bold text-green-400">#{position}</span> on the waitlist
                </p>
                <p className="text-sm text-blue-200">
                  We'll send you an email at <span className="font-semibold">{formData.email}</span> when it's your turn.
                </p>
              </div>
            )}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-3">What happens next?</h3>
              <ul className="space-y-2 text-blue-100 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>You'll receive a confirmation email</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Get notified when pre-orders open</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Receive exclusive updates and offers</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-3">Why join now?</h3>
              <ul className="space-y-2 text-blue-100 text-sm">
                <li className="flex items-start gap-2">
                  <Sparkles className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Limited early bird pricing</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Priority shipping for first batch</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Exclusive beta tester opportunities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Modal
        isOpen={showModal && !position}
        onClose={() => setShowModal(false)}
        title=""
        maxWidth="max-w-md"
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Join the Waitlist
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Reserve your spot and get exclusive early access
          </p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
            <X className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="w-full text-base py-3"
          >
            {isSubmitting ? 'Joining...' : 'Join Waitlist'}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            By joining, you agree to receive updates from Mirag8. Unsubscribe anytime.
          </p>
        </form>
      </Modal>
    </div>
  );
}
