import React from 'react'
import Sidebar from '../components/Sidebar'
import useFetch from '../useFetch'
import { Link } from 'react-router-dom'

const SalesAgentManagement = () => {
    const { data, loading, error } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/agents")
    console.log("data", data)
    return (
        <div className="container py-4">
            <div className="row">
                <h2 className="text-center mb-4">Sales Agent Management</h2>
                <Sidebar />
                <div className="col-md-8 mx-auto">
                    {loading && <p>Loading...</p>}
                    {data?.salesAgent?.length > 0 && <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">S.No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.salesAgent?.map((agent, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{agent.name}</td>
                                    <td>{agent.email}</td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>}
                    <Link to={"/sales-agent/add"} className="btn btn-primary">Add New Sales Agent</Link>
                </div>
            </div>
        </div>
    )
}

export default SalesAgentManagement