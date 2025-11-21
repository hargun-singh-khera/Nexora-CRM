import React, { useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import useFetch from '../useFetch'

const animatedComponents = makeAnimated()

const AddLead = () => {
  const { data: agentData } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/agents")
  const { data: tagsData } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/tags")

  const salesAgent = agentData?.salesAgent

  const leadSourceOptions = [
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
  const tagOptions = tags?.map((tag) => ({ value: tag._id, label: tag.name }))

  const [formData, setFormData] = useState({
    name: "",
    source: "",
    salesAgent: [],
    status: "",
    tags: [],
    timeToClose: null,
    priority: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (selectedOption, actionMeta) => {
    console.log("selectedOption", selectedOption, "actionMeta", actionMeta)
    const { value } = selectedOption
    const { name }= actionMeta
    // console.log("name", name, "value", value)
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  console.log(formData)

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
              <label htmlFor="leadSource" className="form-label">Lead Source</label>
              <Select id="leadSource" name="leadSource" options={leadSourceOptions} onChange={handleSelectChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="salesAgent" className="form-label">Sales Agent</label>
              <Select
                isMulti
                name="salesAgent"
                components={animatedComponents}
                options={salesAgentOptions}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="leadStatus" className="form-label">Lead Status</label>
              <Select id="leadStatus" name="leadStatus" options={leadStatusOptions} onChange={handleSelectChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="priority" className="form-label">Priority</label>
              <Select id="priority" name="priority" options={priorityOptions} onChange={handleSelectChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="timeToClose" className="form-label">Time to Close</label>
              <input type="number" min={1} max={30} value={formData.timeToClose} onChange={handleChange} className="form-control" id="timeToClose" placeholder="Enter number of days" />
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="form-label">Tags</label>
              <Select
                isMulti
                name="tags"
                components={animatedComponents}
                onChange={handleSelectChange}
                options={tagOptions}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
            <button className="btn btn-primary">Add Lead</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddLead