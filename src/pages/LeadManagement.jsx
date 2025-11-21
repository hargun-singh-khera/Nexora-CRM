import React from 'react'
import Sidebar from '../components/Sidebar'
import { Link } from 'react-router-dom'

const LeadManagement = () => {
  return (
    <div className="container-fluid py-4">
      <div className="row">
        <h2 className="text-center mb-4">Lead Management</h2>
        <Sidebar />
        <div className="col-md-8 mx-auto">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Field</th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Lead Name</th>
                <td>Mark</td>
              </tr>
              <tr>
                <th scope="row">Sales Agent</th>
                <td>Mark</td>
              </tr>
              <tr>
                <th scope="row">Lead Source</th>
                <td>Mark</td>
              </tr>
              <tr>
                <th scope="row">Lead Status</th>
                <td>Mark</td>
              </tr>
              <tr>
                <th scope="row">Priority</th>
                <td>Mark</td>
              </tr>
              <tr>
                <th scope="row">Time to Close</th>
                <td>Mark</td>
              </tr>
            </tbody>
          </table>
          <Link to={"/lead/add"} className="btn btn-primary">Edit Lead Details</Link>
          <hr />
          <div>
            <h4 className="text-center mb-4">Comments Section</h4>
            <div className="card">
              <div className="card-body bg-danger">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeadManagement