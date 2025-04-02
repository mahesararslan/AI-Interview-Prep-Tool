// import dayjs from "dayjs";
// import Link from "next/link";
// import Image from "next/image";

// import { Button } from "./ui/button";
// import DisplayTechIcons from "./DisplayTechIcons";

// import { cn, getRandomInterviewCover } from "@/lib/utils";
// import { getFeedbackByInterviewId } from "@/lib/actions/general.action";

// const InterviewCard = async ({
//   interviewId,
//   userId,
//   role,
//   type,
//   techstack,
//   createdAt,
// }: InterviewCardProps) => {
//   const feedback =
//     userId && interviewId
//       ? await getFeedbackByInterviewId({
//           interviewId,
//           userId,
//         })
//       : null;

//   const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

//   const badgeColor =
//     {
//       Behavioral: "bg-light-400",
//       Mixed: "bg-light-600",
//       Technical: "bg-light-800",
//     }[normalizedType] || "bg-light-600";

//   const formattedDate = dayjs(
//     feedback?.createdAt || createdAt || Date.now()
//   ).format("MMM D, YYYY");

//   return (
//     <div className="card-border w-[360px] max-sm:w-full min-h-96">
//       <div className="card-interview">
//         <div>
//           {/* Type Badge */}
//           <div
//             className={cn(
//               "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg",
//               badgeColor
//             )}
//           >
//             <p className="badge-text ">{normalizedType}</p>
//           </div>

//           {/* Cover Image */}
//           <Image
//             src={getRandomInterviewCover()}
//             alt="cover-image"
//             width={90}
//             height={90}
//             className="rounded-full object-fit size-[90px]"
//           />

//           {/* Interview Role */}
//           <h3 className="mt-5 capitalize">{role} Interview</h3>

//           {/* Date & Score */}
//           <div className="flex flex-row gap-5 mt-3">
//             <div className="flex flex-row gap-2">
//               <Image
//                 src="/calendar.svg"
//                 width={22}
//                 height={22}
//                 alt="calendar"
//               />
//               <p>{formattedDate}</p>
//             </div>

//             <div className="flex flex-row gap-2 items-center">
//               <Image src="/star.svg" width={22} height={22} alt="star" />
//               <p>{feedback?.totalScore || "---"}/100</p>
//             </div>
//           </div>

//           {/* Feedback or Placeholder Text */}
//           <p className="line-clamp-2 mt-5">
//             {feedback?.finalAssessment ||
//               "You haven't taken this interview yet. Take it now to improve your skills."}
//           </p>
//         </div>

//         <div className="flex flex-row justify-between">
//           <DisplayTechIcons techStack={techstack} />

//           <Button className="btn-primary">
//             <Link
//               href={
//                 feedback
//                   ? `/interview/${interviewId}/feedback`
//                   : `/interview/${interviewId}`
//               }
//             >
//               {feedback ? "Check Feedback" : "View Interview"}
//             </Link>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InterviewCard;


"use client"

import Link from "next/link"
import { useState } from "react"
import { Calendar, Clock, Briefcase, Code, CheckCircle, ArrowRight } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface InterviewCardProps {
  userId?: string
  interviewId: string
  role: string
  type: string
  techstack: string[]
  createdAt: string
  feedback?: boolean
}

const InterviewCard = ({ userId, interviewId, role, type, techstack, createdAt, feedback }: InterviewCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true })

  // Determine if this is a past interview or an upcoming one
  const isPastInterview = feedback !== undefined

  return (
    <Link href={feedback ? `/interview/${interviewId}/feedback` : `/interview/${interviewId}`} className="block">
      <div
        className={`bg-gray-800 rounded-xl p-6 border border-gray-700 transition-all duration-300 ${
          isHovered ? "shadow-lg shadow-blue-900/20 border-blue-600/30 transform -translate-y-1" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">{role}</h3>
            <div className="flex items-center text-gray-400 text-sm mb-4">
              <Calendar size={14} className="mr-1" />
              <span>{formattedDate}</span>
              <span className="mx-2">•</span>
              <Clock size={14} className="mr-1" />
              <span>30 min</span>
            </div>
          </div>

          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              type.toLowerCase() === "technical"
                ? "bg-blue-900/30 text-blue-400"
                : type.toLowerCase() === "behavioral"
                  ? "bg-purple-900/30 text-purple-400"
                  : "bg-green-900/30 text-green-400"
            }`}
          >
            {type}
          </div>
        </div>

        <div className="flex items-center mb-4">
          <Briefcase size={16} className="text-gray-400 mr-2" />
          <span className="text-gray-300">{role}</span>
        </div>

        {techstack && techstack.length > 0 && (
          <div className="flex items-center mb-6">
            <Code size={16} className="text-gray-400 mr-2" />
            <div className="flex flex-wrap gap-2">
              {techstack.map((tech, index) => (
                <span key={index} className="px-2 py-1 bg-gray-700 rounded-md text-xs text-gray-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-2">
          <div className={`flex items-center ${isPastInterview ? "text-blue-500" : "text-green-500"}`}>
            {isPastInterview ? (
              <>
                <CheckCircle size={16} className="mr-1" />
                <span className="text-sm font-medium">View Feedback</span>
              </>
            ) : (
              <>
                <span className="text-sm font-medium">Take Interview</span>
              </>
            )}
          </div>

          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isHovered ? (isPastInterview ? "bg-blue-600" : "bg-green-600") : "bg-gray-700"
            }`}
          >
            <ArrowRight size={16} className="text-white" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default InterviewCard

