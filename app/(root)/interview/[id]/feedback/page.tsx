import dayjs from "dayjs"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Calendar, CheckCircle, ArrowLeft, RefreshCw, BarChart2, ThumbsUp, AlertTriangle } from "lucide-react"

import { getFeedbackByInterviewId, getInterviewById } from "@/lib/actions/general.action"
import { getCurrentUser } from "@/lib/actions/auth.action"

interface RouteParams {
  params: {
    id: string
  }
}

const Feedback = async ({ params }: RouteParams) => {
  const { id } = params
  const user = await getCurrentUser()

  if (!user) redirect("/sign-in")

  const interview = await getInterviewById(id)
  if (!interview) redirect("/")

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  })

  // Function to determine score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-blue-500"
    if (score >= 40) return "text-yellow-500"
    return "text-red-500"
  }

  // Function to determine score background
  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-blue-500"
    if (score >= 40) return "bg-yellow-500"
    return "bg-red-500"
  }

  // Function to get score label
  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    if (score >= 40) return "Fair"
    return "Needs Improvement"
  }

  return (
    <main className="min-h-screen bg-gray-950">
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Interview Feedback</h1>
                <p className="text-gray-400 mt-1">
                  <span className="capitalize">{interview.role}</span> Interview
                </p>
              </div>

              <div className="mt-4 md:mt-0 flex items-center">
                <Calendar size={18} className="text-gray-400 mr-2" />
                <span className="text-gray-300">
                  {feedback?.createdAt ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A") : "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Overall Score Card */}
          <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="p-8">
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full flex items-center justify-center bg-gray-800">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#444"
                          strokeWidth="3"
                          strokeDasharray="100, 100"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={
                            feedback?.totalScore && feedback.totalScore >= 80
                              ? "#10b981"
                              : feedback?.totalScore && feedback.totalScore >= 60
                                ? "#3b82f6"
                                : feedback?.totalScore && feedback.totalScore >= 40
                                  ? "#eab308"
                                  : "#ef4444"
                          }
                          strokeWidth="3"
                          strokeDasharray={`${feedback?.totalScore || 0}, 100`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <span className={`text-3xl font-bold ${getScoreColor(feedback?.totalScore || 0)}`}>
                            {feedback?.totalScore || 0}
                          </span>
                          <span className="text-gray-400 text-sm">/100</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <span className={`text-sm font-medium ${getScoreColor(feedback?.totalScore || 0)}`}>
                        {getScoreLabel(feedback?.totalScore || 0)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white mb-4">Overall Assessment</h2>
                  <p className="text-gray-300 leading-relaxed">
                    {feedback?.finalAssessment || "No assessment available."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interview Breakdown */}
          <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <BarChart2 size={24} className="text-blue-500 mr-3" />
                <h2 className="text-xl font-bold text-white">Interview Breakdown</h2>
              </div>

              <div className="space-y-6">
                {feedback?.categoryScores?.map((category, index) => (
                  <div key={index} className="bg-gray-800 rounded-xl p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">
                        {index + 1}. {category.name}
                      </h3>
                      <div className="flex items-center mt-2 md:mt-0">
                        <span className={`text-lg font-bold ${getScoreColor(category.score)}`}>{category.score}</span>
                        <span className="text-gray-400 text-sm ml-1">/100</span>
                      </div>
                    </div>

                    <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
                      <div
                        className={`h-2.5 rounded-full ${getScoreBg(category.score)}`}
                        style={{ width: `${category.score}%` }}
                      ></div>
                    </div>

                    <p className="text-gray-300">{category.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Strengths and Areas for Improvement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Strengths */}
            <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <ThumbsUp size={24} className="text-green-500 mr-3" />
                  <h2 className="text-xl font-bold text-white">Strengths</h2>
                </div>

                <ul className="space-y-3">
                  {feedback?.strengths?.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle size={18} className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="ml-3 text-gray-300">{strength}</span>
                    </li>
                  ))}
                  {(!feedback?.strengths || feedback.strengths.length === 0) && (
                    <li className="text-gray-400">No strengths recorded.</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Areas for Improvement */}
            <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <AlertTriangle size={24} className="text-yellow-500 mr-3" />
                  <h2 className="text-xl font-bold text-white">Areas for Improvement</h2>
                </div>

                <ul className="space-y-3">
                  {feedback?.areasForImprovement?.map((area, index) => (
                    <li key={index} className="flex items-start">
                      <AlertTriangle size={18} className="text-yellow-500 mt-1 flex-shrink-0" />
                      <span className="ml-3 text-gray-300">{area}</span>
                    </li>
                  ))}
                  {(!feedback?.areasForImprovement || feedback.areasForImprovement.length === 0) && (
                    <li className="text-gray-400">No areas for improvement recorded.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/" className="flex-1 cursor-pointer">
              <button className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg flex items-center justify-center transition-colors">
                <ArrowLeft size={18} className="mr-2" />
                Back to Dashboard
              </button>
            </Link>

            <Link href={`/interview/${id}`} className="flex-1 cursor-pointer">
              <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center transition-colors">
                <RefreshCw size={18} className="mr-2" />
                Retake Interview
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Feedback

