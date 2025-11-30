import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
// import "bootstrap-icons/font/bootstrap-icons.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Dashboard from './pages/Dashboard.jsx'
import AddLead from './pages/AddLead.jsx'
import LeadManagement from './pages/LeadManagement.jsx'
import AddSalesAgent from './pages/AddSalesAgent.jsx'
import SalesAgentManagement from './pages/SalesAgentManagement.jsx'
import LeadList from './pages/LeadList.jsx'
import LeadStatusView from './pages/LeadStatusView.jsx'
import SalesAgentView from './pages/SalesAgentView.jsx'
import Reports from './pages/Reports.jsx'

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <App />
  // },
  {
    path: "/",
    element: <Dashboard />
  },
  {
    path: "/lead",
    element: <LeadManagement />
  },
  {
    path: "/leads",
    element: <LeadList />
  },
  {
    path: "/leads/view",
    element: <LeadStatusView />
  },
  {
    path: "/lead/list/:leadId",
    element: <LeadManagement />
  },
  {
    path: "/lead/add",
    element: <AddLead />
  },
  {
    path: "/sales-agent",
    element: <SalesAgentManagement />
  },
  {
    path: "/sales-agent/view",
    element: <SalesAgentView />
  },
  {
    path: "/sales-agent/add",
    element: <AddSalesAgent />
  },
  {
    path: "/lead/reports",
    element: <Reports />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
