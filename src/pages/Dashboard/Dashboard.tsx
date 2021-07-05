import React from 'react'
import DialogEdit from './DialogEdit/DialogEdit'
import DashboardForms from './DashboardForms/DashboardForms'
import DashboardTable from './DashboardTable/DashboardTable'

import './Dashboard.scss'

const Dashboard: React.FC = () => (
  <section>
    <DashboardForms />
    <DashboardTable />
    <DialogEdit />
  </section>
)

export default Dashboard
