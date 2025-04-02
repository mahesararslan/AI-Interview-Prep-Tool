import Navbar from "@/components/Navbar"
import InterviewCard from "@/components/InterviewCard"
import { getFeedbackByInterviewId, getInterviewsByUserId, getLatestInterviews } from "@/lib/actions/general.action"
import { Plus, History, Calendar } from "lucide-react"
import Link from "next/link"
import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation"

const Page = async () => {
    const user = await getCurrentUser();

    if(!user) redirect("/sign-in")


    const [userInterviews, allInterview] = await Promise.all([
        getInterviewsByUserId(user?.id!),
        getLatestInterviews({ userId: user?.id! }),
    ])

    //  using above code snippet add it to each interview in the userInterviews array and allInterview array
    userInterviews?.map(async (interview) => {
        const feedback =
            user?.id && interview?.id
                ? await getFeedbackByInterviewId({
                    interviewId: interview.id,
                    userId: user.id,
                })
                : null;
        return { ...interview, feedback };
    })

    allInterview?.map(async (interview) => {
        const feedback =
            user?.id && interview?.id
                ? await getFeedbackByInterviewId({
                    interviewId: interview.id,
                    userId: user.id,
                })
                : null;
        return { ...interview, feedback };
    })

    const hasPastInterviews = userInterviews && userInterviews.length > 0
    const hasUpcomingInterviews = allInterview && allInterview.length > 0

    return (
        <main className="min-h-screen bg-gray-950">
            <Navbar isLoggedIn={true} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Interviews</h1>
                        <p className="text-gray-400">Manage your interview practice sessions</p>
                    </div>

                    <Link
                        href="/interviews/new"
                        className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                        <Plus size={18} className="mr-2" />
                        New Interview
                    </Link>
                </div>

                <section className="bg-gray-900 rounded-2xl p-6 mb-10">
                    <div className="flex items-center mb-6">
                        <History size={20} className="text-blue-500 mr-2" />
                        <h2 className="text-xl font-semibold text-white">Your Past Interviews</h2>
                    </div>

                    {hasPastInterviews ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {userInterviews?.map((interview) => (
                                <InterviewCard
                                    key={interview.id}
                                    userId={user?.id}
                                    interviewId={interview.id}
                                    role={interview.role}
                                    type={interview.type}
                                    techstack={interview.techstack}
                                    createdAt={interview.createdAt} // @ts-ignore
                                    feedback={interview.feedback}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-800 rounded-xl p-8 text-center">
                            <p className="text-gray-300 mb-4">You haven't taken any interviews yet</p>
                            <Link
                                href="/interviews/new"
                                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                <Plus size={18} className="mr-2" />
                                Start Your First Interview
                            </Link>
                        </div>
                    )}
                </section>

                <section className="bg-gray-900 rounded-2xl p-6">
                    <div className="flex items-center mb-6">
                        <Calendar size={20} className="text-green-500 mr-2" />
                        <h2 className="text-xl font-semibold text-white">Available Interviews</h2>
                    </div>

                    {hasUpcomingInterviews ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {allInterview?.map((interview) => (
                                <InterviewCard
                                    key={interview.id}
                                    userId={user?.id}
                                    interviewId={interview.id}
                                    role={interview.role}
                                    type={interview.type}
                                    techstack={interview.techstack}
                                    createdAt={interview.createdAt} // @ts-ignore
                                    feedback={interview.feedback}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-800 rounded-xl p-8 text-center">
                            <p className="text-gray-300">There are no interviews available at the moment</p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
};

export default Page;
