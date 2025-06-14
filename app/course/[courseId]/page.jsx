'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AppHeader from '@/app/workspace/_component/AppHeader'
import ChapterListSidebar from '../_component/ChapterListSidebar'
import ChapterContent from '../_component/ChapterContent'
import { useParams } from 'next/navigation'

function Course() {
    const { courseId } = useParams();
    const [courseInfo, setCourseInfo] = useState();
    useEffect(() => {
        GetEnrolledCourseById();
    }, [])
    const GetEnrolledCourseById = async () => {
        try {
            const result = await axios.get('/api/enroll-course?courseId=' + courseId);
            console.log('API Response:', result.data);
            setCourseInfo(result.data);
        } catch (error) {
            console.error('Error fetching course:', error);
        }
    }
    return (
        <div className='relative h-screen w-screen'>
            {/* Fixed Header */}
            <div className='fixed top-0 left-0 w-full z-50 h-16 shadow-md bg-white'>
                <AppHeader hideSidebar={true} />
            </div>
            {/* Fixed Sidebar */}
            <div className='fixed top-16 left-0 h-[calc(100vh-4rem)] w-80 z-20 border-r bg-secondary'>
                <ChapterListSidebar courseInfo={courseInfo} />
            </div>
            {/* Scrollable Content */}
            <div className='ml-80 pt-16 h-[calc(100vh-4rem)] overflow-y-auto bg-background'>
                <ChapterContent courseInfo={courseInfo} refreshData={ GetEnrolledCourseById} />
            </div>
        </div>
    )
}

export default Course