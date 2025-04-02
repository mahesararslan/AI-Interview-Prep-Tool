import Link from "next/link"
import { FileText, Download, ArrowLeft, ThumbsUp, Edit, Search, Zap } from "lucide-react"
import ResumeAnalysis from "@/components/resume-analysis"
import { redirect } from "next/navigation"

interface ResumeReviewPageProps {
  params: {
    id: string
  }
}

export default function ResumeReviewResultPage({ params }: ResumeReviewPageProps) {
  const { id } = params

  if (!id) redirect("/resume");

  return (
    <main className="min-h-screen bg-gray-950">

      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/services/resume" className="flex items-center text-gray-400 hover:text-white mb-4">
              <ArrowLeft size={16} className="mr-2" />
              Back to Resume Review
            </Link>
            <h1 className="text-3xl font-bold text-white">Resume Analysis Results</h1>
            <p className="text-gray-400 mt-2">Resume ID: {id}</p>
          </div>

          {/* Overall Score */}
          <div className="bg-gray-900 rounded-2xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-6 md:mb-0">
                <FileText size={24} className="text-blue-500 mr-4" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Resume Analysis</h2>
                  <p className="text-gray-400">Uploaded on April 2, 2025</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-24 h-24 rounded-full bg-blue-900/30 border-4 border-blue-600 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">78</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-white">Good</h3>
                  <p className="text-gray-400">Overall Score</p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-900 rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Summary</h2>
            <p className="text-gray-300 mb-6">
              Your resume demonstrates strong technical skills and relevant experience, but could benefit from more
              quantifiable achievements and better ATS optimization. The formatting is clean, though some sections could
              be reorganized for better impact.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <ThumbsUp size={18} className="text-green-500 mr-2" />
                  <h3 className="text-lg font-medium text-white">Strengths</h3>
                </div>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Strong technical skills section</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Clear work history with relevant positions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Good education credentials</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-800 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <Edit size={18} className="text-yellow-500 mr-2" />
                  <h3 className="text-lg font-medium text-white">Areas to Improve</h3>
                </div>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>Lack of quantifiable achievements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>Some sections could be better organized</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>Missing some industry keywords</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-800 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <Search size={18} className="text-blue-500 mr-2" />
                  <h3 className="text-lg font-medium text-white">ATS Compatibility</h3>
                </div>
                <div className="flex items-center mb-2">
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                  <span className="ml-2 text-white font-medium">70%</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Your resume is partially optimized for ATS systems. Adding more industry-specific keywords would
                  improve your score.
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <ResumeAnalysis />

          {/* Recommendations */}
          <div className="bg-gray-900 rounded-2xl p-8 mb-8">
            <div className="flex items-center mb-6">
              <Zap size={24} className="text-yellow-500 mr-3" />
              <h2 className="text-xl font-bold text-white">Recommendations</h2>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Add Quantifiable Achievements</h3>
                <p className="text-gray-300 mb-4">
                  Include specific metrics and results to demonstrate your impact. Numbers make your accomplishments
                  more concrete and impressive.
                </p>
                <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-yellow-500">
                  <p className="text-sm text-gray-400 mb-2">Instead of:</p>
                  <p className="text-gray-300 mb-3">"Improved website performance and user experience"</p>
                  <p className="text-sm text-gray-400 mb-2">Try:</p>
                  <p className="text-green-400">
                    "Improved website load time by 40% and increased user engagement by 25%, resulting in a 15% boost in
                    conversion rates"
                  </p>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Optimize for ATS</h3>
                <p className="text-gray-300 mb-4">
                  Include more industry-specific keywords that match job descriptions in your target roles. This will
                  help your resume pass through automated screening systems and increase your chances of getting an
                  interview.
                </p>
                <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-yellow-500">
                  <p className="text-sm text-gray-400 mb-2">Consider adding these keywords:</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded-md text-xs">
                      project management
                    </span>
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded-md text-xs">data analysis</span>
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded-md text-xs">cross-functional</span>
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded-md text-xs">
                      strategic planning
                    </span>
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded-md text-xs">
                      stakeholder management
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Improve Section Organization</h3>
                <p className="text-gray-300 mb-4">
                  Reorganize your resume sections to highlight your most impressive qualifications first. For your
                  profile, consider leading with your most relevant experience.
                </p>
                <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-yellow-500">
                  <p className="text-sm text-gray-400 mb-2">Recommended order:</p>
                  <ol className="list-decimal list-inside text-gray-300 space-y-1 ml-2">
                    <li>Professional Summary</li>
                    <li>Core Skills & Technologies</li>
                    <li>Professional Experience</li>
                    <li>Projects</li>
                    <li>Education</li>
                    <li>Certifications</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Next Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Revise Your Resume</h3>
                <p className="text-gray-200 mb-4">
                  Apply our recommendations to improve your resume and increase your chances of landing interviews.
                </p>
                <Link
                  href="/services/resume/download-report"
                  className="inline-flex items-center px-4 py-2 bg-white text-blue-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  <Download size={16} className="mr-2" />
                  Download Full Report
                </Link>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Practice Interviews</h3>
                <p className="text-gray-200 mb-4">
                  Now that you're improving your resume, prepare for interviews with our AI interview practice sessions.
                </p>
                <Link
                  href="/interviews/new"
                  className="inline-flex items-center px-4 py-2 bg-white text-blue-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Start Interview Practice
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

