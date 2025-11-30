import React from 'react'
import Sidebar from '../components/Sidebar'
import { Pie } from 'react-chartjs-2';

const Reports = () => {
    return (
        <div className="container-fluid  py-4">
            <div className="row">
                <h2 className="text-center mb-4">Anvaya CRM Reports</h2>
                <Sidebar />
                
            </div>
        </div>
    )
}

export default Reports