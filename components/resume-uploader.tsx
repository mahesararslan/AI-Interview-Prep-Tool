"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, File, X, Check, Loader2, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ResumeUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resumeId, setResumeId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      validateAndSetFile(droppedFile)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0])
    }
  }

  const validateAndSetFile = (file: File) => {
    setError(null)

    // Check file type
    const fileType = file.type
    const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]

    if (!validTypes.includes(fileType)) {
      setError("Please upload a PDF or DOCX file")
      return
    }

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB")
      return
    }

    setFile(file)
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setError(null)

    try {

      // In a real implementation, you would upload the file to your server here
      const formData = new FormData();
      formData.append('resume', file);
      const response = await fetch('/api/resume-feedback', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Failed to upload resume")
        }
        console.log("Resume feedback:", data.feedback)
        // store in the local storage
        localStorage.setItem("resumeFeedback", JSON.stringify(data.feedback))

      // Simulate a successful response
      setResumeId(data.feedback.id);
      setUploadComplete(true)
    } catch (err) {
      setError("Failed to upload resume. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const resetUpload = () => {
    setFile(null)
    setUploadComplete(false)
    setResumeId(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div id="upload-section">
      {!uploadComplete ? (
        <div className="space-y-6">
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
              isDragging
                ? "border-blue-500 bg-blue-500/10"
                : file
                  ? "border-green-500 bg-green-500/10"
                  : "border-gray-700 hover:border-gray-600"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.docx" className="hidden" />

            <div className="flex flex-col items-center justify-center py-4">
              {file ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <File size={28} className="text-green-500" />
                  </div>
                  <p className="text-lg font-medium text-white mb-1">{file.name}</p>
                  <p className="text-sm text-gray-400 mb-4">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  <div className="flex space-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        resetUpload()
                      }}
                      className="flex items-center text-sm text-red-400 hover:text-red-300"
                    >
                      <X size={16} className="mr-1" />
                      Remove
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                    <Upload size={28} className="text-blue-500" />
                  </div>
                  <p className="text-lg font-medium text-white mb-1">Drag and drop your resume here</p>
                  <p className="text-sm text-gray-400 mb-4">or click to browse files</p>
                  <p className="text-xs text-gray-500">Supports PDF, DOCX (Max 5MB)</p>
                </>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-lg">{error}</div>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors ${
              !file ? "bg-gray-700 text-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isUploading ? (
              <>
                <Loader2 size={20} className="mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload Resume"
            )}
          </button>
        </div>
      ) : (
        <div className="bg-green-900/20 border border-green-800 rounded-xl p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
            <Check size={28} className="text-green-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Upload Complete!</h3>
          <p className="text-gray-300 mb-6">
            Your resume has been uploaded successfully and is now being analyzed by our AI system.
          </p>
          <Link
            href={`/services/resume/${resumeId}`}
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            View Analysis
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      )}
    </div>
  )
}

