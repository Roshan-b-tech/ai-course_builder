import { SignUp } from '@clerk/nextjs'
import { Divide } from 'lucide-react'

export default function Page() {
    return (
        <div className='flex items-center justify-center h-screen'>
            <SignUp />
        </div>
    )
}