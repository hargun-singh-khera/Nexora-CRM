import React from 'react'
import Sidebar from '../components/Sidebar'

const LeadList = () => {
    return (
        <div className="container py-4">
            <div className="row">
                <h2 className="text-center mb-4">Lead List</h2>
                <Sidebar />
                <div className="col-md-8 mx-auto">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">S.No.</th>
                                <th scope="col">Status</th>
                                <th scope="col">Agent Assigned</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>John</td>
                                <td>Doe</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="btn btn-primary">Add New Lead</button>
                </div>
            </div>
        </div>
    )
}

export default LeadList