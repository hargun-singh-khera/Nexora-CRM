import React from 'react'

const AddSalesAgent = () => {
    return (
        <div className="container py-4">
            <div className="row">
                <div className="col-md-5 mx-auto">
                    <h2 className="mb-4 text-center">Add New Sales Agent</h2>
                    <form className="card px-4 py-5 shadow-sm rounded-sm">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Agent Name</label>
                            <input type="text" className="form-control" id="name" placeholder="John Doe" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                        </div>
                        <button type="button" className="btn btn-primary">Add Agent</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddSalesAgent