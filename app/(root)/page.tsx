// import Link from "next/link";
// import Image from "next/image";

// import { Button } from "@/components/ui/button";
// import InterviewCard from "@/components/InterviewCard";

// import { getCurrentUser } from "@/lib/actions/auth.action";
// import {
//   getInterviewsByUserId,
//   getLatestInterviews,
// } from "@/lib/actions/general.action";

// async function Home() {
//   const user = await getCurrentUser();

//   const [userInterviews, allInterview] = await Promise.all([
//     getInterviewsByUserId(user?.id!),
//     getLatestInterviews({ userId: user?.id! }),
//   ]);

//   const hasPastInterviews = userInterviews?.length! > 0;
//   const hasUpcomingInterviews = allInterview?.length! > 0;

//   return (
//     <>
//       <section className="card-cta">
//         <div className="flex flex-col gap-6 max-w-lg">
//           <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
//           <p className="text-lg">
//             Practice real interview questions & get instant feedback
//           </p>

//           <Button asChild className="btn-primary max-sm:w-full">
//             <Link href="/interview">Start an Interview</Link>
//           </Button>
//         </div>

//         <Image
//           src="/robot2.png"
//           alt="robo-dude"
//           width={400}
//           height={400}
//           className=""
//         />
//       </section>

//       <section className="flex flex-col gap-6 mt-8">
//         <h2>Your Interviews</h2>

//         <div className="interviews-section">
//           {hasPastInterviews ? (
//             userInterviews?.map((interview) => (
//               <InterviewCard
//                 key={interview.id}
//                 userId={user?.id}
//                 interviewId={interview.id}
//                 role={interview.role}
//                 type={interview.type}
//                 techstack={interview.techstack}
//                 createdAt={interview.createdAt}
//               />
//             ))
//           ) : (
//             <p>You haven&apos;t taken any interviews yet</p>
//           )}
//         </div>
//       </section>

//       <section className="flex flex-col gap-6 mt-8">
//         <h2>Take Interviews</h2>

//         <div className="interviews-section">
//           {hasUpcomingInterviews ? (
//             allInterview?.map((interview) => (
//               <InterviewCard
//                 key={interview.id}
//                 userId={user?.id}
//                 interviewId={interview.id}
//                 role={interview.role}
//                 type={interview.type}
//                 techstack={interview.techstack}
//                 createdAt={interview.createdAt}
//               />
//             ))
//           ) : (
//             <p>There are no interviews available</p>
//           )}
//         </div>
//       </section>
//     </>
//   );
// }

// export default Home;


import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Link from "next/link"
import Image from "next/image"
import { Users, Award, Clock } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Hero />

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Why Choose MockMate?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
              Our AI-powered platform offers everything you need to prepare for your next interview.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                <Users size={24} />
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">Realistic Simulations</h3>
              <p className="mt-2 text-gray-300">
                Experience interviews that feel real with our advanced AI that adapts to your responses.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                <Award size={24} />
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">Personalized Feedback</h3>
              <p className="mt-2 text-gray-300">
                Get detailed feedback on your answers, body language, and overall performance.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                <Clock size={24} />
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">Practice Anytime</h3>
              <p className="mt-2 text-gray-300">
                Practice at your own pace, whenever and wherever you want, with 24/7 availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">What Our Users Say</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
              Join thousands of job seekers who have improved their interview skills with MockMate.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Image
                    className="h-12 w-12 rounded-full object-cover object-center"
                    src="/review1.jpg"
                    alt="User"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">Ibrahim Khan</h3>
                  <p className="text-gray-400">Software Engineer</p>
                </div>
              </div>
              <p className="mt-4 text-gray-300">
                "MockMate helped me prepare for my technical interviews at top tech companies. The AI feedback was spot
                on and helped me identify areas for improvement."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Image
                    className="h-12 w-12 rounded-full object-cover object-center"
                    src="/review2.avif"
                    alt="User"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">Michael Scott</h3>
                  <p className="text-gray-400">Product Manager</p>
                </div>
              </div>
              <p className="mt-4 text-gray-300">
                "The behavioral interview practice on MockMate was incredibly helpful. I felt much more confident going
                into my interviews after practicing with the AI."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Image
                    className="h-12 w-12 rounded-full object-cover object-left"
                    src="/review3.jpg"
                    alt="User"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">Jack Williams</h3>
                  <p className="text-gray-400">Marketing Specialist</p>
                </div>
              </div>
              <p className="mt-4 text-gray-300">
                "I landed my dream job after practicing with MockMate for just two weeks. The variety of interview
                questions and detailed feedback made all the difference."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  Ready to ace your next interview?
                  <span className="block text-indigo-200">Start practicing today.</span>
                </h2>
                <p className="mt-4 text-lg text-indigo-100">
                  Join thousands of job seekers who have improved their interview skills with MockMate.
                </p>
              </div>
              <div className="mt-8 lg:mt-0 lg:ml-8">
                <div className="rounded-md shadow">
                  <Link
                    href="/interview"
                    className="flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 transition-colors"
                  >
                    Start an Interview
                  </Link>
                </div>
                <div className="mt-3 text-center text-indigo-200 text-sm">No credit card required</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

