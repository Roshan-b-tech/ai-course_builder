import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import { Switch } from '@/components/ui/switch'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Loader2Icon, Sparkle } from 'lucide-react'
import { Description } from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


const AddNewCourseDialog = ({ children }) => {

    const [loading, setloading] = useState(false);

    const [formData, setformData] = useState({
        name: '',
        description: '',
        includeVideo: false,
        noOfChapter: 1,
        category: '',
        level: ''
    });
    const router = useRouter();

    const onHandleInputChange = (field, value) => {
        setformData(prev => ({
            ...prev,
            [field]: value
        }));
        console.log(formData);
    }

    const onGenerate = async () => {
        console.log(formData);
        const courseId = uuidv4();
        try {
            setloading(true);
            const result = await axios.post('./api/generate-course-layout', {
                ...formData,
                courseId: courseId
            });
            console.log(result.data)
            if (result.data?.resp == 'limit exceeded') {
                toast.warning('please upgrade your plan to generate more courses');
                router.push('/workspace/billing');
            }
            setloading(false);
            router.push('/workspace/edit-course/' + result.data?.courseId);
        }
        catch (e) {
            setloading(false)
            console.log(e)
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Course Using Ai</DialogTitle>
                    <DialogDescription asChild>
                        <div className='flex flex-col gap-3 mt-3'>
                            <div>
                                <label >Course Name</label>
                                <Input placeholder="Course Name" onChange={(event) => onHandleInputChange('name', event?.target.value)} />
                            </div>
                            <div>
                                <label>Course Description (Optional)</label>
                                <Textarea placeholder="Course Description"
                                    onChange={(event) => onHandleInputChange('description', event?.target.value)} />

                            </div>
                            <div>
                                <label >No of Chapters</label>
                                <Input type='number' placeholder="Number of Chapters"
                                    onChange={(event) => onHandleInputChange('noOfChapters', event?.target.value)} />
                            </div>
                            <div className='flex gap-3 items-center'>
                                <label>Include Video</label>
                                <Switch
                                    onCheckedChange={() => onHandleInputChange('includeVideo', formData?.includeVideo)} />
                            </div>
                            <div>
                                <label> Difficulty Level</label>
                                <Select onValueChange={(value) => onHandleInputChange('level', value)} className='mt-1'>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Difficulty level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="biggner">Beginner</SelectItem>
                                        <SelectItem value="intermediate">Intermediate</SelectItem>
                                        <SelectItem value="advance">Advance</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label >Category</label>
                                <Input placeholder="Category (Seperated by Comma)"
                                    onChange={(event) => onHandleInputChange('category', event?.target.value)} />
                            </div>
                            <div className='mt-5'>
                                <Button className={'w-full'} onClick={onGenerate} disable={loading}>
                                    {loading ? <Loader2Icon className='animate-spin' /> :
                                        <Sparkle />} Generate Course</Button>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AddNewCourseDialog