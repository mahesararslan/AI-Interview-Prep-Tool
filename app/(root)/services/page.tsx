
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
                    href="/interview"
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
                    href="/resume"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                  >
                    Upload Your Resume
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

