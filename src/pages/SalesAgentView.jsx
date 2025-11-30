import React, { useState } from 'react'
import useFetch from '../useFetch'
import Sidebar from '../components/Sidebar'
import { useSearchParams } from 'react-router-dom'
import Select from 'react-select'

const SalesAgentView = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { data, loading, error } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/leads")
    console.log("data", data)

    const [salesAgent, setSalesAgent] = useState("")
    const [status, setStatus] = useState("")
    const [priority, setPriority] = useState("")
    const [isTimeToClose, setIsTimeToClose] = useState(false)

    console.log("salesAgent", salesAgent)
    const { data: salesAgentData } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/agents")
    // console.log(salesAgentData)

    const statusOptions = [
        { value: 'New', label: 'New' },
        { value: 'Contacted', label: 'Contacted' },
        { value: 'Qualified', label: 'Qualified' },
        { value: 'Proposal sent', label: 'Proposal sent' },
        { value: 'Closed', label: 'Closed' },
    ]

    const priorityOptions = [
        { value: 'Low', label: 'Low' },
        { value: 'Medium', label: 'Medium' },
        { value: 'High', label: 'High' }
    ]

    const salesAgentOptions = salesAgentData?.salesAgent?.map(agent => ({ value: agent._id, label: agent.name }))
    
    const handleSelectChange = (selectedOption, actionMeta) => {
        // console.log("selectedOption", selectedOption, "actionMeta", actionMeta)
        const value = selectedOption?.value
        const name = actionMeta?.name
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
        if (name === "priority") {
            setPriority(value)
            setSearchParams((searchParams) => {
                searchParams.set("priority", value)
                return searchParams
            })
        }
    }

    let filteredLeads = [...(data?.leads) || []]
    if(status) {
        filteredLeads = filteredLeads.filter(lead => lead.status === status)
    }
    if(priority) {
        filteredLeads = filteredLeads.filter(lead => lead.priority === priority)
    }
    if (salesAgent) {
        filteredLeads = filteredLeads?.filter(lead => lead.salesAgent._id === salesAgent)
    }

    if (isTimeToClose) filteredLeads?.sort((a, b) => a.timeToClose - b.timeToClose)

    return (
        <div className="container-fluid  py-4">
            <div className="row">
                <h2 className="text-center mb-4">Leads by Sales Agent</h2>
                <Sidebar />
                <div className="col-md-8 mx-auto">
                    <div className="mt-5 mb-4 d-flex align-items-center gap-3">
                        <h5 className="text-nowrap">Sales Agent: </h5>
                        <Select name="salesAgent" className="w-100" value={salesAgentOptions?.find(option => option.value === salesAgent)} options={salesAgentOptions} onChange={handleSelectChange} />
                    </div>
                    {loading && <div className="d-flex justify-content-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>}
                    {error && <p>{error}</p>}
                    {!loading && filteredLeads?.length === 0 && <p>No leads found.</p>}
                    {!loading && filteredLeads?.length > 0 &&
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
                            <Select name="status" value={statusOptions.find(option => option.value === status)} options={statusOptions} onChange={handleSelectChange} placeholder={"Status"} />
                            <Select name="priority" options={priorityOptions} value={priorityOptions.find(option => option.value === priority)} onChange={handleSelectChange} placeholder={"Priority"} />
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