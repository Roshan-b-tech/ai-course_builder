import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Book, Clock, Loader2Icon, Settings, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { PlayCircle } from 'lucide-react';
import Link from 'next/link';

const CourseInfo = ({ course, viewCourse }) => {
    const courseLayout = course?.courseJson?.course;
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const GenerateCourseContent = async () => {
        setLoading(true)
        try {
            const result = await axios.post('/api/generate-course-content', {
                courseJson: courseLayout,
                courseTitle: course?.name,
                courseId: course?.cid
            });
            console.log(result.data);
            setLoading(false);
            router.replace('/workspace');
            toast.success("course generated successfully")
        } catch (e) {
            console.log(e);
            setLoading(false);
            toast.error("server side error , try again !!")

        }
    }
    return (
        <div className='md:flex justify-between p-5 shadow gap-5 rounded-2xl'>
            <div className='flex flex-col gap-3'>
                <h2 className='font-bold text-2xl'>{courseLayout?.name}</h2>
                <p className='line-clamp-2 text-gray-500' >{courseLayout?.description}</p>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    <div className='flex gap-5 items-center p-3 rounded-lg shadow'>
                        <Clock className='text-blue-500' />
                        <section>
                            <h2 className='font-bold'>Duration</h2>
                            <h2>2 Hours</h2>
                        </section>
                    </div>
                    <div className='flex gap-5 items-center p-3 rounded-lg shadow'>
                        <Book className='text-green-500' />
                        <section>
                            <h2 className='font-bold'>Chapters</h2>
                            <h2>2 Hours</h2>
                        </section>
                    </div>
                    <div className='flex gap-5 items-center p-3 rounded-lg shadow'>
                        <TrendingUp className='text-red-500' />
                        <section>
                            <h2 className='font-bold'>Difficulty-level</h2>
                            <h2>{course?.level}</h2>
                        </section>
                    </div>
                </div>
                {!viewCourse ? <Button onClick={GenerateCourseContent} disabled={loading}>
                    {loading ? <Loader2Icon className='animate-spin' /> : <Settings />}
                 Generate Course</Button>
                    :<Link href={'/course/' + course?.cid}> <Button> <PlayCircle /> Continue Learning</Button></Link>
                }
            </div>
            <Image src={course?.bannerImageUrl} alt={'banner image'}
                width={400}
                height={400}
                className='w-full h-[240px] rounded-2xl mt-5 aspect-auto md:mt-0 object-cover'
            />
        </div>
    )
}

export default CourseInfo