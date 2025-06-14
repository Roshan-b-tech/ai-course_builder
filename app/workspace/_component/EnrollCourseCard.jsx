import React from 'react'
import Image from 'next/image'
import { Book, LoaderCircle, PlayCircle, Settings } from 'lucide-react';
import { Progress } from "@/components/ui/progress"
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const EnrollCourseCard = ({ course, enrollCourse }) => {
    console.log('Full course object:', course);
    console.log('Banner URL:', course?.bannerImageUrl);
    const courseJson = course?.courseJson?.course;

    const CalculatePerProgress = () => {
        const completed = enrollCourse?.completedChapters?.length ?? 0;
        const total = course?.courseContent?.length ?? 1;
        return Math.round((completed / total) * 100);
    }
    return (
        <div className='shadow rounded-xl'>
            <Image
                src={course?.bannerImageUrl}
                alt={course?.name || 'Course image'}
                width={400}
                height={300}
                className='w-full aspect-video rounded-t-xl object-cover'
            />
            <div className='p-3 flex flex-col gap-3'>
                <h2 className='text-l font-bold'>{courseJson?.name}</h2>
                <p className='line-clamp-3 text-gray-400 text-sm'>{courseJson?.description}</p>
                <div className=''>
                    <h2 className='flex justify-between text-sm text-primary'>progress <span>{CalculatePerProgress()}%</span> </h2>
                    <Progress value={CalculatePerProgress()} />

                    <Link href={'/workspace/view-course/' + course?.cid}>
                        <Button className={'w-full mt-3'}> <PlayCircle /> Continue Learning..</Button></Link>


                    {/* <h2 className='flex items-center text-sm gap-2'><Book className='text-primary h-5 w-5' /> {courseJson?.noOfChapters} Chapters</h2> */}
                </div>
            </div>
        </div>
    )
}

export default EnrollCourseCard