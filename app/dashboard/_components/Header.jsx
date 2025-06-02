import { UserButton } from '@clerk/nextjs'

function Header() {
    return (
        <div className='flex p-5 shadow-md justify-end'>
            
            <UserButton />
        </div>
    )
}

export default Header
