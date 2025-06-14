'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CourseInfo from '../_components/CourseInfo';
import ChapterTopicList from '../_components/ChapterTopicList';

function EditCourse({ viewCourse=false }) {
    const { courseId } = useParams();
    const [loading, setloading] = useState(false);
    const [course, setCourse] = useState();

    useEffect(() => {
        GetCourseInfo();
    }, [])

    const GetCourseInfo = async () => {
        setloading(true);
        try {
            const result = await axios.get(`/api/courses?courseId=${courseId}`);
            console.log(result.data);
            setCourse(result.data);
        } catch (error) {
            console.error('Error fetching course:', error);
        } finally {
            setloading(false);
        }
    }

    return (
        <div>
            <CourseInfo course={course} viewCourse={viewCourse} />
            <ChapterTopicList course={course} />
        </div>
    )
}

export default EditCourse