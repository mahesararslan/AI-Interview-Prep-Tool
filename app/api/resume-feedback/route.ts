import { NextRequest, NextResponse } from "next/server";
import { PdfReader } from "pdfreader"; 
import mammoth from "mammoth";


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
            resumeText = result.value || "Could not extract text";
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

        if(resumeText === "Could not extract text.") {
            return NextResponse.json({ error: "Could not extract text from the resume" }, { status: 400 });
        }

        
        return NextResponse.json({ resumeText }, { status: 200 });
    } catch (error) {
        console.error("Error processing resume:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// async function extractTextFromPDF(buffer: Buffer): Promise<string> {
//     return new Promise<string>((resolve, reject) => {
//         const reader = new PdfReader();
//         const textChunks: string[] = [];
//         // @ts-ignore
//         reader.parseBuffer(buffer, function (err: Error, item: any) {
//             if (err) {
//                 reject("Error parsing PDF: " + err.message);
//                 return;
//             }
//             if (!item) return;

//             // Collect the text from the pages
//             if (item.text) {
//                 textChunks.push(item.text);
//             }

//             // Once the PDF parsing is done, resolve the promise with the extracted text
//             if (item.page) {
//                 resolve(textChunks.join(" "));
//             }
//         });
//     });
// }

async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new PdfReader();
    const textChunks: string[] = [];


    reader.parseBuffer(buffer, (err: any, item: any) => {
      if (err instanceof Error) {
        reject("Error parsing PDF: " + err.message);
      } else if (!item) {
        // No more items — we're done
        resolve(textChunks.join(" "));
      } else if (item.text) {
        textChunks.push(item.text);
      }
    });
  });
}
