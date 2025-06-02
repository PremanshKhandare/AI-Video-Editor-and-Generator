"use client"
import { UserDetailContext } from "@/app/_context/UserDetailContext"
import { Progress } from "@/components/ui/progress"
import { CoinsIcon, Grid2X2, UserCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useContext } from "react"
import CreateButton from "./CreateButton"

function SideBar() {
    const menuOption = [
        {
            name: 'Dashboard',
            icon: Grid2X2,
            path: '/dashboard'
        },
        {
            name: 'Buy Credits',
            icon: CoinsIcon,
            path: '/buy-credits'
        },
        {
            name: 'profile',
            icon: UserCircle,
            path: '/dashboard/profile'
        },
    ]

    const { userDetail, setUserDetail } = useContext(UserDetailContext);

    const path = usePathname();

    return (
        <div className='w-64 fixed h-screen shadow-md p-5'>
            <div className='flex gap-2 items-center'>
                <Image src={'/logo.png'} alt='logo' width={40} height={40} />
                <h2 className='font-medium text-lg'>Viral Video Maker</h2>
            </div>

            <ul className='mt-10'>
                <CreateButton />
                {menuOption.map((item, index) => (
                    <Link href={item.path} key={index}>
                        <li 
                            className={`flex gap-2 items-center p-3 mt-2 hover:bg-slate-200 rounded-lg text-gray-500 hover:text-black cursor-pointer ${path == item.path && 'bg-primary text-white'}`}>
                            <item.icon />
                            {item.name}</li>
                    </Link>
                ))}
            </ul>

            <div className='p-3 border rounded-lg text-sm absolute bottom-10 w-[85%]'>
                <h2 className='font-bold'>Total Usage</h2>
                <Progress value={userDetail.credits * 10} />
                <h2 className='text-xs text-gray-500'>{10 - userDetail?.credits} Min Used out of 10 Min</h2>
            </div>
        </div>
    )
}

export default SideBar
