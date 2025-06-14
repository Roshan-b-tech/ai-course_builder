'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import CourseCard from '../_component/CourseCard'
import { Skeleton } from '@/components/ui/skeleton'

function Explore() {

    const [courseList, setCourseList] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        user && GetCourseList();

    }, [user])

    const GetCourseList = async () => {
        const result = await axios.get('/api/courses?courseId=0');
        console.log(result.data);
        setCourseList(result.data);
    }
    return (
        <div>
            <h2 className='font-bold text-3xl mb-6'>Explore More Courses</h2>
            <div className='flex gap-5 max-w-md mb-3'>
                <Input placeholder='Search' />
                <Button><Search /> Search</Button>
            </div>


            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                {courseList?.length > 0 ? courseList?.map((course, index) => (
                    <CourseCard key={index} course={course} refreshData={GetCourseList} />
                )) :
                    [0, 1, 2, 3].map((item, index) => (
                        <Skeleton key={index} className={'w-full h-[240px]'} />
                    ))
                }
            </div>

        </div>
    )
}

export default Explore