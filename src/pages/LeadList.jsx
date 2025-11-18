import React from 'react'
import Sidebar from '../components/Sidebar'
import useFetch from '../useFetch'
import { Link } from 'react-router-dom'

const LeadList = () => {
    const { data, loading, error } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/leads")
    console.log("data", data)
    return (
        <div className="container py-4">
            <div className="row">
                <h2 className="text-center mb-4">Lead List</h2>
                <Sidebar />
                <div className="col-md-8 mx-auto">
                    {loading && <p>Loading ...</p>}
                    {data?.leads?.length > 0 && <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">S.No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                                <th scope="col">Assigned Agent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.leads?.map((lead, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{lead.name}</td>
                                    <td>{lead.status}</td>
                                    <td>{lead.salesAgent.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>}
                    <hr />
                    <div className="mb-3">
                        <span>Filters: </span>
                        <span class="badge text-bg-secondary me-2">Status</span>
                        <span class="badge text-bg-secondary">Sales Agent</span>
                    </div>
                    <div className="mb-3">
                        <span>Sort by: </span>
                        <span class="badge text-bg-secondary me-2">Priority</span>
                        <span class="badge text-bg-secondary">Time to Close</span>
                    </div>
                    <Link to={"/lead/add"} className="btn btn-primary">Add New Lead</Link>
                </div>
            </div>
        </div>
    )
}

export default LeadList