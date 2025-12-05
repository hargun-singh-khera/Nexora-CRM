import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import useFetch from '../useFetch'
import toast, { Toaster } from 'react-hot-toast'

const Settings = () => {
    const { data: leadsData, loading: leadsLoading, error: leadsError } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/leads")
    console.log("leadsData", leadsData)
    const { data: agentsData, loading: agentsLoading, error: agentsError } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/agents")
    console.log("agentsData", agentsData)


    const [leads, setLeads] = useState([])
    const [agents, setAgents] = useState([])

    useEffect(() => {
        setLeads(leadsData?.leads)
        setAgents(agentsData?.salesAgent)
    }, [leadsData, agentsData])


    console.log("leads", leads)
    console.log("agents", agents)

    const handleDeleteLead = async (leadId) => {
        try {
            const response = await fetch(`https://neo-g-backend-9d5c.vercel.app/api/leads/${leadId}`, {
                method: "DELETE"
            })
            if (!response.ok) {
                throw new Error("Failed to delete lead.")
            }
            setLeads((prevLeads) => prevLeads.filter(lead => lead._id !== leadId))
            toast.success("Lead deleted successfully")
        } catch (error) {
            console.log("Error while deleting lead")
            toast.error(error)
        }
    }

    const handleDeleteAgent = async (agentId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/agents/${agentId}`, {
                method: "DELETE"
            })
            if (!response.ok) {
                throw new Error("Failed to delete sales agent.")
            }
            setAgents((prevAgents) => prevAgents.filter(agent => agent._id !== agentId))
            toast.success("Sales agent deleted successfully")
        } catch (error) {
            console.log("Error while deleting sales agent")
            toast.error(error)
        }
    }


    return (
        <div className="container-fluid  py-4">
            <div className="row">
                <h2 className="text-center mb-4">Settings</h2>
                <Sidebar />
                <div className="col-md-10 my-4 mx-auto px-md-5">
                    <div className="row gap-5">
                        <div className="col-lg-5">
                            <h3 className="text-center">Leads</h3>
                            {leadsLoading && <div className="d-flex py-4 justify-content-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>}
                            {!leadsLoading && leads?.length === 0 && <p>No leads found.</p>}
                            {!leadsLoading && <table class="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">S.No.</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leads?.map((lead, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{lead.name}</td>
                                            <td><button onClick={() => handleDeleteLead(lead._id)} className="btn btn-danger">Delete</button></td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>}
                        </div>
                        <div className="col-lg-5">
                            <h3 className="text-center">Sales Agents</h3>
                            {agentsLoading && <div className="d-flex py-4 justify-content-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>}
                            {!agentsLoading && agents?.length === 0 && <p>No sales agent found.</p>}
                            {!agentsLoading && <table class="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">S.No.</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {agents?.map((agent, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{agent.name}</td>
                                            <td><button onClick={() => handleDeleteAgent(agent._id)} className="btn btn-danger">Delete</button></td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>}
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default Settings