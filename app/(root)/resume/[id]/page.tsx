"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { FileText, Download, ArrowLeft, ThumbsUp, Edit, Search, Zap, CheckCircle, Briefcase } from "lucide-react"
import ResumeAnalysis from "@/components/resume-analysis"
import { useRouter } from "next/navigation"

// Define types based on the JSON structure
interface Point {
  text: string
}

interface SectionFeedback {
  title: string
  rating: "excellent" | "good" | "needs_improvement" | "poor"
  feedback: string
  suggestions?: string
}

interface KeywordAnalysis {
  category: string
  score: number
  total: number
  percentage: number
}

interface ContentAnalysis {
  rating: "excellent" | "good" | "needs_improvement" | "poor"
  sections: SectionFeedback[]
}

interface ATSOptimization {
  score: number
  rating: "excellent" | "good" | "needs_improvement" | "poor"
  keywordAnalysis: KeywordAnalysis[]
  fileFormatFeedback: SectionFeedback
  formattingFeedback: SectionFeedback
}

interface FormattingAnalysis {
  rating: "excellent" | "good" | "needs_improvement" | "poor"
  sections: SectionFeedback[]
}

interface Recommendation {
  title: string
  description: string
  example: {
    before?: string
    after?: string
    tips?: string[]
    keywords?: string[]
  }
}

interface IndustryInsights {
  industry: string
  relevantKeywords: string[]
  industryTrends?: string
}

interface ResumeFeedback {
  id: string
  userId: string
  createdAt: string
  fileName: string
  fileType: string
  fileSize: number
  overallScore: number
  overallRating: "excellent" | "good" | "needs_improvement" | "poor"
  summary: string
  strengths: Point[]
  areasToImprove: Point[]
  atsCompatibility: {
    score: number
    feedback: string
  }
  detailedAnalysis: {
    content: ContentAnalysis
    atsOptimization: ATSOptimization
    formatting: FormattingAnalysis
  }
  recommendations: Recommendation[]
  industryInsights?: IndustryInsights
}

interface ResumeReviewPageProps {
  params: {
    id: string
  }
}

export default function ResumeReviewResultPage({ params }: ResumeReviewPageProps) { // @ts-ignore
  const { id } = use(params);
  const router = useRouter()
  const [feedback, setFeedback] = useState<ResumeFeedback | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) {
      router.push("/services/resume")
      return
    }

    // Get feedback data from localStorage
    const storedFeedback = localStorage.getItem("resumeFeedback")
    if (storedFeedback) {
      try {
        const parsedFeedback = JSON.parse(storedFeedback)
        setFeedback(parsedFeedback)
      } catch (error) {
        console.error("Error parsing feedback data:", error)
      }
    }
    setLoading(false)
  }, [id, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!feedback) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Resume feedback not found</h2>
          <Link href="/services/resume" className="text-blue-500 hover:text-blue-400">
            Return to Resume Review
          </Link>
        </div>
      </div>
    )
  }

  // Helper function to get rating color
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "excellent":
        return "text-green-500"
      case "good":
        return "text-blue-500"
      case "needs_improvement":
        return "text-yellow-500"
      case "poor":
        return "text-red-500"
      default:
        return "text-gray-400"
    }
  }

  // Helper function to get rating label
  const getRatingLabel = (rating: string) => {
    switch (rating) {
      case "excellent":
        return "Excellent"
      case "good":
        return "Good"
      case "needs_improvement":
        return "Needs Improvement"
      case "poor":
        return "Poor"
      default:
        return "Unknown"
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <main className="min-h-screen bg-gray-950">
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/resume" className="flex items-center text-gray-400 hover:text-white mb-4">
              <ArrowLeft size={16} className="mr-2" />
              Back to Resume Review
            </Link>
            <h1 className="text-3xl font-bold text-white">Resume Analysis Results</h1>
            <p className="text-gray-400 mt-2">Resume ID: {feedback.id}</p>
          </div>

          {/* Overall Score */}
          <div className="bg-gray-900 rounded-2xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-6 md:mb-0">
                <FileText size={24} className="text-blue-500 mr-4" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Resume Analysis</h2>
                  <p className="text-gray-400">Uploaded on {formatDate(feedback.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-24 h-24 rounded-full bg-blue-900/30 border-4 border-blue-600 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{feedback.overallScore}</span>
                </div>
                <div className="ml-4">
                  <h3 className={`text-xl font-semibold ${getRatingColor(feedback.overallRating)}`}>
                    {getRatingLabel(feedback.overallRating)}
                  </h3>
                  <p className="text-gray-400">Overall Score</p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-900 rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Summary</h2>
            <p className="text-gray-300 mb-6">{feedback.summary}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <ThumbsUp size={18} className="text-green-500 mr-2" />
                  <h3 className="text-lg font-medium text-white">Strengths</h3>
                </div>
                <ul className="space-y-2 text-gray-300 text-sm">
                  {feedback.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span>{strength.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-800 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <Edit size={18} className="text-yellow-500 mr-2" />
                  <h3 className="text-lg font-medium text-white">Areas to Improve</h3>
                </div>
                <ul className="space-y-2 text-gray-300 text-sm">
                  {feedback.areasToImprove.map((area, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-yellow-500 mr-2">•</span>
                      <span>{area.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-800 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <Search size={18} className="text-blue-500 mr-2" />
                  <h3 className="text-lg font-medium text-white">ATS Compatibility</h3>
                </div>
                <div className="flex items-center mb-2">
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${feedback.atsCompatibility.score}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-white font-medium">{feedback.atsCompatibility.score}%</span>
                </div>
                <p className="text-gray-300 text-sm">{feedback.atsCompatibility.feedback}</p>
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <ResumeAnalysis feedbackData={feedback.detailedAnalysis} />

          {/* Recommendations */}
          <div className="bg-gray-900 rounded-2xl p-8 mb-8">
            <div className="flex items-center mb-6">
              <Zap size={24} className="text-yellow-500 mr-3" />
              <h2 className="text-xl font-bold text-white">Recommendations</h2>
            </div>

            <div className="space-y-6">
              {feedback.recommendations.map((recommendation, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{recommendation.title}</h3>
                  <p className="text-gray-300 mb-4">{recommendation.description}</p>

                  {recommendation.example && (
                    <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-yellow-500">
                      {recommendation.example.before && (
                        <>
                          <p className="text-sm text-gray-400 mb-2">Instead of:</p>
                          <p className="text-gray-300 mb-3">"{recommendation.example.before}"</p>
                        </>
                      )}

                      {recommendation.example.after && (
                        <>
                          <p className="text-sm text-gray-400 mb-2">Try:</p>
                          <p className="text-green-400">"{recommendation.example.after}"</p>
                        </>
                      )}

                      {recommendation.example.tips && recommendation.example.tips.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-400 mb-2">Tips:</p>
                          <ul className="space-y-1">
                            {recommendation.example.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="flex items-start text-gray-300 text-sm">
                                <CheckCircle size={14} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {recommendation.example.keywords && recommendation.example.keywords.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-400 mb-2">Consider adding these keywords:</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {recommendation.example.keywords.map((keyword, keywordIndex) => (
                              <span
                                key={keywordIndex}
                                className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded-md text-xs"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Industry Insights */}
          {feedback.industryInsights && (
            <div className="bg-gray-900 rounded-2xl p-8 mb-8">
              <div className="flex items-center mb-6">
                <Briefcase size={24} className="text-purple-500 mr-3" />
                <h2 className="text-xl font-bold text-white">
                  Industry Insights: {feedback.industryInsights.industry}
                </h2>
              </div>

              {feedback.industryInsights.industryTrends && (
                <p className="text-gray-300 mb-6">{feedback.industryInsights.industryTrends}</p>
              )}

              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Relevant Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {feedback.industryInsights.relevantKeywords.map((keyword, index) => (
                    <span key={index} className="px-3 py-1.5 bg-purple-900/30 text-purple-400 rounded-md text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

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
                  href="/resume"
                  className="inline-flex items-center px-4 py-2 bg-white text-blue-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  <Download size={16} className="mr-2" />
                  Review more resumes
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