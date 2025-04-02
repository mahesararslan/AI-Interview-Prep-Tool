import Link from "next/link";

const Footer = () => {

    return (

        <footer className="bg-gray-950 border-t border-gray-800">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link href="" className="text-base text-gray-300 hover:text-white">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="" className="text-base text-gray-300 hover:text-white">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="" className="text-base text-gray-300 hover:text-white">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Services</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link href="" className="text-base text-gray-300 hover:text-white">
                                    Interview Prep
                                </Link>
                            </li>
                            <li>
                                <Link href="/resume" className="text-base text-gray-300 hover:text-white">
                                    Resume Review
                                </Link>
                            </li>
                            <li>
                                <Link href="/coaching" className="text-base text-gray-300 hover:text-white">
                                    Career Coaching
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Resources</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link href="" className="text-base text-gray-300 hover:text-white">
                                    Interview Tips
                                </Link>
                            </li>
                            <li>
                                <Link href="" className="text-base text-gray-300 hover:text-white">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="" className="text-base text-gray-300 hover:text-white">
                                    Support
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link href="" className="text-base text-gray-300 hover:text-white">
                                    Privacy
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className="text-base text-gray-300 hover:text-white">
                                    Terms
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-800 pt-8">
                    <p className="text-base text-gray-400 text-center">
                        &copy; {new Date().getFullYear()} MockMate. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;