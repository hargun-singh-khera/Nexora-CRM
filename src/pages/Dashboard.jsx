import React, { useState } from 'react'
import useFetch from '../useFetch'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const { data, loading, error } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/leads")
  const newLeads = data?.leads?.filter(lead => lead.status === "New")
  const contactedLeads = data?.leads?.filter(lead => lead.status === "Contacted")
  const qualifiedLeads = data?.leads?.filter(lead => lead.status === "Qualified")
  const [status, setStatus] = useState("")
  // console.log("data", data)
  const filteredLeads = status === "" ? data?.leads : data?.leads?.filter(lead => lead.status === status)
  // console.log("filteredLeads", filteredLeads)
  return (
    <div className="container-fluid pt-3">
      <div className="row">
        <h2 className="text-center mb-4">Anvaya CRM Dashboard</h2>
        <div className="col-md-2">
          <div className="list-group">
            <Link to={"/"} className="list-group-item" aria-current="true">Dashboard</Link>
            <Link to={"/leads"} className="list-group-item">Leads</Link>
            <Link to={"/"} className="list-group-item">Sales</Link>
            <Link to={"/sales-agent"} className="list-group-item">Agents</Link>
            <Link to={"/lead/reports"} className="list-group-item">Reports</Link>
            <Link to={"/"} className="list-group-item">Settings</Link>
          </div>
        </div>
        <div className="col-md-10 px-md-5 py-5 py-md-0 d-flex flex-column">
          <div className="row">
            {loading && <div className="d-flex py-4 justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>}
            {filteredLeads?.length === 0 && <p>No leads found.</p>}
            {filteredLeads?.map(lead => (
              <Link to={`/lead/list/${lead._id}`} key={lead._id} className="col-md-4 mb-3 text-decoration-none hover-cursor-pointer">
                <div className="card border-0 shadow-sm p-2 rounded-4">
                  <div className="card-body">
                    <div className="card-title">
                      <h4>{lead.name}</h4>
                    </div>
                    <div className="card-text">
                      <div className="mb-2">
                        <span className={`badge ${lead.priority === "Low" ? "text-bg-success" : lead.priority === "Medium" ? "text-bg-warning text-white" : "text-bg-danger"}  me-2`}>{lead.priority}</span>
                        <span className="badge text-bg-secondary me-2">{lead.status}</span>
                      </div>
                      <p className="m-0 small text-muted">Source: {lead.source}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <hr />
          <div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <div className="card bg-light border-0 p-1 shadow-sm rounded-4">
                  <div className="card-body">
                    <div className="card-title">
                      <h6>New Leads</h6>
                    </div>
                    <div className="card-text">
                      <h1>{newLeads?.length || 0}</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card bg-light border-0 p-1 shadow-sm rounded-4">
                  <div className="card-body">
                    <div className="card-title">
                      <h6>Contacted Leads</h6>
                    </div>
                    <div className="card-text">
                      <h1>{contactedLeads?.length || 0}</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card bg-light border-0 p-1 shadow-sm rounded-4">
                  <div className="card-body">
                    <div className="card-title">
                      <h6>Qualified Leads</h6>
                    </div>
                    <div className="card-text">
                      <h1>{qualifiedLeads?.length || 0}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          {/* <div className="mb-3">
            <span>Quick Filters: </span>
            <span onClick={() => setStatus("New")} class="badge text-bg-secondary me-2">New</span>
            <span onClick={() => setStatus("Contacted")} class="badge text-bg-secondary">Contacted</span>
          </div> */}
          <div className="d-flex gap-3 align-items-center mb-3">
            <p className="m-0">Quick Filter: </p>
            <div className="d-flex gap-4">
              <select name="status" value={status} onChange={(e) => setStatus(e.target.value)} className="form-select" aria-label="Default select example">
                <option defaultValue="" disabled>Status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal sent">Proposal sent</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
          <div>
            <Link to={"/lead/add"} className="btn btn-primary">Add New Lead</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard