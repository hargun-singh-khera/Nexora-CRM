import React from 'react'
import useFetch from '../useFetch'

const Dashboard = () => {
  const { data, loading, error } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/leads")
  const newLeads = data?.leads?.filter(lead => lead.status === "New")
  const contactedLeads = data?.leads?.filter(lead => lead.status === "Contacted")
  const qualifiedLeads = data?.leads?.filter(lead => lead.status === "Qualified")
  console.log("data", data)
  return (
    <div className="container pt-3">
      <div className="row">
        <h2 className="text-center mb-4">Anvaya CRM Dashboard</h2>
        <div className="col-md-2">
          <div className="list-group">
            <a href="#" className="list-group-item" aria-current="true">Dashboard</a>
            <a href="#" className="list-group-item">Leads</a>
            <a href="#" className="list-group-item">Sales</a>
            <a href="#" className="list-group-item">Agents</a>
            <a href="#" className="list-group-item">Reports</a>
            <a href="#" className="list-group-item">Settings</a>
          </div>
        </div>
        <div className="col-md-8 py-5 py-md-0 d-flex flex-column">
          <div className="row">
            {loading && <p>Loading...</p>}
            {data?.leads?.map(lead => (
              <div key={lead._id} className="col-md-6 mb-3">
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
              </div>
            ))}
          </div>
          <hr />
          <div>
            {loading && <p>Loading...</p>}
            {data?.leads.length > 0 && <div className="row">
              <div className="col">
                <div className="card bg-light border-0 p-1 shadow-sm rounded-4">
                  <div className="card-body">
                    <div className="card-title">
                      <h6>New Leads</h6>
                    </div>
                    <div className="card-text">
                      <h1>{newLeads?.length}</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card bg-light border-0 p-1 shadow-sm rounded-4">
                  <div className="card-body">
                    <div className="card-title">
                      <h6>Contacted Leads</h6>
                    </div>
                    <div className="card-text">
                      <h1>{contactedLeads?.length}</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card bg-light border-0 p-1 shadow-sm rounded-4">
                  <div className="card-body">
                    <div className="card-title">
                      <h6>Qualified Leads</h6>
                    </div>
                    <div className="card-text">
                      <h1>{qualifiedLeads?.length}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
          </div>
          <hr />
          <div className="d-flex mb-3 gap-2">
            <h4>Quick Filters: </h4>
            <button className="btn btn-secondary">New</button>
            <button className="btn btn-secondary">Contact</button>
          </div>
          <div>
            <button className="btn btn-primary">Add New Lead</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard