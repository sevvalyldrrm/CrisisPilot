import { Routes, Route } from 'react-router-dom'
import { TopAppBar, SideNavBar } from '@/shared/layout'
import { Dashboard } from '@/pages/Dashboard'
import { Events } from '@/pages/Events'
import { AnalysisDetail } from '@/pages/AnalysisDetail'
import { SimulationDetail } from '@/pages/SimulationDetail'
import { ResponsePlan } from '@/pages/ResponsePlan'

export const AppRouter = () => {
  return (
    <div className="bg-surface-container-lowest text-on-surface h-screen w-screen overflow-hidden flex flex-col grid-bg font-body-sm text-body-sm">
      <TopAppBar />
      <div className="flex flex-1 overflow-hidden">
        <SideNavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/analysis/:id" element={<AnalysisDetail />} />
          <Route path="/simulation/:id" element={<SimulationDetail />} />
          <Route path="/response" element={<ResponsePlan />} />
        </Routes>
      </div>
    </div>
  )
}
