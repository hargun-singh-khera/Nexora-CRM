import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="col-md-2 bg-transparent my-5">
            {/* <h1>Hello</h1> */}
            <div className="list-group">
                <Link to={"/"} className="list-group-item" aria-current="true">Back to Dashboard</Link>
            </div>
        </div>
    )
}

export default Sidebar