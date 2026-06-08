import { Link, useLocation } from 'react-router-dom'
import { Icon } from '@/shared/ui'

const navItems = [
  { path: '/', label: 'Dashboard', icon: 'dashboard' },
  { path: '/events', label: 'Live Events', icon: 'sensors' },
  { path: '/analysis', label: 'Impact Analysis', icon: 'analytics' },
  { path: '/response', label: 'Response Plans', icon: 'quick_reference_all' },
]

export const SideNavBar = () => {
  const location = useLocation()

  return (
    <aside className="bg-surface-container border-r border-outline-variant w-20 hover:w-64 transition-all duration-300 flex flex-col z-40 shrink-0 group overflow-hidden">
      <div className="p-4 border-b border-outline-variant hidden group-hover:block transition-opacity opacity-0 group-hover:opacity-100 whitespace-nowrap">
        <div className="text-label-caps font-label-caps text-on-surface">Command Center</div>
        <div className="text-[10px] text-on-surface-variant uppercase tracking-wider">Operational Intel</div>
      </div>
      <div className="flex-1 py-density-high flex flex-col gap-unit">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                ${isActive ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant'}
                rounded-lg mx-2 flex items-center justify-start p-3 overflow-hidden cursor-pointer active:opacity-80 transition-all duration-200 ease-in-out
              `}
            >
              <Icon name={item.icon} filled={isActive} className="shrink-0" />
              <span className="ml-3 text-label-caps font-label-caps whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
      <div className="p-density-high border-t border-outline-variant flex flex-col gap-unit">
        <button className="text-on-surface-variant flex items-center justify-start p-3 hover:text-on-surface hover:bg-surface-variant mx-2 rounded-lg overflow-hidden cursor-pointer active:opacity-80 transition-all duration-200 ease-in-out">
          <Icon name="density_medium" className="shrink-0 text-[18px]" />
          <span className="ml-3 text-label-caps font-label-caps whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Density
          </span>
        </button>
        <button className="text-on-surface-variant flex items-center justify-start p-3 hover:text-on-surface hover:bg-surface-variant mx-2 rounded-lg overflow-hidden cursor-pointer active:opacity-80 transition-all duration-200 ease-in-out">
          <Icon name="layers" className="shrink-0 text-[18px]" />
          <span className="ml-3 text-label-caps font-label-caps whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Layers
          </span>
        </button>
        <div className="mt-2 mx-2 hidden group-hover:block transition-opacity opacity-0 group-hover:opacity-100 whitespace-nowrap">
          <button className="w-full bg-primary-container text-on-primary-container py-2 rounded text-label-caps font-label-caps font-bold hover:opacity-90">
            Deploy Response
          </button>
        </div>
      </div>
    </aside>
  )
}
