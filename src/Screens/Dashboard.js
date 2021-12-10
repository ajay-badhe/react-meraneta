import React, { useState } from 'react'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'

const Dashboard = () => {
    const [showMenu, setShowMenu] = useState()



    const tableHeading = ["Date", "Name", "Mobile Number", "Email", 'Priority', 'Actions']
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
                        <h3>Dashboard</h3>
                    </div>
                </div>

            </div>


        </>
    )
}

export default Dashboard
