
import Link from "next/link"
import { CheckCircle, BarChart, Users, Award, BookOpen } from "lucide-react"

export default function Services() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <section className="pt-32 pb-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Our Services
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-300">
              Comprehensive interview preparation solutions to help you land your dream job.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Service 1 */}
            <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-8">
                <div className="flex items-center justify-center h-16 w-16 rounded-md bg-blue-600 text-white mb-6">
                  <Users size={32} />
                </div>
                <h2 className="text-2xl font-bold text-white">AI Mock Interviews</h2>
                <p className="mt-4 text-gray-300">
                  Practice with our AI interviewer that simulates real interview scenarios. Get instant feedback on your
                  responses and improve your interview skills.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-start">
                    <CheckCircle size={20} className="flex-shrink-0 text-blue-500 mt-1" />
                    <span className="ml-3 text-gray-300">Behavioral interviews</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="flex-shrink-0 text-blue-500 mt-1" />
                    <span className="ml-3 text-gray-300">Technical interviews</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="flex-shrink-0 text-blue-500 mt-1" />
                    <span className="ml-3 text-gray-300">Industry-specific questions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="flex-shrink-0 text-blue-500 mt-1" />
                    <span className="ml-3 text-gray-300">Detailed performance analytics</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link
                    href="/interviews/new"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    Start a Mock Interview
                  </Link>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-8">
                <div className="flex items-center justify-center h-16 w-16 rounded-md bg-indigo-600 text-white mb-6">
                  <Award size={32} />
                </div>
                <h2 className="text-2xl font-bold text-white">Resume Review</h2>
                <p className="mt-4 text-gray-300">
                  Get your resume analyzed by our AI to identify strengths and areas for improvement. Receive tailored
                  suggestions to make your resume stand out.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-start">
                    <CheckCircle size={20} className="flex-shrink-0 text-indigo-500 mt-1" />
                    <span className="ml-3 text-gray-300">ATS compatibility check</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="flex-shrink-0 text-indigo-500 mt-1" />
                    <span className="ml-3 text-gray-300">Keyword optimization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="flex-shrink-0 text-indigo-500 mt-1" />
                    <span className="ml-3 text-gray-300">Content and formatting suggestions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="flex-shrink-0 text-indigo-500 mt-1" />
                    <span className="ml-3 text-gray-300">Industry-specific recommendations</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link
                    href="/services/resume"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                  >
                    Upload Your Resume
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-16 lg:grid-cols-2 mt-16">
            {/* Service 3 */}
            <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-8">
                <div className="flex items-center justify-center h-16 w-16 rounded-md bg-purple-600 text-white mb-6">
                  <BarChart size={32} />
                </div>
                <h2 className="text-2xl font-bold text-white">Performance Analytics</h2>
                <p className="mt-4 text-gray-300">
                  Track your progress over time with detailed analytics. Identify patterns in your responses and focus
                  on areas that need improvement.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-start">
                    <CheckCircle size={20} className="flex-shrink-0 text-purple-500 mt-1" />
                    <span className="ml-3 text-gray-300">Response quality metrics</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="flex-shrink-0 text-purple-500 mt-1" />
                    <span className="ml-3 text-gray-300">Progress tracking</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="flex-shrink-0 text-purple-500 mt-1" />
                    <span className="ml-3 text-gray-300">Personalized improvement suggestions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="flex-shrink-0 text-purple-500 mt-1" />
                    <span className="ml-3 text-gray-300">Comparative industry benchmarks</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link
                    href="/analytics"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
                  >
                    View Your Analytics
                  </Link>
                </div>
              </div>
            </div>

            {/* Service 4 */}
            <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-8">
                <div className="flex items-center justify-center h-16 w-16 rounded-md bg-teal-600 text-white mb-6">
                  <BookOpen size={32} />
                </div>
                <h2 className="text-2xl font-bold text-white">Interview Coaching</h2>
                <p className="mt-4 text-gray-300">
                  Get personalized coaching from our AI to improve your interview skills. Learn techniques to handle
                  difficult questions and present yourself confidently.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-start">
                    <CheckCircle size={20} className="flex-shrink-0 text-teal-500 mt-1" />
                    <span className="ml-3 text-gray-300">Communication skills training</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="flex-shrink-0 text-teal-500 mt-1" />
                    <span className="ml-3 text-gray-300">Question strategy guidance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="flex-shrink-0 text-teal-500 mt-1" />
                    <span className="ml-3 text-gray-300">Body language and confidence tips</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="flex-shrink-0 text-teal-500 mt-1" />
                    <span className="ml-3 text-gray-300">Personalized improvement plan</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link
                    href="/services/coaching"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 transition-colors"
                  >
                    Get Coaching
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Simple, Transparent Pricing</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
              Choose the plan that works best for your interview preparation needs.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {/* Basic Plan */}
            <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8">
                <h3 className="text-xl font-medium text-white">Basic</h3>
                <p className="mt-4 text-gray-300">Perfect for beginners starting their job search.</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-white">$0</span>
                  <span className="text-gray-300">/month</span>
                </p>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <CheckCircle size={20} className="flex-shrink-0 text-green-500 mt-1" />
                    <span className="ml-3 text-gray-300">3 AI mock interviews per month</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="flex-shrink-0 text-green-500 mt-1" />
                    <span className="ml-3 text-gray-300">Basic feedback</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="flex-shrink-0 text-green-500 mt-1" />
                    <span className="ml-3 text-gray-300">Limited question library</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link
                    href="/signup"
                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border-2 border-blue-500 transform scale-105">
              <div className="p-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-medium text-white">Pro</h3>
                  <span className="px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full">Popular</span>
                </div>
                <p className="mt-4 text-gray-300">For serious job seekers who want to stand out.</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-white">$19</span>
                  <span className="text-gray-300">/month</span>
                </p>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <CheckCircle size={20} className="flex-shrink-0 text-green-500 mt-1" />
                    <span className="ml-3 text-gray-300">Unlimited AI mock interviews</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="flex-shrink-0 text-green-500 mt-1" />
                    <span className="ml-3 text-gray-300">Detailed feedback and analytics</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="flex-shrink-0 text-green-500 mt-1" />
                    <span className="ml-3 text-gray-300">Full question library</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="flex-shrink-0 text-green-500 mt-1" />
                    <span className="ml-3 text-gray-300">Resume review</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link
                    href="/signup/pro"
                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8">
                <h3 className="text-xl font-medium text-white">Enterprise</h3>
                <p className="mt-4 text-gray-300">For organizations training multiple candidates.</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-white">$99</span>
                  <span className="text-gray-300">/month</span>
                </p>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <CheckCircle size={20} className="flex-shrink-0 text-green-500 mt-1" />
                    <span className="ml-3 text-gray-300">Everything in Pro</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="flex-shrink-0 text-green-500 mt-1" />
                    <span className="ml-3 text-gray-300">Team management</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="flex-shrink-0 text-green-500 mt-1" />
                    <span className="ml-3 text-gray-300">Custom interview scenarios</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="flex-shrink-0 text-green-500 mt-1" />
                    <span className="ml-3 text-gray-300">Priority support</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link
                    href="/contact/sales"
                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

