import React from 'react'
import Sidebar from '../components/Sidebar'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import useFetch from '../useFetch';

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const Reports = () => {
  const { data, loading: leadPipelineLoading, error: pipelineError } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/report/pipeline")
  // console.log("data", data)
  const { data: leadsClosed, loading: leadsClosedLoading, error: leadsClosedError } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/report/last-week")
  // console.log("leadsClosed", leadsClosed)

  const { data: leadsData, loading: leadsLoading, error: leadsError } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/leads")
  console.log("leadsData", leadsData)
  const { data: agentData, loading: agentLoading, error: agentError } = useFetch("https://neo-g-backend-9d5c.vercel.app/api/agents")
  // console.log("agentData", agentData)
  // const { data: leadsClosedByAgent, loading: leadsClosedByAgentLoading, error: leadsClosedByAgentError } = useFetch("http://localhost:3000/api/report/leads-closed-by-agent")
  // console.log("leadsClosedByAgent", leadsClosedByAgent)

  const leadsClosedByAgent = agentData?.salesAgent?.map(agent => ({ name: agent.name, leadsClosed: leadsData?.leads?.filter(lead => lead.status === "Closed" && agent._id === lead.salesAgent._id ).length }))
  // console.log("leadsClosedByAgent", leadsClosedByAgent)
  const totalLeadsInPipeline = data?.totalLeadsInPipeline
  const leadsClosedLastWeek = leadsClosed?.leads

  const totalProposalSentLeads = leadsData?.leads?.filter(lead => lead.status === "Proposal sent").length
  const totalNewLeads = leadsData?.leads?.filter(lead => lead.status === "New").length
  const totalContactedLeads = leadsData?.leads?.filter(lead => lead.status === "Contacted").length
  const totalQualifiedLeads = leadsData?.leads?.filter(lead => lead.status === "Qualified").length
  const totalClosedLeads = leadsData?.leads?.filter(lead => lead.status === "Closed").length

  console.log("totalNewLeads", totalNewLeads, ", totalQualifiedLeads", totalQualifiedLeads, "totalContactedLeads", totalContactedLeads, "totalProposalSentLeads", totalProposalSentLeads, "totalClosedLeads", totalClosedLeads)

  const leadsClosedAndPipelineData = {
    labels: ['Leads closed', 'Leads in pipeline'],
    datasets: [
      {
        // label: '# of Votes',
        data: [totalClosedLeads, totalLeadsInPipeline],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const leadsStatusData = {
    labels: ['New', 'Qualified', 'Contacted', 'Proposal sent', 'Closed'],
    datasets: [
      {
        // label: '# of Votes',
        data: [totalNewLeads, totalQualifiedLeads, totalContactedLeads, totalProposalSentLeads, totalClosedLeads],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  const labels = agentData?.salesAgent?.map(agent => agent.name)

  const leadsClosedByAgentData = {
    labels,
    datasets: [
      {
        label: 'Closed Leads',
        data: agentData?.salesAgent?.map(agent => leadsData?.leads?.filter(lead => lead.status === "Closed" && agent._id === lead.salesAgent._id ).length),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className="container-fluid  py-4">
      <div className="row">
        <h2 className="text-center mb-4">Anvaya CRM Reports</h2>
        <Sidebar />
        <div className="col-md-4 text-center">
          <h4 className="my-5">Total Leads closed and in Pipeline</h4>
          {(leadPipelineLoading || leadsClosedLoading) && <div className="d-flex py-4 justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>}
          {!leadPipelineLoading && !leadsClosedLoading && <Pie data={leadsClosedAndPipelineData} />}
        </div>
        <div className="col-md-4  text-center">
          <h4 className="my-5">Lead Status Distribution</h4>
          {leadsLoading && <div className="d-flex py-4 justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>}
          {!leadsLoading && <Pie data={leadsStatusData} />}
        </div>
        <div className="col-md-4 mt-5 mx-auto text-center">
          <h4 className="my-5">Leads Closed by Sales Agent</h4>
          {(agentLoading || leadsLoading) && <div className="d-flex py-5 px-3 justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>}
          {!agentLoading && !leadsLoading && <Bar options={options} data={leadsClosedByAgentData} />}
        </div>
        
      </div>
    </div>
  )
}

export default Reports