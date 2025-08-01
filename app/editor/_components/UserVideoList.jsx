import { DownloadIcon, Edit, Trash } from "lucide-react"
import Link from "next/link"

function UserVideoList({ videoList }) {
    return (
        <div className='mt-5'>
            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {videoList.map((video, index) => (
                    <div key={index}>
                        <Link href={'/editor/' + video?.videoId}>
                            <div className='w-full h-[170px] flex items-center justify-center 
                        rounded-xl border relative group'
                                style={{
                                    background: video?.videoData.frameList[0].bgColor ?? '#000'
                                }}>
                                <h2 style={{
                                    color: video?.videoData.frameList[0].textColor ?? '#fff'
                                }}>{video?.videoData.frameList[0].text ?? 'Hello World!'}</h2>


                                <div className='absolute top-0 w-full h-full 
                            opacity-0 group-hover:opacity-45 flex items-center justify-center 
                            bg-black rounded-xl cursor-pointer'>
                                    <Edit />
                                </div>
                            </div>
                        </Link>

                        <div className='flex gap-5 mt-2 items-center justify-end'>
                            <Link href={'/editor/' + video?.videoId}>
                                <Edit className='h-4 w-4 cursor-pointer' />
                            </Link>
                            <DownloadIcon className='h-4 w-4 cursor-pointer' />
                            <Trash className='h-4 w-4 cursor-pointer' />
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserVideoList
