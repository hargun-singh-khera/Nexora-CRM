import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import useFetch from '../useFetch'

const animatedComponents = makeAnimated()

const AddLead = () => {
  const { data: agentData } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/agents")
  // console.log("data", agentData)
  const { data: tagsData } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/tags")
  const salesAgent = agentData?.salesAgent
  // console.log("salesAgent", salesAgent)
  // console.log("tagsData", tagsData)

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
  // console.log("salesAgentOptions", salesAgentOptions)

  const tagOptions = tags?.map((tag) => ({ value: tag._id, label: tag.name }))
  // console.log("tagOptions", tagOptions)

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
              <Select options={leadSourceOptions} />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Sales Agent</label>
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
              <label htmlFor="name" className="form-label">Lead Status</label>
              <Select options={leadStatusOptions} />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Priority</label>
              <Select options={priorityOptions} />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Time to Close</label>
              <input type="text" className="form-control" id="name" placeholder="Enter number of days" />
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="form-label">Tags</label>
              <Select
                isMulti
                name="tags"
                components={animatedComponents}
                options={tagOptions}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
            <button type="button" className="btn btn-primary">Add Lead</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddLead