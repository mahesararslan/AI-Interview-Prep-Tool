import {generateText} from "ai";
 import {google} from "@ai-sdk/google";
 import {getRandomInterviewCover} from "@/lib/utils";
 import {db} from "@/firebase/admin";
 
 export async function GET() {
     return Response.json({ success: true, data: 'THANK YOU!'}, { status: 200 });
 }
 