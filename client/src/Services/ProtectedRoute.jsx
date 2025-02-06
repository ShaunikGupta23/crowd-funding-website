import React from 'react'
import { Alert } from 'react-bootstrap'

const ProtectedRoute = ({ allowedRoles, children }) => {

    const userRole = localStorage.getItem("role");

    // if (!auth) {
    //     return <Navigate to={'/login'} />
    // }

    if (!allowedRoles.includes(userRole)) {
        return (
            <div>
                <Alert variant='danger'>
                    You do not have the access to this page.
                </Alert>
            </div>
        )
    }

    return children;
}

export default ProtectedRoute;
