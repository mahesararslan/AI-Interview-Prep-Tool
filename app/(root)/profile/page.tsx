import { redirect } from "next/navigation"
import { User, Calendar, Clock, Briefcase, CheckCircle, BarChart2 } from "lucide-react"
import Link from "next/link"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { getCurrentUser } from "@/lib/actions/auth.action"
import { getInterviewsByUserId } from "@/lib/actions/general.action"

// Extend dayjs with relative time plugin
dayjs.extend(relativeTime)

export default async function ProfilePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/sign-in")
  }

  const interviews = await getInterviewsByUserId(user.id)

  return (
    <main className="min-h-screen bg-gray-950">
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="mb-12">
            <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
              <div className="relative h-32 bg-gradient-to-r from-blue-600/30 to-purple-600/30">
                <div className="absolute -bottom-16 left-8">
                  <div className="w-32 h-32 rounded-full bg-gray-800 border-4 border-gray-900 flex items-center justify-center">
                    <User size={64} className="text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="pt-20 pb-8 px-8">
                <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                <div className="flex items-center mt-2 text-gray-400">
                  <span className="flex items-center">
                    <User size={16} className="mr-2" />
                    {user.email}
                  </span>
                  <span className="mx-3">•</span>
                  <span className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    {/* @ts-ignore */}
                    Member since {dayjs(user.createdAt).format("MMMM YYYY")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interview History */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Interview History</h2>
              <Link href="/interviews" className="text-blue-500 hover:text-blue-400 text-sm font-medium">
                View All Interviews
              </Link>
            </div>

            {interviews && interviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {interviews.map((interview) => (
                  <div
                    key={interview.id}
                    className="bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-white">{interview.role}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            interview.type.toLowerCase() === "technical"
                              ? "bg-blue-900/30 text-blue-400"
                              : interview.type.toLowerCase() === "behavioral"
                                ? "bg-purple-900/30 text-purple-400"
                                : "bg-green-900/30 text-green-400"
                          }`}
                        >
                          {interview.type}
                        </span>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-gray-400 text-sm">
                          <Calendar size={14} className="mr-2" />
                          <span>{dayjs(interview.createdAt).format("MMM D, YYYY")}</span>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Clock size={14} className="mr-2" />
                          <span>{dayjs(interview.createdAt).format("h:mm A")}</span>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Briefcase size={14} className="mr-2" />
                          <span>{interview.role}</span>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Link
                          href={`/interview/${interview.id}/feedback`}
                          className="flex-1 py-2 px-3 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-md flex items-center justify-center transition-colors"
                        >
                          <BarChart2 size={16} className="mr-2" />
                          View Feedback
                        </Link>
                        <Link
                          href={`/interview/${interview.id}`}
                          className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md flex items-center justify-center transition-colors"
                        >
                          <CheckCircle size={16} className="mr-2" />
                          Retake
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-900 rounded-xl p-8 text-center">
                <div className="w-16 h-16 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <Briefcase size={24} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No interviews yet</h3>
                <p className="text-gray-400 mb-6">
                  You haven't taken any interviews yet. Start practicing to improve your skills.
                </p>
                <Link
                  href="/interview"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Start Your First Interview
                </Link>
              </div>
            )}
          </div>

          {/* Stats Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Interview Statistics</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-900 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-white">Total Interviews</h3>
                  <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center">
                    <Briefcase size={20} className="text-blue-500" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white">{interviews?.length || 0}</p>
                <p className="text-gray-400 text-sm mt-1">interviews completed</p>
              </div>

              <div className="bg-gray-900 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-white">Latest Interview</h3>
                  <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center">
                    <Calendar size={20} className="text-purple-500" />
                  </div>
                </div>
                {interviews && interviews.length > 0 ? (
                  <>
                    <p className="text-3xl font-bold text-white">{interviews[0].role}</p>
                    <p className="text-gray-400 text-sm mt-1">{dayjs(interviews[0].createdAt).fromNow()}</p>
                  </>
                ) : (
                  <>
                    <p className="text-3xl font-bold text-white">-</p>
                    <p className="text-gray-400 text-sm mt-1">no interviews yet</p>
                  </>
                )}
              </div>

              <div className="bg-gray-900 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-white">Interview Types</h3>
                  <div className="w-12 h-12 rounded-full bg-green-900/30 flex items-center justify-center">
                    <BarChart2 size={20} className="text-green-500" />
                  </div>
                </div>

                {interviews && interviews.length > 0 ? (
                  <div className="space-y-3 mt-2">
                    {/* Calculate interview types */}
                    {(() => {
                      const types: Record<string, number> = {}
                      interviews.forEach((interview) => {
                        types[interview.type] = (types[interview.type] || 0) + 1
                      })

                      return Object.entries(types).map(([type, count]) => (
                        <div key={type}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-300">{type}</span>
                            <span className="text-gray-400">{count}</span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                type.toLowerCase() === "technical"
                                  ? "bg-blue-500"
                                  : type.toLowerCase() === "behavioral"
                                    ? "bg-purple-500"
                                    : "bg-green-500"
                              }`}
                              style={{ width: `${(count / interviews.length) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))
                    })()}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm mt-3">No data available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

