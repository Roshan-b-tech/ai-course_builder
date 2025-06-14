import { Button } from '@/components/ui/button';
import { Book, LoaderCircle, PlayCircle, Settings } from 'lucide-react';
import Image from 'next/image'
import React, { useState } from 'react'
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'sonner';

const CourseCard = ({ course, refreshData }) => {
    const courseJson = course?.courseJson?.course;
    const [loading, setLoading] = useState(false);
    const onEnrollCourse = async () => {
        try {
            setLoading(true);
            const result = await axios.post('/api/enroll-course', {
                courseId: course?.cid
            })
            console.log(result);
            if (result.data?.resp === 'Already Enrolled') {
                toast.error("You are already enrolled in this course");
                setLoading(false);
            } else {
                toast.success("Course Enrolled Successfully");
                refreshData();
            }
            setLoading(false);
        } catch (e) {
            toast.error("Server Side Error")
            console.log(e);
            setLoading(false);
        }
    }
    return (
        <div className='shadow rounded-xl'>
            <Image src={course?.bannerImageUrl} alt={course?.name} width={400} height={300} className='w-full aspect-video rounded-t-xl object-cover' />

            <div className='p-3 flex flex-col gap-3'>
                <h2 className='text-l font-bold'>{courseJson?.name}</h2>
                <p className='line-clamp-3 text-gray-400 text-sm'>{courseJson?.description}</p>
                <div className='flex items-center justify-between'>
                    <h2 className='flex items-center text-sm gap-2'><Book className='text-primary h-5 w-5' /> {courseJson?.noOfChapters} Chapters</h2>
                    {course?.courseContent?.length ? <Button size={'sm'}
                        onClick={onEnrollCourse}
                        disabled={loading}
                    > {loading ? <LoaderCircle className='animate-spin' /> : <PlayCircle />} Enroll Course</Button> :
                        <Link href={'/workspace/edit-course/' + course?.cid}><Button size={'sm'} variant={'outline'} > <Settings /> Generate Course</Button></Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default CourseCard