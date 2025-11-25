import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import useFetch from '../useFetch'
import { Link } from 'react-router-dom'

const LeadList = () => {
    const { data, loading, error } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/leads")
    console.log("data", data)

    const { data: salesAgentData } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/agents")
    console.log(salesAgentData)

    const [status, setStatus] = useState("")
    const [salesAgent, setSalesAgent] = useState("")
    const [priority, setPriority] = useState("")
    const [isPriority, setIsPriority] = useState(false)
    const [isTimeToClose, setIsTimeToClose] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        if(name === "status") setStatus(value)
        if(name === "priority") setPriority(value)
        if(name === "salesAgent") setSalesAgent(value) 
    }
    console.log("priority", priority)
    console.log("isTimeToClose", isTimeToClose)
    // console.log("salesAgent", salesAgent)
    const filteredLeads = status !== "" ? data?.leads?.filter(lead => lead.status === status) : salesAgent !== "" ? data?.leads?.filter(lead => lead.salesAgent._id === salesAgent) : data?.leads
    const priorityOrder = {
        "High": 1,
        // "Medium": 2,
        // "Low": 3
    }
    if(isPriority) filteredLeads?.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
    console.log("filteredLeads", filteredLeads) 
    if(isTimeToClose) filteredLeads?.sort((a, b) => a.timeToClose - b.timeToClose)
    else filteredLeads?.sort((a, b) => b.timeToClose - a.timeToClose)   

    return (
        <div className="container-fluid  py-4">
            <div className="row">
                <h2 className="text-center mb-4">Lead List</h2>
                <Sidebar />
                <div className="col-md-8 mx-auto">
                    {loading && <p>Loading ...</p>}
                    {filteredLeads?.length === 0 && <p>No leads found.</p>}
                    {filteredLeads?.length > 0 && <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">S.No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                                <th scope="col">Sales Agent</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLeads?.map((lead, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{lead.name}</td>
                                    <td>{lead.status}</td>
                                    <td>{lead.salesAgent.name}</td>
                                    <td>
                                        <Link to={`/lead/list/${lead._id}`} className="btn btn-primary btn-sm">View</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>}
                    <hr />
                    <div className="d-flex gap-3 align-items-center mb-3">
                        <p className="m-0">Filters: </p>
                        <div className="d-flex gap-4">
                            <select name="status" value={status} onChange={handleChange} className="form-select" aria-label="Default select example">
                                <option value="" selected disabled>Status</option>
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Qualified">Qualified</option>
                                <option value="Proposal sent">Proposal sent</option>
                                <option value="Closed">Closed</option>
                            </select>
                            <select name="salesAgent" value={salesAgent} onChange={handleChange} className="form-select" aria-label="Default select example">
                                <option value="" selected disabled>Sales Agent</option>
                                {salesAgentData?.salesAgent?.map((agent, index) => 
                                    <option key={index} value={agent._id}>{agent.name}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="d-flex gap-3 align-items-center mb-3">
                        <p className="m-0">Sort by: </p>
                        {/* <div className="d-flex gap-4">
                            <select name="priority" value={priority} onChange={handleChange} className="form-select" aria-label="Default select example">
                                <option value="" selected disabled>Priority</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div> */}
                        <button onClick={() => setIsPriority(prev => !prev)} className="btn btn-outline-success">Priority</button>
                        <button onClick={() => setIsTimeToClose(prev => !prev)} className="btn btn-outline-success">Time to Close</button>
                    </div>
                    <Link to={"/lead/add"} className="btn btn-primary">Add New Lead</Link>
                </div>
            </div>
        </div>
    )
}

export default LeadList