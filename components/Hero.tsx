import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gray-950 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-24 md:pt-32 md:pb-32">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 mt-10 md:mt-0 text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Ace Your Next Interview with <span className="text-blue-500">AI</span>
              </h1>
              <p className="mt-6 text-xl text-gray-300 max-w-2xl">
                Practice makes perfect. MockMate uses advanced AI to simulate real interview scenarios, providing
                personalized feedback to help you land your dream job.
              </p>
              <div className="mt-10">
                <Link
                  href="/interview"
                  className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  Start an Interview
                  <svg
                    className="ml-2 -mr-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]">
                <Image
                  src="/robot2.png"
                  alt="AI Interview Robot"
                  width={500}
                  height={500}
                  className="object-contain"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient background effect */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-blue-900/20 to-transparent -z-10"></div>
      <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-blue-900/10 to-transparent -z-10"></div>
    </div>
  )
}

