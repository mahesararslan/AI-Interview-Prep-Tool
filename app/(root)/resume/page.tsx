import ResumeUploader from "@/components/resume-uploader"
import Link from "next/link"
import { CheckCircle, FileText, BarChart, Award, ArrowRight } from "lucide-react"

export default function ResumeReviewPage() {
  return (
    <main className="min-h-screen bg-gray-950">

      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Resume Review Service</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get expert AI-powered feedback on your resume to increase your chances of landing interviews
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Upload Section */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Upload Your Resume</h2>
                  <ResumeUploader />

                  <div className="mt-8 pt-8 border-t border-gray-800">
                    <h3 className="text-lg font-semibold text-white mb-4">What You'll Get</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                        <span className="ml-3 text-gray-300">
                          Detailed analysis of your resume's strengths and weaknesses
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                        <span className="ml-3 text-gray-300">
                          ATS compatibility check to ensure your resume passes automated screening
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                        <span className="ml-3 text-gray-300">
                          Keyword optimization suggestions tailored to your industry
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                        <span className="ml-3 text-gray-300">
                          Content and formatting recommendations to make your resume stand out
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                        <span className="ml-3 text-gray-300">Actionable suggestions for improvement with examples</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Pricing & Info */}
            <div>
              <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden mb-8">
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Resume Review</h2>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">$19</span>
                    <span className="text-gray-400 ml-2">per review</span>
                  </div>
                  <p className="text-gray-300 mb-6">
                    Get comprehensive feedback on your resume from our AI-powered analysis system.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-blue-500 mr-2" />
                      <span className="text-gray-300">Detailed analysis report</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-blue-500 mr-2" />
                      <span className="text-gray-300">ATS compatibility check</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-blue-500 mr-2" />
                      <span className="text-gray-300">Industry-specific recommendations</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-blue-500 mr-2" />
                      <span className="text-gray-300">Results within 24 hours</span>
                    </li>
                  </ul>
                  <Link
                    href="#upload-section"
                    className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center font-medium transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              </div>

              <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                  <h3 className="text-xl font-bold text-white mb-4">Resume Statistics</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <FileText size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                      <div className="ml-3">
                        <p className="text-white font-medium">6 seconds</p>
                        <p className="text-sm text-gray-400">Average time recruiters spend reviewing a resume</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <BarChart size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                      <div className="ml-3">
                        <p className="text-white font-medium">75%</p>
                        <p className="text-sm text-gray-400">Of resumes are rejected by ATS before a human sees them</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Award size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                      <div className="ml-3">
                        <p className="text-white font-medium">40%</p>
                        <p className="text-sm text-gray-400">Increase in interview chances with an optimized resume</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Process Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-900 rounded-xl p-6 relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold text-white">
                  1
                </div>
                <h3 className="text-xl font-semibold text-white mt-4 mb-3">Upload Your Resume</h3>
                <p className="text-gray-300">
                  Upload your current resume in PDF or DOCX format. Our system will securely process your document.
                </p>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold text-white">
                  2
                </div>
                <h3 className="text-xl font-semibold text-white mt-4 mb-3">AI Analysis</h3>
                <p className="text-gray-300">
                  Our AI system analyzes your resume for content, format, keywords, and ATS compatibility.
                </p>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold text-white">
                  3
                </div>
                <h3 className="text-xl font-semibold text-white mt-4 mb-3">Get Detailed Feedback</h3>
                <p className="text-gray-300">
                  Receive a comprehensive report with actionable suggestions to improve your resume.
                </p>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-900 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center text-xl font-bold text-blue-500">
                    J
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white font-medium">James Wilson</h4>
                    <p className="text-sm text-gray-400">Software Engineer</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  "The resume review service helped me identify key weaknesses in my resume. After implementing the
                  suggestions, I started getting more interview calls."
                </p>
              </div>

              <div className="bg-gray-900 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center text-xl font-bold text-purple-500">
                    S
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white font-medium">Sarah Johnson</h4>
                    <p className="text-sm text-gray-400">Marketing Specialist</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  "I was surprised by how detailed the feedback was. The ATS compatibility check was especially helpful,
                  as I had no idea my resume was being filtered out."
                </p>
              </div>

              <div className="bg-gray-900 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-600/20 flex items-center justify-center text-xl font-bold text-green-500">
                    M
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white font-medium">Michael Chen</h4>
                    <p className="text-sm text-gray-400">Product Manager</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  "The keyword optimization suggestions were spot on. I was able to tailor my resume to specific job
                  descriptions and saw immediate results."
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
              <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                    Ready to improve your resume?
                    <span className="block text-indigo-200">Get started today.</span>
                  </h2>
                  <p className="mt-4 text-lg text-indigo-100">
                    Join thousands of job seekers who have improved their resumes with MockMate.
                  </p>
                </div>
                <div className="mt-8 lg:mt-0 lg:ml-8">
                  <div className="rounded-md shadow">
                    <Link
                      href="#upload-section"
                      className="flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 transition-colors"
                    >
                      Upload Your Resume
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

