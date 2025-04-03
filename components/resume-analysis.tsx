
"use client"

import { useState } from "react"
import { FileText, CheckCircle, AlertTriangle, BarChart, ChevronDown, ChevronUp } from "lucide-react"

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

interface DetailedAnalysis {
  content: ContentAnalysis
  atsOptimization: ATSOptimization
  formatting: FormattingAnalysis
}

interface ResumeAnalysisProps {
  feedbackData?: DetailedAnalysis
}

export default function ResumeAnalysis({ feedbackData }: ResumeAnalysisProps) {
  const [activeSection, setActiveSection] = useState<string | null>("content")

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null)
    } else {
      setActiveSection(section)
    }
  }

  // If no feedback data is provided, return null or a placeholder
  if (!feedbackData) {
    return (
      <div className="bg-gray-900 rounded-2xl p-8 mb-8">
        <h2 className="text-xl font-bold text-white mb-6">Detailed Analysis</h2>
        <p className="text-gray-400 text-center py-8">No detailed analysis available</p>
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

  // Helper function to get rating badge color
  const getRatingBadgeColor = (rating: string) => {
    switch (rating) {
      case "excellent":
        return "bg-green-500"
      case "good":
        return "bg-blue-500"
      case "needs_improvement":
        return "bg-yellow-500"
      case "poor":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  // Helper function to get rating icon
  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case "excellent":
      case "good":
        return <CheckCircle size={18} className={getRatingColor(rating)} />
      case "needs_improvement":
      case "poor":
        return <AlertTriangle size={18} className={getRatingColor(rating)} />
      default:
        return null
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

  return (
    <div className="bg-gray-900 rounded-2xl p-8 mb-8">
      <h2 className="text-xl font-bold text-white mb-6">Detailed Analysis</h2>

      {/* Content Section */}
      <div className="border-b border-gray-800 pb-4 mb-4">
        <button className="w-full flex items-center justify-between text-left" onClick={() => toggleSection("content")}>
          <div className="flex items-center">
            <FileText size={20} className="text-blue-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-white">Content</h3>
              <p className="text-gray-400 text-sm">Analysis of your resume's content and messaging</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-4">
              <span
                className={`inline-block w-2 h-2 rounded-full ${getRatingBadgeColor(feedbackData.content.rating)} mr-1`}
              ></span>
              <span className={getRatingColor(feedbackData.content.rating)}>
                {getRatingLabel(feedbackData.content.rating)}
              </span>
            </div>
            {activeSection === "content" ? (
              <ChevronUp size={20} className="text-gray-400" />
            ) : (
              <ChevronDown size={20} className="text-gray-400" />
            )}
          </div>
        </button>

        {activeSection === "content" && (
          <div className="mt-4 pl-9">
            <div className="space-y-4">
              {feedbackData.content.sections.map((section, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-start">
                    {getRatingIcon(section.rating)}
                    <div className="ml-3">
                      <h4 className="text-white font-medium">{section.title}</h4>
                      <p className="text-gray-300 text-sm mt-1">{section.feedback}</p>
                      {section.suggestions && (
                        <p className="text-gray-400 text-sm mt-2 italic">Suggestion: {section.suggestions}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ATS Optimization */}
      <div className="border-b border-gray-800 pb-4 mb-4">
        <button className="w-full flex items-center justify-between text-left" onClick={() => toggleSection("ats")}>
          <div className="flex items-center">
            <BarChart size={20} className="text-blue-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-white">ATS Optimization</h3>
              <p className="text-gray-400 text-sm">How well your resume performs with applicant tracking systems</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-4">
              <span
                className={`inline-block w-2 h-2 rounded-full ${getRatingBadgeColor(feedbackData.atsOptimization.rating)} mr-1`}
              ></span>
              <span className={getRatingColor(feedbackData.atsOptimization.rating)}>
                {getRatingLabel(feedbackData.atsOptimization.rating)}
              </span>
            </div>
            {activeSection === "ats" ? (
              <ChevronUp size={20} className="text-gray-400" />
            ) : (
              <ChevronDown size={20} className="text-gray-400" />
            )}
          </div>
        </button>

        {activeSection === "ats" && (
          <div className="mt-4 pl-9">
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Keyword Analysis</h4>
                <div className="space-y-3">
                  {feedbackData.atsOptimization.keywordAnalysis.map((keyword, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-300">{keyword.category}</span>
                        <span className="text-sm text-gray-300">
                          {keyword.score}/{keyword.total}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            keyword.percentage >= 80
                              ? "bg-green-500"
                              : keyword.percentage >= 60
                                ? "bg-blue-500"
                                : keyword.percentage >= 40
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                          }`}
                          style={{ width: `${keyword.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-start">
                  {getRatingIcon(feedbackData.atsOptimization.fileFormatFeedback.rating)}
                  <div className="ml-3">
                    <h4 className="text-white font-medium">{feedbackData.atsOptimization.fileFormatFeedback.title}</h4>
                    <p className="text-gray-300 text-sm mt-1">
                      {feedbackData.atsOptimization.fileFormatFeedback.feedback}
                    </p>
                    {feedbackData.atsOptimization.fileFormatFeedback.suggestions && (
                      <p className="text-gray-400 text-sm mt-2 italic">
                        Suggestion: {feedbackData.atsOptimization.fileFormatFeedback.suggestions}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-start">
                  {getRatingIcon(feedbackData.atsOptimization.formattingFeedback.rating)}
                  <div className="ml-3">
                    <h4 className="text-white font-medium">{feedbackData.atsOptimization.formattingFeedback.title}</h4>
                    <p className="text-gray-300 text-sm mt-1">
                      {feedbackData.atsOptimization.formattingFeedback.feedback}
                    </p>
                    {feedbackData.atsOptimization.formattingFeedback.suggestions && (
                      <p className="text-gray-400 text-sm mt-2 italic">
                        Suggestion: {feedbackData.atsOptimization.formattingFeedback.suggestions}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Formatting & Design */}
      <div>
        <button
          className="w-full flex items-center justify-between text-left"
          onClick={() => toggleSection("formatting")}
        >
          <div className="flex items-center">
            <FileText size={20} className="text-blue-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-white">Formatting & Design</h3>
              <p className="text-gray-400 text-sm">Analysis of your resume's visual presentation</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-4">
              <span
                className={`inline-block w-2 h-2 rounded-full ${getRatingBadgeColor(feedbackData.formatting.rating)} mr-1`}
              ></span>
              <span className={getRatingColor(feedbackData.formatting.rating)}>
                {getRatingLabel(feedbackData.formatting.rating)}
              </span>
            </div>
            {activeSection === "formatting" ? (
              <ChevronUp size={20} className="text-gray-400" />
            ) : (
              <ChevronDown size={20} className="text-gray-400" />
            )}
          </div>
        </button>

        {activeSection === "formatting" && (
          <div className="mt-4 pl-9">
            <div className="space-y-4">
              {feedbackData.formatting.sections.map((section, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-start">
                    {getRatingIcon(section.rating)}
                    <div className="ml-3">
                      <h4 className="text-white font-medium">{section.title}</h4>
                      <p className="text-gray-300 text-sm mt-1">{section.feedback}</p>
                      {section.suggestions && section.suggestions !== "N/A" && (
                        <p className="text-gray-400 text-sm mt-2 italic">Suggestion: {section.suggestions}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

