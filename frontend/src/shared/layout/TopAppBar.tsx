import { Icon } from '@/shared/ui'

export const TopAppBar = () => {
  return (
    <nav className="bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center w-full px-gutter h-14 z-50 shrink-0">
      <div className="flex items-center gap-gutter">
        <span className="text-headline-md font-headline-md font-bold tracking-tighter text-primary">
          CrisisPilot
        </span>
      </div>
      <div className="flex items-center gap-density-med">
        <div className="flex items-center gap-unit border border-outline-variant px-2 py-1 rounded bg-surface-container-low text-label-caps font-label-caps text-on-surface-variant">
          <Icon name="search" className="text-[14px]" />
          <input
            className="bg-transparent border-none text-on-surface focus:ring-0 p-0 text-[11px] w-48 placeholder-outline"
            placeholder="Search parameters..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-margin">
        <div className="flex items-center gap-gutter text-label-caps font-label-caps text-on-surface-variant">
          <span className="flex items-center gap-unit">
            <span className="w-2 h-2 rounded-full bg-[#238636]" />
            System Status: Active
          </span>
          <span className="flex items-center gap-unit">
            <span className="w-2 h-2 rounded-full bg-primary-container" />
            AI Reasoning Engine: Synchronized
          </span>
        </div>
        <div className="flex items-center gap-density-high">
          <button className="p-1 hover:bg-surface-variant/50 transition-colors rounded text-on-surface-variant cursor-pointer active:opacity-80">
            <Icon name="notifications" />
          </button>
          <button className="p-1 hover:bg-surface-variant/50 transition-colors rounded text-on-surface-variant cursor-pointer active:opacity-80">
            <Icon name="settings" />
          </button>
          <button className="p-1 hover:bg-surface-variant/50 transition-colors rounded text-on-surface-variant cursor-pointer active:opacity-80">
            <Icon name="account_circle" />
          </button>
        </div>
      </div>
    </nav>
  )
}
