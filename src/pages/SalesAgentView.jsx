import React, { useState } from 'react'
import useFetch from '../useFetch'
import Sidebar from '../components/Sidebar'

const SalesAgentView = () => {
    const { data, loading, error } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/leads")
    console.log("data", data)

    const [salesAgent, setSalesAgent] = useState("")
    const [status, setStatus] = useState("")
    const [priority, setPriority] = useState("")
    const [isTimeToClose, setIsTimeToClose] = useState(false)

    console.log("salesAgent", salesAgent)
    const { data: salesAgentData } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/agents")
    // console.log(salesAgentData)
    
    const handleChange = (e) => {
        const { name, value } = e.target
        if(name === "salesAgent") setSalesAgent(value)
        if(name === "status") setStatus(value)
        if(name === "priority") setPriority(value)
    }

    const filteredLeads = salesAgent !== "" ? data?.leads?.filter(lead => lead.salesAgent._id === salesAgent) : status !== "" ? data?.leads?.filter(lead => lead.status === status) : priority !== "" ? data?.leads?.filter(lead => lead.priority === priority) : data?.leads
    console.log("filteredLeads", filteredLeads)

    if(isTimeToClose) filteredLeads?.sort((a, b) => a.timeToClose - b.timeToClose)
    else filteredLeads?.sort((a, b) => b.timeToClose - a.timeToClose)   

    return (
        <div className="container-fluid  py-4">
            <div className="row">
                <h2 className="text-center mb-4">Leads by Sales Agent</h2>
                <Sidebar />
                <div className="col-md-8 mx-auto">
                    <div className="mt-5 mb-4 d-flex align-items-center gap-3">
                        <h5 className="text-nowrap">Sales Agent: </h5>
                        <select name="salesAgent" value={salesAgent} onChange={handleChange} className="form-select" aria-label="Default select example">
                            <option value="" selected disabled>Open this select menu</option>
                            {salesAgentData?.salesAgent?.map((agent, index) => (
                                <option key={index} value={agent?._id}>{agent?.name}</option>
                            ))}
                        </select>
                    </div>
                    {loading && <p>Loading ...</p>}
                    {error && <p>{error}</p>}
                    {filteredLeads?.length === 0 && <p>No leads found.</p>}
                    {filteredLeads?.length > 0 &&
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">S.No.</th>
                                    <th scope="col">Source</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLeads?.map((lead, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{lead.name}</td>
                                        <td>{lead.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
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
                            <select name="priority" value={priority} onChange={handleChange} className="form-select" aria-label="Default select example">
                                <option value="" selected disabled>Priority</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-3">
                        <span>Sort by: </span>
                        <button onClick={() => setIsTimeToClose(prev => !prev)} className="btn btn-outline-success">Time to Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SalesAgentView