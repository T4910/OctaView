import Switch from './switch'
import Timing from './timing'
import Exammode from './exammode'
import Default from './defaults'

const timetableConfigs = () => {
  return (
    <div className='min-w-fit mx-auto md:via-slate-50 lg:via-white space-y-4'>
      <div className="mx-auto grid w-full max-w-6xl gap-1">
          <h1 className="text-2xl font-semibold text-foreground mb-2">Timetable Configurations</h1>
          <div className="space-y-8">
            <Default />
            <Exammode />
            <Timing />
          </div>
      </div>
    </div>
  )
}
export default timetableConfigs