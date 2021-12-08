import React from 'react'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'

const Dashboard = () => {
    return (
        < >
            <Header />
            <div className="Layout">
                <Sidebar />
                <h1>DashBoard</h1>
            </div>


        </>
    )
}

export default Dashboard
