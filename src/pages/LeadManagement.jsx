import React from 'react'
import Sidebar from '../components/Sidebar'
import { Link } from 'react-router-dom'
import useFetch from '../useFetch'

const LeadManagement = () => {
  const { data, loading, error } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/lead/69233a9fefd734b53aef55bf")
  console.log("data", data)
  const lead = data?.lead
  console.log("lead", lead)

  const { data: leadComments, loading: commentLoading, error: commentError } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/leads/69233a9fefd734b53aef55bf/comments")
  console.log("leadComments", leadComments) 
  const comments = leadComments?.comments

  const commentDate = new Date()
  console.log(commentDate)
  return (
    <div className="container-fluid py-4">
      <div className="row">
        <h2 className="text-center mb-4">Lead Management</h2>
        <Sidebar />
        <div className="col-md-8 mx-auto">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && <table className="table">
            <thead>
              <tr>
                <th scope="col">Field</th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Lead Name</th>
                <td>{lead?.name}</td>
              </tr>
              <tr>
                <th scope="row">Sales Agent</th>
                <td>{lead?.salesAgent?.name}</td>
              </tr>
              <tr>
                <th scope="row">Lead Source</th>
                <td>{lead?.source}</td>
              </tr>
              <tr>
                <th scope="row">Lead Status</th>
                <td>{lead?.status}</td>
              </tr>
              <tr>
                <th scope="row">Priority</th>
                <td>{lead?.priority}</td>
              </tr>
              <tr>
                <th scope="row">Time to Close</th>
                <td>{lead?.timeToClose}</td>
              </tr>
            </tbody>
          </table>}
          <Link to={"/lead/add"} className="btn btn-primary">Edit Lead Details</Link>
          <hr />
          <div>
            <h4 className="text-center mb-4">Comments Section</h4>
            {commentLoading && <p>Loading...</p>}
            {commentError && <p>{commentError}</p>}
            {!commentLoading && !commentError && comments?.map(comment => (
              <div className="card p-2 rounded mb-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5>{comment?.author?.name}</h5>
                    <p>{new Date(comment?.updatedAt).toLocaleString()}</p>
                  </div>
                  <p>{comment?.commentText}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeadManagement