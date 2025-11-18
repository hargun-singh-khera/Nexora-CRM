import React, { useState } from 'react'

const AddSalesAgent = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
    })
    
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("https://neo-g-backend-9d5c.vercel.app/api/agents", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })
            console.log("response", response)
            if(!response.ok) {
                throw new Error("Failed to add sales agent.")
            }
            const data = await response.json()
            console.log("data", data)
            setFormData({
                name: "",
                email: "",
            })
        } catch (error) {
            console.log("Error while adding sales agent", error)
        }
    }

    return (
        <div className="container py-4">
            <div className="row">
                <div className="col-md-5 mx-auto">
                    <h2 className="mb-4 text-center">Add New Sales Agent</h2>
                    <form onSubmit={handleSubmit} className="card px-4 py-5 shadow-sm rounded-sm">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Agent Name</label>
                            <input type="text" value={formData.name} onChange={handleChange} className="form-control" id="name" name="name" placeholder="John Doe" />
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email address</label>
                            <input type="email" value={formData.email} onChange={handleChange} class="form-control" id="email" name="email" placeholder="name@example.com" />
                        </div>
                        <button className="btn btn-primary">Add Agent</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddSalesAgent