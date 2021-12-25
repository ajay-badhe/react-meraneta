import React, { useState } from 'react'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'

const Dashboard = () => {
    const [showMenu, setShowMenu] = useState()
    // const userInfo = JSON.parse(localStorage.getItem('login'))
    // console.log(userInfo)

    const getToggleData = (toggle) => {
        setShowMenu(toggle)
    }

    return (
        < >
            <div className={showMenu ? "toggle" : " "}>
                <Header getToggle={getToggleData} />
                <Sidebar />
                <div className="Layout">
                    <div className="w-100 p-2">
                        {/* {
                            userInfo.role === "SUPER_ADMIN" &&

                            < h3 > Super Admin Dashboard</h3>
                        }
                        {
                            userInfo.role === "SYSTEM_ADMIN" &&

                            < h3 > System Admin Dashboard</h3>
                        } */}
                    </div>
                </div>

            </div>


        </>
    )
}

export default Dashboard
