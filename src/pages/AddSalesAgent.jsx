import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from '../components/Sidebar';

const AddSalesAgent = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
    })
    const [loading, setLoading] = useState(false)

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
            setLoading(true)
            const response = await fetch("https://neo-g-backend-9d5c.vercel.app/api/agents", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })
            // console.log("response", response)
            if (!response.ok) {
                throw new Error("Failed to add sales agent.")
            }
            const data = await response.json()
            // console.log("data", data)
            setFormData({
                name: "",
                email: "",
            })
            toast.success("Sales agent added successfully")
        } catch (error) {
            toast.error("Failed to add sales agent")
            console.log("Error while adding sales agent", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container-fluid py-4">
            <div className="row">
                <h2 className="mb-4 text-center">Add New Sales Agent</h2>
                <Sidebar />
                <div className="col-md-8 py-3 d-flex justify-content-center">
                    <div className="col col-md-8">
                        <form onSubmit={handleSubmit} className="card mx-md-5 px-4 py-5 shadow-sm rounded-sm">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Agent Name</label>
                                <input type="text" value={formData.name} onChange={handleChange} className="form-control" id="name" name="name" placeholder="John Doe" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" value={formData.email} onChange={handleChange} className="form-control" id="email" name="email" placeholder="name@example.com" />
                            </div>
                            <button className="btn btn-primary" disabled={loading}>
                                {loading && <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>}
                                <span role="status">{loading ? "Submitting..." : "Add Agent"}</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default AddSalesAgent