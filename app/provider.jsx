"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { UserDetailContext } from '@/context/UserDetailContext'
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext'

const Provider = ({ children }) => {
    const { user } = useUser();
    const [userDetails, setUserDetail] = useState();
    const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
    useEffect(() => {
        user && CreateNewUser();
    }, [user])
    const CreateNewUser = async () => {
        const result = await axios.post('/api/user', {
            name: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress
        });
        console.log(result.data);
        setUserDetail(result.data);

    }
    return (
        <UserDetailContext value={{ userDetails, setUserDetail }}>
            <SelectedChapterIndexContext.Provider value={{ selectedChapterIndex, setSelectedChapterIndex }}>
                <div>{children}</div>
            </SelectedChapterIndexContext.Provider>

        </UserDetailContext>
    )
}

export default Provider