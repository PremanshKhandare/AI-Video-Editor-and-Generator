import Header from "./_components/Header"
import SideBar from "./_components/SideBar"

function DashboardLayout({ children }) {
    return (
        <div>
            <div className='hidden md:flex md:w-64'>
                <SideBar />
            </div>
            <div className='md:ml-64'>
                <Header />
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout
