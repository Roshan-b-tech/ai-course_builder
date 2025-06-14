import { Button } from '@/components/ui/button';
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import { CheckCircle, Loader2Icon, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useContext, useState } from 'react'
import YouTube from 'react-youtube';
import { toast } from 'sonner';
import axios from 'axios';
import { Cross } from 'lucide-react';

const ChapterContent = ({ courseInfo, refreshData }) => {
    const { courseId } = useParams();
    const course = courseInfo?.courses;
    const enrollCourse = courseInfo?.enrollCourse;
    const courseContent = courseInfo?.courses?.courseContent;
    const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext);
    const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo;
    const topics = courseContent?.[selectedChapterIndex]?.courseData?.topics;
    const completedChapter = enrollCourse?.completedChapters ?? [];
    const [loading, setLoading] = useState(false);

    const markChapterCompleted = async () => {
        setLoading(true);
        completedChapter.push(selectedChapterIndex);
        const result = await axios.put('/api/enroll-course', {
            courseId: courseId,
            completedChapter: completedChapter
        });

        console.log(result);
        refreshData();
        toast.success('Chapter marked as completed');
        setLoading(false);

    }

    const markInCompleteChapter = async () => {
        setLoading(true);
        completedChapter.push(selectedChapterIndex);
        const completeChap = completedChapter.filter(item => item != selectedChapterIndex);
        const result = await axios.put('/api/enroll-course', {
            courseId: courseId,
            completedChapter: completeChap
        });

        console.log(result);
        refreshData();
        toast.success('Chapter marked as Incompleted');
        setLoading(false);

    }


    return (
        <div className='p-10'>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0 mb-2">
                <h2 className="font-bold text-xl md:text-2xl break-words">
                    {selectedChapterIndex + 1}. {courseContent?.[selectedChapterIndex]?.courseData?.chapterName}
                </h2>
                {(!completedChapter?.includes(selectedChapterIndex)) ? (
                    <Button
                        onClick={() => markChapterCompleted()}
                        disabled={loading}
                        className="w-full md:w-auto mt-2 md:mt-0"
                    >
                        {loading ? <Loader2Icon className="animate-spin" /> : <CheckCircle />} Mark as Completed
                    </Button>
                ) : (
                    <Button
                        variant="outline"
                        onClick={markInCompleteChapter}
                        disabled={loading}
                        className="w-full md:w-auto mt-2 md:mt-0"
                    >
                        {loading ? <Loader2Icon className="animate-spin" /> : <X />} Mark Incomplete
                    </Button>
                )}
            </div>

            <h2 className='my-2 font-bold text-lg break-words'>{courseContent?.[selectedChapterIndex]?.courseData?.chapterDescription}</h2>
            <h2 className='my-2 font-bold text-lg break-words'>Related Videos 🎬</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {videoData?.map((video, index) => index < 2 && (
                    <div key={index} className="w-full aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
                        <YouTube
                            videoId={video?.videoId}
                            className="w-full h-full"
                            opts={{
                                width: '100%',
                                height: '100%',
                                playerVars: { responsive: 1 }
                            }}
                        />
                    </div>
                ))}
            </div>
            <div className='mt-10'>
                {topics?.map((topic, index) => (
                    <div key={index} className='mt-10 p-5 bg-secondary rounded-lg'>
                        <h2 className='font-bold text-2xl text-primary break-words'> {index + 1}. {topic?.topic}</h2>
                        <div
                            className="overflow-x-auto break-words"
                            dangerouslySetInnerHTML={{ __html: topic?.content }}
                            style={{ lineHeight: '2.5' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChapterContent