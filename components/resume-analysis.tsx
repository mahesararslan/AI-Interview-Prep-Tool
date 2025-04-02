"use client"

import { useState, useEffect } from "react"
import { FileText, CheckCircle, AlertTriangle, BarChart, ChevronDown, ChevronUp } from "lucide-react"

// Type definitions for the feedback data
type FeedbackData = {
  detailedAnalysis: {
    content: {
      rating: string;
      sections: Array<{
        title: string;
        rating: string;
        feedback: string;
        suggestions: string;
      }>;
    };
    atsOptimization: {
      rating: string;
      keywordAnalysis: Array<{
        category: string;
        score: number;
        total: number;
        percentage: number;
      }>;
      fileFormatFeedback: {
        title: string;
        rating: string;
        feedback: string;
      };
      formattingFeedback: {
        title: string;
        rating: string;
        feedback: string;
      };
    };
    formatting: {
      rating: string;
      sections: Array<{
        title: string;
        rating: string;
        feedback: string;
      }>;
    };
  };
};

export default function ResumeAnalysis() {
  const [activeSection, setActiveSection] = useState<string | null>("content")
  const [feedback, setFeedback] = useState<FeedbackData | null>(null)

  useEffect(() => {
    // Get feedback data from localStorage
    const storedFeedback = localStorage.getItem("resumeFeedback")
    if (storedFeedback) {
      setFeedback(JSON.parse(storedFeedback))
    }
  }, [])

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null)
    } else {
      setActiveSection(section)
    }
  }

  const getRatingColor = (rating: string) => {
    switch (rating.toLowerCase()) {
      case "excellent":
        return "bg-green-500 text-green-500"
      case "good":
        return "bg-green-500 text-green-500"
      case "needs_improvement":
        return "bg-yellow-500 text-yellow-500"
      case "poor":
        return "bg-red-500 text-red-500"
      default:
        return "bg-gray-500 text-gray-500"
    }
  }

  const getRatingIcon = (rating: string) => {
    switch (rating.toLowerCase()) {
      case "excellent":
      case "good":
        return <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
      case "needs_improvement":
        return <AlertTriangle size={18} className="text-yellow-500 mt-0.5 flex-shrink-0" />
      case "poor":
        return <AlertTriangle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
      default:
        return <CheckCircle size={18} className="text-gray-500 mt-0.5 flex-shrink-0" />
    }
  }

  if (!feedback) {
    return (
      <div className="bg-gray-900 rounded-2xl p-8 mb-8">
        <h2 className="text-xl font-bold text-white mb-6">Detailed Analysis</h2>
        <p className="text-gray-400">Loading feedback data...</p>
      </div>
    )
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
              <span className={`inline-block w-2 h-2 rounded-full ${getRatingColor(feedback.detailedAnalysis.content.rating).split(' ')[0]} mr-1`}></span>
              <span className={`${getRatingColor(feedback.detailedAnalysis.content.rating).split(' ')[1]} font-medium capitalize`}>
                {feedback.detailedAnalysis.content.rating.replace('_', ' ')}
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
              {feedback.detailedAnalysis.content.sections.map((section, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-start">
                    {getRatingIcon(section.rating)}
                    <div className="ml-3">
                      <h4 className="text-white font-medium">{section.title}</h4>
                      <p className="text-gray-300 text-sm mt-1">{section.feedback}</p>
                      {section.suggestions && (
                        <p className="text-gray-400 text-xs mt-2">
                          <span className="font-semibold">Suggestion:</span> {section.suggestions}
                        </p>
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
              <span className={`inline-block w-2 h-2 rounded-full ${getRatingColor(feedback.detailedAnalysis.atsOptimization.rating).split(' ')[0]} mr-1`}></span>
              <span className={`${getRatingColor(feedback.detailedAnalysis.atsOptimization.rating).split(' ')[1]} font-medium capitalize`}>
                {feedback.detailedAnalysis.atsOptimization.rating.replace('_', ' ')}
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
                  {feedback.detailedAnalysis.atsOptimization.keywordAnalysis.map((keyword, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-300">{keyword.category}</span>
                        <span className="text-sm text-gray-300">{keyword.score}/{keyword.total}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            keyword.percentage >= 80 ? 'bg-green-500' :
                            keyword.percentage >= 50 ? 'bg-yellow-500' :
                            'bg-red-500'
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
                  {getRatingIcon(feedback.detailedAnalysis.atsOptimization.fileFormatFeedback.rating)}
                  <div className="ml-3">
                    <h4 className="text-white font-medium">{feedback.detailedAnalysis.atsOptimization.fileFormatFeedback.title}</h4>
                    <p className="text-gray-300 text-sm mt-1">
                      {feedback.detailedAnalysis.atsOptimization.fileFormatFeedback.feedback}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-start">
                  {getRatingIcon(feedback.detailedAnalysis.atsOptimization.formattingFeedback.rating)}
                  <div className="ml-3">
                    <h4 className="text-white font-medium">{feedback.detailedAnalysis.atsOptimization.formattingFeedback.title}</h4>
                    <p className="text-gray-300 text-sm mt-1">
                      {feedback.detailedAnalysis.atsOptimization.formattingFeedback.feedback}
                    </p>
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
              <span className={`inline-block w-2 h-2 rounded-full ${getRatingColor(feedback.detailedAnalysis.formatting.rating).split(' ')[0]} mr-1`}></span>
              <span className={`${getRatingColor(feedback.detailedAnalysis.formatting.rating).split(' ')[1]} font-medium capitalize`}>
                {feedback.detailedAnalysis.formatting.rating.replace('_', ' ')}
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
              {feedback.detailedAnalysis.formatting.sections.map((section, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-start">
                    {getRatingIcon(section.rating)}
                    <div className="ml-3">
                      <h4 className="text-white font-medium">{section.title}</h4>
                      <p className="text-gray-300 text-sm mt-1">{section.feedback}</p>
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