import { auth, currentUser } from '@clerk/nextjs/server';
import { GoogleGenAI, } from '@google/genai';
import { db } from '@/config/db';
import { NextResponse } from 'next/server';
import { courseTable } from '@/config/schema';
import axios from 'axios';
import { eq } from 'drizzle-orm';
import FormData from "form-data";

const PROMPT = ` Generate Learning Course depends on the following details. In which Make sure to add Course Name , Description,Chapter Name, ImagePrompt(create a modern , flat-style 2D digital illustration representing 
user Topic .include UI/Ux elements such as mockup screens,text-blocks, icons,buttons,and creative workspace tools. Add symbolic elements related to user Course , like sticky notes,
design components, and visual aids, Use a vibrant color palatte (blues,purples,oranges) with a clean ,professional look, The illustraion should feel creative , tech-savvy, and educational , ideal for visualizing concepts in user courses) for course banner in 3d format , Topic under each chapters, Duration for each chapters etc , in JSON format only
Schema:
{
"course":{
    "name": "string",
    "description": "string",
    "category": "string",
    'level': "string",
     "includeVideo": "boolean",
    category: varchar()",
"noOfChapters":"number",
"chapters":[
{
"chapterName":"string",
"duration":"string",
"topic":[
"String"
],
"imagePrompt":"string (REQUIRED, a creative, descriptive prompt for an AI image generator, e.g. 'A modern, flat-style 2D illustration of a laptop with code and UI elements, in blue and orange tones, educational and tech-savvy.')"
}
]
}
}

Example chapter object:
{
  "chapterName": "Introduction to Vue.js",
  "duration": "30 min",
  "topic": ["What is Vue.js?", "Why use Vue.js?"],
  "imagePrompt": "A modern, flat-style 2D illustration of the Vue.js logo with UI elements and code snippets, in green and white, educational and creative."
}

REMEMBER: Every chapter must have a non-empty, creative imagePrompt string.
,User Input:
`

export const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,

});
export async function POST(req) {
    const { courseId, ...formData } = await req.json();
    const user = await currentUser();

    const { has } = await auth()
    const hasPremiumAccess = has({ plan: 'starter' })

    const config = {
        responseMimeType: 'text/plain',
    };

    const model = 'gemini-2.0-flash';
    const contents = [
        {
            role: 'user',
            parts: [
                {
                    text: PROMPT + JSON.stringify(formData),
                },
            ],
        },
    ];

    //if already have premium access then generate course layout

    if (!hasPremiumAccess) {
        const result = await db.select().from(courseTable).where(eq(courseTable.userEmail, user?.primaryEmailAddress?.emailAddress))

        if (result?.then >= 1) {
            return NextResponse.json({ 'resp ': 'limit exceeded' });
        }
    }

    const response = await ai.models.generateContent({
        model,
        config,
        contents,
    });

    console.log(response.candidates[0].content.parts[0].text);
    const RawResp = response?.candidates[0].content.parts[0].text
    const RawJson = RawResp.replace('```json', '').replace('```', '');

    let JSONResp;
    try {
        JSONResp = JSON.parse(RawJson);
    } catch (e) {
        console.error('JSON Parse Error:', e, RawJson);
        return NextResponse.json({ error: 'Invalid AI response', raw: RawJson }, { status: 500 });
    }

    let bannerImageUrl = null;
    // Use the first chapter's imagePrompt as an example for banner image (or adjust as needed)
    const ImagePrompt = JSONResp.course?.chapters?.[0]?.imagePrompt;
    if (ImagePrompt && typeof ImagePrompt === 'string' && ImagePrompt.trim()) {
        bannerImageUrl = await GenerateImage(ImagePrompt);
        if (!bannerImageUrl) {
            console.warn('Image generation failed or returned null.');
        }
    } else {
        console.warn('No valid image prompt found in GenAI response, skipping image generation.');
    }

    //save to database

    const result = await db.insert(courseTable).values({
        ...formData,
        courseJson: JSONResp,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        cid: courseId,
        bannerImageUrl: bannerImageUrl
    })

    return NextResponse.json({ courseId: courseId });
}

const GenerateImage = async (imagePrompt) => {
    try {
        const payload = {
            prompt: imagePrompt,
            output_format: "webp"
        };

        const response = await axios.postForm(
            "https://api.stability.ai/v2beta/stable-image/generate/core",
            axios.toFormData(payload, new FormData()),
            {
                validateStatus: undefined,
                responseType: "arraybuffer",
                headers: {
                    Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
                    Accept: "image/*"
                },
                timeout: 30000
            }
        );

        if (response.status === 200) {
            // Return base64 string for web use
            return `data:image/webp;base64,${Buffer.from(response.data).toString('base64')}`;
        } else {
            throw new Error(`${response.status}: ${response.data.toString()}`);
        }
    } catch (error) {
        console.error("Image generation failed:", error.message);
        return null;
    }
}