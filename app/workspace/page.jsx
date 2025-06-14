

import React from 'react'
import WelcomeBanner from './_component/WelcomeBanner'
import CourseList from './_component/CourseList'
import EnrollCourseList from './_component/EnrollCourseList'

const Workspace = () => {
    return (
        <div>
            <WelcomeBanner />
            <EnrollCourseList />
            <CourseList />
        </div>
    )
}

export default Workspace