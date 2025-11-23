import React, { useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import useFetch from '../useFetch'
import toast, { Toaster } from 'react-hot-toast';

const animatedComponents = makeAnimated()

const AddLead = () => {
  const { data: agentData } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/agents")
  const { data: tagsData } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/tags")

  const salesAgent = agentData?.salesAgent

  const sourceOptions = [
    { value: 'Website', label: 'Website' },
    { value: 'Referral', label: 'Referral' },
    { value: 'Cold Call', label: 'Cold Call' },
    { value: 'Advertisement', label: 'Advertisement' },
    { value: 'Email', label: 'Email' },
    { value: 'Other', label: 'Other' },
  ]

  const leadStatusOptions = [
    { value: 'New', label: 'New' },
    { value: 'Contacted', label: 'Contacted' },
    { value: 'Qualified', label: 'Qualified' },
    { value: 'Proposal sent', label: 'Proposal sent' },
    { value: 'Closed', label: 'Closed' },
  ]

  const priorityOptions = [
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
  ]

  const tags = tagsData?.tags
  const salesAgentOptions = salesAgent?.map((agent) => ({ value: agent._id, label: agent.name }))
  // console.log("salesAgentOptions", salesAgentOptions)
  const tagOptions = tags?.map((tag) => ({ value: tag._id, label: tag.name }))
  // console.log("tagOptions", tagOptions)

  const [formData, setFormData] = useState({
    name: "",
    source: null,
    salesAgent: null,
    status: null,
    tags: [],
    timeToClose: 1,
    priority: null,
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (selectedOption, actionMeta) => {
    // console.log("selectedOption", selectedOption, "actionMeta", actionMeta)
    // const value = actionMeta.name === "tags" ? selectedOption.map(option => option.value) : selectedOption.value
    const value = selectedOption
    // console.log("value", value)
    const { name } = actionMeta
    // console.log("name", name, "value", value)
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  
  const handleSubmit = async (e) => {
    console.log("submitting")
    e.preventDefault()
    try {
      setLoading(true)
      const payload = {
        name: formData.name,
        source: formData.source.value,
        salesAgent: formData.salesAgent.value,
        status: formData.status.value,
        tags: formData.tags.map(tag => tag.value),
        timeToClose: 1,
        priority: formData.priority.value,
      }
      const response = await fetch("http://localhost:3000/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      })
      if (!response.ok) {
        throw new Error("Failed to add lead.")
      }
      console.log(formData)
      toast.success("Lead added successfully")
      setFormData({
        name: "",
        source: null,
        salesAgent: null,
        status: null,
        tags: [],
        timeToClose: 1,
        priority: null,
      })
    } catch (error) {
      console.log("Error while adding lead.", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-fluid  py-4">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <h2 className="mb-4 text-center">Add New Lead</h2>
          <form onSubmit={handleSubmit} className="card px-4 py-5 shadow-sm rounded-sm">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Lead Name</label>
              <input type="text" value={formData.name} onChange={handleChange} className="form-control" id="name" name="name" placeholder="Name of customer or company" />
            </div>
            <div className="mb-3">
              <label htmlFor="source" className="form-label">Lead Source</label>
              <Select id="source" name="source" value={formData.source} options={sourceOptions} onChange={handleSelectChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="salesAgent" className="form-label">Sales Agent</label>
              <Select id="salesAgent" name="salesAgent" value={formData.salesAgent} options={salesAgentOptions} onChange={handleSelectChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">Lead Status</label>
              <Select id="status" name="status" value={formData.status} options={leadStatusOptions} onChange={handleSelectChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="priority" className="form-label">Priority</label>
              <Select id="priority" name="priority" value={formData.priority} options={priorityOptions} onChange={handleSelectChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="timeToClose" className="form-label">Time to Close</label>
              <input id="timeToClose" name="timeToClose" min={1} max={30} type="number" value={formData.timeToClose} onChange={handleChange} className="form-control" placeholder="Enter number of days" />
            </div>
            <div className="mb-4">
              <label htmlFor="tags" className="form-label">Tags</label>
              <Select
                id="tags"
                isMulti
                name="tags"
                value={formData.tags}
                components={animatedComponents}
                onChange={handleSelectChange}
                options={tagOptions}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
            <button className="btn btn-primary" disabled={loading}>
              {loading && <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>}
              <span role="status">{loading ? "Submitting..." : "Add Lead"}</span>
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default AddLead