import React, { useContext } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';


const ChapterListSidebar = ({ courseInfo }) => {
    const course = courseInfo?.courses;
    const enrollCourse = courseInfo?.enrollCourse;
    const courseContent = courseInfo?.courses?.courseContent;
    const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext);
    const completedChapter = enrollCourse?.completedChapters ?? [];

    return (
        <div className='w-80 bg-secondary h-screen p-5'>
            <h2 className='my-3 font-bold text-xl'>Chapters ({courseContent?.length})</h2>
            <Accordion type="single" collapsible>
                {courseContent?.map((chapter, index) => (
                    <AccordionItem value={chapter?.courseData?.chapterName} key={index}
                        onClick={() => setSelectedChapterIndex(index)}>
                        <AccordionTrigger className={`text-lg font-medium px-5 ${completedChapter?.includes(index) ? 'bg-green-100 text-green-800' : ''}`}> {index + 1}. {chapter?.courseData?.chapterName}</AccordionTrigger>
                        <AccordionContent asChild>
                            <div>
                                {chapter?.courseData?.topics?.map((topic, index_) => (
                                    <h2 key={index_} className={`p-3 my-1 rounded-lg ${completedChapter?.includes(index) ? 'bg-green-100 text-green-800' : 'bg-white'}`}> {topic?.topic}</h2>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                ))}

            </Accordion>
        </div>
    )
}

export default ChapterListSidebar