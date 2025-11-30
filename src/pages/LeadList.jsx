import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import useFetch from '../useFetch'
import { Link, useSearchParams } from 'react-router-dom'
import Select from 'react-select'

const LeadList = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    
    const { data, loading, error } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/leads")
    // console.log("data", data)

    const { data: salesAgentData } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/agents")
    console.log("salesAgentData", salesAgentData)


    const statusOptions = [
        { value: 'New', label: 'New' },
        { value: 'Contacted', label: 'Contacted' },
        { value: 'Qualified', label: 'Qualified' },
        { value: 'Proposal sent', label: 'Proposal sent' },
        { value: 'Closed', label: 'Closed' },
    ]

    const salesAgentOptions = salesAgentData?.salesAgent?.map(agent => ({ value: agent._id, label: agent.name }))

    const [status, setStatus] = useState("")
    const [salesAgent, setSalesAgent] = useState("")
    const [isPriority, setIsPriority] = useState(false)
    const [isTimeToClose, setIsTimeToClose] = useState(false)

    const handleSelectChange = (selectedOption, actionMeta) => {
        // console.log("selectedOption", selectedOption, "actionMeta", actionMeta)
        const name = actionMeta?.name
        const value = selectedOption?.value
        if (name === "status") {
            setStatus(value)
            setSearchParams((searchParams) => {
                searchParams.set("status", value)
                return searchParams
            })
        }
        if (name === "salesAgent") {
            setSalesAgent(value)
            setSearchParams((searchParams) => {
                searchParams.set("salesAgent", selectedOption?.label)
                return searchParams
            })
        }
    }

    let filteredLeads = [...(data?.leads) || []]

    if (status) {
        filteredLeads = filteredLeads?.filter(lead => lead.status === status)
    }
    if (salesAgent) {
        filteredLeads = filteredLeads?.filter(lead => lead.salesAgent._id === salesAgent)
    }
    // console.log("filteredLeads", filteredLeads)

    const priorityOrder = {
        "High": 1,
        "Medium": 2,
        "Low": 3
    }
    if (isPriority) filteredLeads?.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
    else filteredLeads?.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])

    if (isTimeToClose) filteredLeads?.sort((a, b) => a.timeToClose - b.timeToClose)

    return (
        <div className="container-fluid  py-4">
            <div className="row">
                <h2 className="text-center mb-4">Lead List</h2>
                <Sidebar />
                <div className="col-md-8 mx-auto">
                    {loading && <div className="d-flex justify-content-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>}
                    {!loading && filteredLeads?.length === 0 && <p>No leads found.</p>}
                    {!loading && filteredLeads?.length > 0 && <table className="table table-striped table-hover">
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
                            <Select name="status" options={statusOptions} value={statusOptions.find(option => option.value === status)} onChange={handleSelectChange} placeholder={"Status"} />

                            <Select name="salesAgent" options={salesAgentOptions} value={salesAgentOptions?.find(option => option.value === salesAgent)} onChange={handleSelectChange} placeholder={"Sales Agent"} />
                        </div>
                    </div>
                    <div className="d-flex gap-3 align-items-center mb-3">
                        <p className="m-0">Sort by: </p>

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