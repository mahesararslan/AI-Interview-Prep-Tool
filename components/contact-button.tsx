"use client"

import type React from "react"

import { useState } from "react"
import { Send, X, Mail, Phone } from "lucide-react"

export default function ContactButton() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const handleSendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsPopupOpen(true)
  }

  const closePopup = () => {
    setIsPopupOpen(false)
  }

  return (
    <>
      <button
        type="button"
        onClick={handleSendMessage}
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors w-full justify-center"
      >
        <Send size={18} className="mr-2" />
        Send Message
      </button>

      {/* Popup/Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 relative animate-fadeIn">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              aria-label="Close popup"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send size={24} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Feature Not Available</h3>
              <p className="text-gray-300">
                The contact form is not functional yet. Please use the following contact methods to reach out to us:
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center p-3 bg-gray-700 rounded-lg">
                <Mail size={20} className="text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white">mahesararslan1998@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-700 rounded-lg">
                <Phone size={20} className="text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-white">+92 3202705737</p>
                </div>
              </div>
            </div>

            <button
              onClick={closePopup}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  )
}

