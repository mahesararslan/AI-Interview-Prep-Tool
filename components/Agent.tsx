"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { vapi } from "@/lib/vapi.sdk"
import { interviewer } from "@/constants"
import { createFeedback } from "@/lib/actions/general.action"
import { Mic, Phone, PhoneOff, MessageSquare, Camera, CameraOff } from "lucide-react"

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant"
  content: string
}

interface AgentProps {
  userName: string
  userId: string
  interviewId?: string
  feedbackId?: string
  type: "generate" | "interview"
  questions?: string[]
}

const Agent = ({ userName, userId, interviewId, feedbackId, type, questions }: AgentProps) => {
  const router = useRouter()
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
  const [messages, setMessages] = useState<SavedMessage[]>([])
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [lastMessage, setLastMessage] = useState<string>("")
  const [cameraEnabled, setCameraEnabled] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false)

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE)
    }

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED)
    }

    const onMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript }
        setMessages((prev) => [...prev, newMessage])
      }
    }

    const onSpeechStart = () => {
      console.log("speech start")
      setIsSpeaking(true)
    }

    const onSpeechEnd = () => {
      console.log("speech end")
      setIsSpeaking(false)
    }

    const onError = (error: Error) => {
      console.log("Error:", error)
    }

    vapi.on("call-start", onCallStart)
    vapi.on("call-end", onCallEnd)
    vapi.on("message", onMessage)
    vapi.on("speech-start", onSpeechStart)
    vapi.on("speech-end", onSpeechEnd)
    vapi.on("error", onError)

    return () => {
      vapi.off("call-start", onCallStart)
      vapi.off("call-end", onCallEnd)
      vapi.off("message", onMessage)
      vapi.off("speech-start", onSpeechStart)
      vapi.off("speech-end", onSpeechEnd)
      vapi.off("error", onError)
    }
  }, [])

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content)
    }

    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
      console.log("handleGenerateFeedback")
      setIsGeneratingFeedback(true)

      const { success, feedbackId: id } = await createFeedback({
        interviewId: interviewId!,
        userId: userId!,
        transcript: messages,
        feedbackId,
      })

      if (success && id) {
        router.push(`/interview/${interviewId}/feedback`)
      } else {
        console.log("Error saving feedback")
        setIsGeneratingFeedback(false)
        router.push("/")
      }
    }

    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/")
      } else {
        handleGenerateFeedback(messages)
      }
    }
  }, [messages, callStatus, feedbackId, interviewId, router, type, userId])

  useEffect(() => {
    let stream: MediaStream | null = null

    const setupCamera = async () => {
      if (cameraEnabled) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true })
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        } catch (err) {
          console.error("Error accessing camera:", err)
          setCameraEnabled(false)
        }
      } else {
        if (stream) {
          stream.getTracks().forEach((track) => track.stop())
        }
        if (videoRef.current) {
          videoRef.current.srcObject = null
        }
      }
    }

    setupCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [cameraEnabled])

  const toggleCamera = () => {
    setCameraEnabled((prev) => !prev)
  }

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING)

    if (type === "generate") {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: {
          username: userName,
          userid: userId,
        },
      })
    } else {
      let formattedQuestions = ""
      if (questions) {
        formattedQuestions = questions.map((question) => `- ${question}`).join("\n")
      }

      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
        },
      })
    }
  }

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED)
    vapi.stop()
  }

  return (
    <div className="min-h-screen bg-gray-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">MockMate Interview</h1>
          <p className="text-gray-400">Your AI-powered interview session</p>
        </div>

        {/* Interview Interface */}
        <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
          {/* Participants Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* AI Interviewer Card */}
            <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center relative">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <Image
                    src="/ai-avatar.png"
                    alt="AI Interviewer"
                    width={65}
                    height={65}
                    className="rounded-full object-cover"
                  />
                </div>
                {isSpeaking && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="flex space-x-1">
                      <span
                        className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                        style={{ animationDelay: "0ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                        style={{ animationDelay: "300ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                        style={{ animationDelay: "600ms" }}
                      ></span>
                    </div>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">AI Interviewer</h3>
              <p className="text-gray-400 text-sm">Professional Interviewer</p>

              {isSpeaking && (
                <div className="absolute top-4 right-4 bg-blue-600/20 p-2 rounded-full">
                  <Mic size={16} className="text-blue-500" />
                </div>
              )}
            </div>

            {/* User Profile Card */}
            <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center border border-blue-600/30 relative">
              <div className="absolute top-4 right-4">
                <button
                  onClick={toggleCamera}
                  className={`flex items-center justify-center p-2 rounded-full transition-colors ${cameraEnabled ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
                  title={cameraEnabled ? "Disable Camera" : "Enable Camera"}
                >
                  {cameraEnabled ? <CameraOff size={16} /> : <Camera size={16} />}
                </button>
              </div>

              <div className="mb-4 w-32 h-32 rounded-full overflow-hidden bg-gradient-to-r from-blue-600/30 to-purple-600/30 flex items-center justify-center">
                {cameraEnabled ? (
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                ) : (
                  <Image
                    src="/user-avatar.png"
                    alt="User"
                    width={120}
                    height={120}
                    className="rounded-full object-cover"
                  />
                )}
              </div>

              <h3 className="text-xl font-semibold text-white mb-1">{userName}</h3>
              <p className="text-gray-400 text-sm">Candidate</p>

              {cameraEnabled && (
                <p className="mt-2 text-xs text-blue-400">Camera enabled - monitor your body language</p>
              )}
            </div>
          </div>

          {/* Transcript Section */}
          {messages.length > 0 && (
            <div className="px-6 pb-6">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center mb-4">
                  <MessageSquare size={18} className="text-blue-500 mr-2" />
                  <h3 className="text-lg font-medium text-white">Transcript</h3>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 max-h-48 overflow-y-auto">
                  <p
                    key={lastMessage}
                    className={cn("text-gray-300 transition-opacity duration-500", "animate-fadeIn")}
                  >
                    {lastMessage}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Call Controls */}
          <div className="bg-gray-800 p-6 flex justify-center">
            {callStatus !== CallStatus.ACTIVE ? (
              <button
                onClick={() => handleCall()}
                disabled={callStatus === CallStatus.CONNECTING}
                className={cn(
                  "flex items-center justify-center px-8 py-4 rounded-full text-white font-medium transition-all",
                  callStatus === CallStatus.CONNECTING
                    ? "bg-gray-700 cursor-wait"
                    : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-600/20",
                )}
              >
                {callStatus === CallStatus.CONNECTING ? (
                  <>
                    <div className="mr-2 relative">
                      <span className="absolute inset-0 rounded-full animate-ping bg-blue-500/75"></span>
                      <Phone size={20} className="relative" />
                    </div>
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <Phone size={20} className="mr-2" />
                    <span>Start Interview</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => handleDisconnect()}
                className="flex items-center justify-center px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium transition-all shadow-lg hover:shadow-red-600/20"
              >
                <PhoneOff size={20} className="mr-2" />
                <span>End Interview</span>
              </button>
            )}
          </div>
        </div>

        {/* Interview Tips */}
        <div className="mt-10 bg-gray-900 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Interview Tips</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Speak clearly and at a moderate pace</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Use the STAR method (Situation, Task, Action, Result) for behavioral questions</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Take a moment to gather your thoughts before answering complex questions</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Enable your camera to monitor your body language and facial expressions</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>You'll receive detailed feedback after the interview is complete</span>
            </li>
          </ul>
        </div>
      </div>
      {isGeneratingFeedback && (
        <div className="fixed inset-0 bg-gray-950/80 flex flex-col items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full shadow-xl">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Generating Feedback</h3>
              <p className="text-gray-400">
                Please wait while we analyze your interview and prepare detailed feedback...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Agent

