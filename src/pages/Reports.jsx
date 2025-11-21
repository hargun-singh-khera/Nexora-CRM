import React from 'react'
import Sidebar from '../components/Sidebar'

const Reports = () => {
    return (
        <div className="container-fluid  py-4">
            <div className="row">
                <h2 className="text-center mb-4">Anvaya CRM Reports</h2>
                <Sidebar />
                <div className="col-md-8 mx-auto">
                    <div>
                        <canvas id="myChart"></canvas>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Reports