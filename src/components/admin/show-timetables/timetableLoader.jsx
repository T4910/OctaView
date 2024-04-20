import {Vortex, Triangle} from 'react-loader-spinner'

const timetableLoader = () => {
  return (
      <div 

          className="w-full p-5 grid place-content-center place-items-center"
      >
          <Triangle
              visible={true}
              height="80"
              width="80"
              color="#000000"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
          />
      </div>
  )
}
export default timetableLoader