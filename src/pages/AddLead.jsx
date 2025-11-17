import React from 'react'

const AddLead = () => {
  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <h2 className="mb-4 text-center">Add New Lead</h2>
          <div className="card px-4 py-5 shadow-sm rounded-sm">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Lead Name</label>
              <input type="text" className="form-control" id="name" placeholder="Name of customer or company" />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Lead Source</label>
              <select className="form-select" aria-label="Default select example">
                <option value="1" selected>Website</option>
                <option value="2">Referral</option>
                <option value="3">Cold Call</option>
                <option value="2">Advertisement</option>
                <option value="2">Email</option>
                <option value="2">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Sales Agent</label>
              <select className="form-select" aria-label="Default select example">
                <option value="1" selected>Website</option>
                <option value="2">Referral</option>
                <option value="3">Cold Call</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Lead Status</label>
              <select className="form-select" aria-label="Default select example">
                <option value="1" selected>New</option>
                <option value="2">Contacted</option>
                <option value="2">Qualified</option>
                <option value="2">Proposal sent</option>
                <option value="3">Closed</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Priority</label>
              <select className="form-select" aria-label="Default select example">
                <option value="1" selected>High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Time to Close</label>
              <input type="text" className="form-control" id="name" placeholder="Number of days" />
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="form-label">Tags</label>
              <select className="form-select" multiple aria-label="Multiple select example">
                <option value="1" selected>High Value</option>
                <option value="2">Follow up</option>
                <option value="3">Three</option>
              </select>
            </div>
            <button type="button" className="btn btn-primary">Add Lead</button>
          </div>
         </div>
       </div>
    </div>
  )
}

export default AddLead