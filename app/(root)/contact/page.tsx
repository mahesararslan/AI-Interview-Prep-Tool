
import Link from "next/link"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import ContactButton from "@/components/contact-button"

export default function Contact() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">

      {/* Header */}
      <section className="pt-32 pb-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">Contact Us</h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-300">
              Have questions or need help? We're here for you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="block p-3 w-full rounded-md bg-gray-700 border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-white"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="block p-3 w-full rounded-md bg-gray-700 border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
                    Subject
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      className="block p-3 w-full rounded-md bg-gray-700 border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-white"
                      placeholder="How can we help you?"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                    Message
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="block p-3 w-full rounded-md bg-gray-700 border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-white"
                      placeholder="Your message..."
                    />
                  </div>
                </div>

                <div>
                  <ContactButton />
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <div className="bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Mail className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-300">Email</p>
                      <p className="text-base text-white">mahesararslan1998@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Phone className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-300">Phone</p>
                      <p className="text-base text-white">+92 3202705737</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <MapPin className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-300">Address</p>
                      <p className="text-base text-white">
                        Park Road
                        <br />
                        Islamabad,
                        <br />
                        Pakistan
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Clock className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-300">Business Hours</p>
                      <p className="text-base text-white">
                        Monday - Friday: 9am - 5pm PST
                        <br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-gray-800 rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white">How does MockMate work?</h3>
                    <p className="mt-2 text-gray-300">
                      MockMate uses advanced AI to simulate real interview scenarios. You can practice answering
                      questions, receive feedback, and improve your interview skills.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white">Is there a free trial?</h3>
                    <p className="mt-2 text-gray-300">
                      Yes, our Basic plan is free and includes 3 mock interviews per month. You can upgrade to a paid
                      plan anytime for more features.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white">Can I cancel my subscription?</h3>
                    <p className="mt-2 text-gray-300">
                      Yes, you can cancel your subscription at any time. Your access will continue until the end of your
                      billing period.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

