import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Link, useParams } from 'react-router-dom'
import useFetch from '../useFetch'
import toast, { Toaster } from 'react-hot-toast';


const LeadManagement = () => {
  const { leadId } = useParams()

  const { data, loading: leadLoading, error } = useFetch(`https://neo-g-backend-9d5c.vercel.app/api/lead/${leadId}`)
  console.log("data", data)
  const lead = data?.lead
  console.log("lead", lead)

  const { data: salesAgentData, loading: salesAgentLoading, error: salesAgentError } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/agents")
  console.log("salesAgentData", salesAgentData)

  const [commentsData, setCommnentsData] = useState("")
  const [loading, setLoading] = useState(false)

  const { data: leadComments, loading: commentLoading, error: commentError } = useFetch(`https://neo-g-backend-9d5c.vercel.app/api/leads/${leadId}/comments`)
  console.log("leadComments", leadComments)
  const comments = leadComments?.comments

  useEffect(() => {
    if (comments) {
      setCommnentsData(comments)
    }
  }, [comments])

  const commentDate = new Date()
  console.log(commentDate)

  const [commentText, setCommentText] = useState("")
  const [author, setAuthor] = useState("")
  const [isEdit, setIsEdit] = useState(false)

  console.log("isEdit", isEdit)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await fetch(`https://neo-g-backend-9d5c.vercel.app/api/leads/${leadId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentText,
          author
        })
      })
      if (!response.ok) {
        throw new Error("Failed to add comment.")
      }
      const data = await response.json()
      console.log("data", data)
      toast.success("Comment added successfully")
      setCommnentsData(prev => [...prev, data?.comment])
      setCommentText("")
      setAuthor("")
    } catch (error) {
      toast.error("Failed to add comment")
      console.log("Error while adding comment", error)
    } finally {
      setLoading(false)
    }
  }

  console.log("commentsData", commentsData)

  const [formData, setFormData] = useState({
    name: "",
    salesAgent: "",
    source: "",
    status: "",
    priority: "",
    timeToClose: 1,
  })

  useEffect(() => {
    if(lead) {
      setFormData({
        name: lead?.name,
        salesAgent: lead?.salesAgent?._id,
        source: lead?.source,
        status: lead?.status,
        priority: lead?.priority,
        timeToClose: Number(lead?.timeToClose),
      })  
    }
  }, [lead])

  console.log("formData", formData)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({...prev, [name]: name === "timeToClose" ? Number(value) : value }))
  }

  const handleUpdateLeads = async (e) => {
    e.preventDefault()
    if(!isEdit) {
      setIsEdit(true)
      return
    }
    try {
      // https://neo-g-backend-9d5c.vercel.app/api/leads/${leadId}
      const response = await fetch(`https://neo-g-backend-9d5c.vercel.app/api/leads/${leadId}`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(formData)
      })
      console.log("submitting form", formData)
      if(!response.ok) {
        throw new Error("Failed to update lead.")
      }
      const data = await response.json()
      console.log("data", data)
      toast.success("Lead updated successfully")
      setIsEdit(false)
    } catch (error) {
      toast.error("Failed to update lead")
      console.log("Error while updating lead")
    }
  }

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <h2 className="text-center mb-4">Lead Management</h2>
        <Sidebar />
        <div className="col-md-8 mx-auto">
          {leadLoading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {!leadLoading && !error && (
            <form onSubmit={handleUpdateLeads}>
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
                    {!isEdit ? (<td>{lead?.name}</td>) : (
                      <td>
                        <input type="text" value={formData.name} onChange={handleChange} name="name" className="form-control" id="name" ></input>
                      </td>
                    )}
                  </tr>
                  <tr>
                    <th scope="row">Sales Agent</th>
                    {!isEdit ? (<td>{lead?.salesAgent?.name}</td>) : (
                      <td>
                        <select value={author} onChange={(e) => setAuthor(e.target.value)} className="form-select my-1" aria-label="Default select example">
                          {salesAgentData?.salesAgent?.map(agent => (
                            <option key={agent._id} value={agent?._id}>{agent?.name}</option>
                          ))}
                        </select>
                      </td>
                    )}
                  </tr>
                  <tr>
                    <th scope="row">Lead Source</th>
                    {!isEdit ? (<td>{lead?.source}</td>) : (
                      <td>
                        <input type="text" value={formData.source} onChange={handleChange} name="source" className="form-control" id="source" ></input>
                      </td>
                    )}
                  </tr>
                  <tr>
                    <th scope="row">Lead Status</th>
                    {!isEdit ? (<td>{lead?.status}</td>) : (
                      <td>
                        <input type="text" value={formData.status} onChange={handleChange} name="status" className="form-control" id="status" ></input>
                      </td>
                    )}
                  </tr>
                  <tr>
                    <th scope="row">Priority</th>
                    {!isEdit ? (<td>{lead?.priority}</td>) : (
                      <td>
                        <input type="text" value={formData.priority} onChange={handleChange} name="priority" className="form-control" id="priority" ></input>
                      </td>
                    )}
                  </tr>
                  <tr>
                    <th scope="row">Time to Close</th>
                    {!isEdit ? (<td>{lead?.timeToClose}</td>) : (
                      <td>
                        <input type="number" value={formData.timeToClose} onChange={handleChange} name="timeToClose" className="form-control" id="timeToClose" ></input>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
              <button className="btn btn-primary">{isEdit ? "Update Lead" : "Edit Lead Details"}</button>
            </form>
          )}
          <hr />
          <div>
            <h4 className="text-center my-4 mb-4">Comments Section</h4>
            {commentLoading && <p>Loading...</p>}
            {commentError && <p>{commentError}</p>}
            {!commentLoading && !commentError && commentsData?.length === 0 && <p>No comments found.</p>}
            {!commentLoading && !commentError && commentsData?.length > 0 && commentsData?.map(comment => (
              <div key={comment._id} className="card p-2 rounded mb-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5>{comment?.author?.name}</h5>
                    <p>{new Date(comment?.updatedAt).toLocaleString()}</p>
                  </div>
                  <p>{comment?.commentText}</p>
                </div>
              </div>
            ))}
            <form onSubmit={handleSubmit} className="mb-3">
              <div className="card">
                <div className="card-body">
                  {/* <label for="comment" className="form-label">Add Comment</label> */}
                  <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} className="form-control mb-3 p-3" id="comment" placeholder="Write your comment here..." rows="3"></textarea>
                  {/* <label for="comment" class="form-label">Author</label> */}
                  <select value={author} onChange={(e) => setAuthor(e.target.value)} className="form-select mb-3" aria-label="Default select example">
                    <option value="" selected disabled>Select Author</option>
                    {salesAgentData?.salesAgent?.map(agent => (
                      <option key={agent._id} value={agent?._id}>{agent?.name}</option>
                    ))}
                  </select>
                  <button className="btn btn-primary btn-sm" disabled={loading}>
                    {loading && <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>}
                    <span role="status">{loading ? "Submitting..." : "Submit"}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default LeadManagement