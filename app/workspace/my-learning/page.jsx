import React from 'react'
import WelcomeBanner from '../_component/WelcomeBanner'
import EnrollCourseList from '../_component/EnrollCourseList'

const MyLearning = () => {
    return (
        <div>
            <WelcomeBanner />
            <h2 className='font-bold text-3xl mt-5'>My Learning</h2>
            <EnrollCourseList />
        </div>
    )
}

export default MyLearning