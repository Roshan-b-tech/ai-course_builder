import { NextResponse } from "next/server";
import { ai } from "../generate-course-layout/route";
import axios from "axios";
import { db } from "@/config/db";
import { courseTable } from "@/config/schema";
import { eq } from "drizzle-orm";


const PROMPT = `Depends on Chapter name and Topic Generate content for each topic in HTML and give response in JSON format.
Schema:{
chapterName:<>,{
topoic:<>,
content:<>
}
}
:User Input:
`

export async function POST(req) {
    const { courseJson, courseTitle, courseId } = await req.json();

    const promises = courseJson?.chapters?.map(async (chapter) => {
        const config = {
            responseMimeType: 'text/plain',
        };

        const model = 'gemini-2.0-flash';
        const contents = [
            {
                role: 'user',
                parts: [
                    {
                        text: PROMPT + JSON.stringify(chapter),
                    },
                ],
            },
        ];

        const response = await ai.models.generateContent({
            model,
            config,
            contents,
        });
        console.log(response.candidates[0].content.parts[0].text);
        const RawResp = response?.candidates[0].content.parts[0].text;
        const RawJson = RawResp.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        let JSONResp = null;
        try {
            // Try to parse the JSON
            JSONResp = JSON.parse(RawJson);
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            console.error('Raw JSON:', RawJson);
            // Fallback object to avoid crashing and to make error visible
            JSONResp = { error: 'Invalid JSON from AI', raw: RawJson };
        }

        const youtubeData = await GetYoutubeVideo(chapter?.chapterName)
        return {
            youtubeVideo: youtubeData,
            courseData: JSONResp
        }
    });

    const CourseContent = await Promise.all(promises);

    // Save to db
    try {
        await db.update(courseTable)
            .set({
                courseContent: CourseContent
            })
            .where(eq(courseTable.cid, courseId));
    } catch (error) {
        console.error('Error saving to database:', error);
        return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
    }

    return NextResponse.json({
        courseName: courseTitle,
        CourseContent: CourseContent
    });
}

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search'
const GetYoutubeVideo = async (topic) => {
    const params = {
        part: "snippet",
        q: topic,
        maxResult: 4,
        type: 'video',
        key: process.env.YOUTUBE_API_KEY
    }
    const resp = await axios.get(YOUTUBE_BASE_URL, { params });

    const youtubeVideoListResp = resp.data.items;
    const youtubeVideoList = [];
    youtubeVideoListResp.forEach(item => {
        const data = {
            videoId: item.id?.videoId,
            title: item?.snippet?.title
        }
        youtubeVideoList.push(data);
    })
    console.log("youtubeVideoList :", youtubeVideoList)
    return youtubeVideoList;

}
