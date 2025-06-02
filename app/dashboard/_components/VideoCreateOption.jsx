import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import uuid4 from 'uuid4';

function VideoCreateOption() {

    const {user}=useUser();
    const router=useRouter();

    const CreateNewScratchVideo=async()=>{
        const videoId=uuid4();

        const result=await axios.post('/api/video',{
            videoId:videoId,
            userEmail:user?.primaryEmailAddress?.emailAddress
        });

        console.log(result);
        router.push('/editor/'+videoId)
    }

    return (
        <div className='p-5 rounded-lg border mt-10'>
            <h2 className='font-bold text-2xl text-center'>Let's create your first video!</h2>
            <div className='flex gap-5 items-center justify-center mt-5'>
                <Link href={'/create-ai-video'}>
                    <div className='border rounded-lg p-4 w-full hover:bg-gray-100 cursor-pointer'>
                        <Image src={'/magic-wand.png'} alt='magic-wand' width={40} height={40} />
                        <h2 className='text-lg'>Generate with AI</h2>
                    </div>
                </Link>
                <div onClick={CreateNewScratchVideo}>
                    <div className='border rounded-lg p-4 w-full hover:bg-gray-100 cursor-pointer'>
                        <Image src={'/video-editing.png'} alt='magic-wand' width={40} height={40} />
                        <h2 className='text-lg'>Create from scratch</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoCreateOption
