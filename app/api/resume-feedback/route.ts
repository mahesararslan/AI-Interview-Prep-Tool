import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import { PdfReader } from "pdfreader"; 
import mammoth from "mammoth";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "@/firebase/admin";
import { feedbackSchema, ResumeFeedbackSchema } from "@/constants";
import { z } from "zod";


export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("resume") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        let resumeText = "";

        // Extract text from DOCX or PDF
        if (file.name.endsWith(".docx")) {
            const result = await mammoth.extractRawText({ buffer });
            resumeText = result.value || "Could not extract text.";
        } else if (file.name.endsWith(".pdf")) {
            resumeText = await extractTextFromPDF(buffer);  // Use pdf-reader function

            if (!resumeText.trim()) {
                resumeText = "Could not extract text.";
            }
        } else {
            return NextResponse.json({ error: "Unsupported file format" }, { status: 400 });
        }

        if (!resumeText.trim()) {
            return NextResponse.json({ error: "No readable text extracted from resume" }, { status: 400 });
        }

        // Generate AI-powered resume feedback
        const prompt = `You are an expert resume analyst with years of experience in HR and recruitment. I need you to analyze the resume I'm about to provide and generate detailed, actionable feedback in a specific JSON format.

Please analyze the resume for:
1. Content quality and relevance
2. ATS (Applicant Tracking System) compatibility
3. Formatting and design
4. Industry-specific optimization

Generate a comprehensive analysis in the following JSON structure:

{
  "overallScore": [0-100 score],
  "overallRating": ["excellent", "good", "needs_improvement", or "poor"],
  "summary": "A 2-3 sentence overview of the resume's strengths and weaknesses",
  
  "strengths": [
    { "text": "Specific strength 1" },
    { "text": "Specific strength 2" },
    { "text": "Specific strength 3" }
  ],
  
  "areasToImprove": [
    { "text": "Specific area to improve 1" },
    { "text": "Specific area to improve 2" },
    { "text": "Specific area to improve 3" }
  ],
  
  "atsCompatibility": {
    "score": [0-100 score],
    "feedback": "1-2 sentences about ATS compatibility"
  },
  
  "detailedAnalysis": {
    "content": {
      "rating": ["excellent", "good", "needs_improvement", or "poor"],
      "sections": [
        {
          "title": "Professional Summary",
          "rating": ["excellent", "good", "needs_improvement", or "poor"],
          "feedback": "Detailed feedback about this section",
          "suggestions": "Specific suggestions for improvement"
        },
        // Include similar objects for Work Experience, Skills, Education, etc.
      ]
    },
    
    "atsOptimization": {
      "score": [0-100 score],
      "rating": ["excellent", "good", "needs_improvement", or "poor"],
      "keywordAnalysis": [
        {
          "category": "Category name (e.g., Technical Skills)",
          "score": [0-5 score],
          "total": 5,
          "percentage": [0-100 percentage]
        },
        // Include 3-5 keyword categories
      ],
      "fileFormatFeedback": {
        "title": "File Format",
        "rating": ["excellent", "good", "needs_improvement", or "poor"],
        "feedback": "Feedback about the file format"
      },
      "formattingFeedback": {
        "title": "Formatting",
        "rating": ["excellent", "good", "needs_improvement", or "poor"],
        "feedback": "Feedback about the formatting for ATS"
      }
    },
    
    "formatting": {
      "rating": ["excellent", "good", "needs_improvement", or "poor"],
      "sections": [
        {
          "title": "Layout",
          "rating": ["excellent", "good", "needs_improvement", or "poor"],
          "feedback": "Feedback about the layout"
        },
        // Include similar objects for Typography, Consistency, Length, etc.
      ]
    }
  },
  
  "recommendations": [
    {
      "title": "Add Quantifiable Achievements",
      "description": "Detailed explanation of this recommendation",
      "example": {
        "before": "Example of current content",
        "after": "Example of improved content",
        "tips": ["Tip 1", "Tip 2", "Tip 3"]
      }
    },
    // Include 2-3 more recommendations
    {
      "title": "Optimize for ATS",
      "description": "Explanation about keyword optimization",
      "example": {
        "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
      }
    }
  ],
  
  "industryInsights": {
    "industry": "[INDUSTRY]",
    "relevantKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
    "industryTrends": "Brief insights about current industry trends relevant to the resume"
  }
}

Be specific, actionable, and constructive in your feedback. Focus on providing insights that will genuinely help the candidate improve their resume and increase their chances of landing interviews.

Here is the resume to analyze:

${resumeText}`;

        const { object } = await generateObject({
            model: google("gemini-2.0-flash-001", {
                structuredOutputs: false,
            }),
            schema: ResumeFeedbackSchema,
            prompt: prompt,
            system: "You are a professional resume reviewer analyzing a candidate's resume.",
        });

        console.log("Generated feedback:", object);
        return NextResponse.json({ feedback: object }, { status: 200 });
    } catch (error) {
        console.error("Error processing resume:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

async function extractTextFromPDF(buffer: Buffer): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const reader = new PdfReader();
        const textChunks: string[] = [];
        // @ts-ignore
        reader.parseBuffer(buffer, function (err: Error, item: any) {
            if (err) {
                reject("Error parsing PDF: " + err.message);
                return;
            }
            if (!item) return;

            // Collect the text from the pages
            if (item.text) {
                textChunks.push(item.text);
            }

            // Once the PDF parsing is done, resolve the promise with the extracted text
            if (item.page) {
                resolve(textChunks.join(" "));
            }
        });
    });
}