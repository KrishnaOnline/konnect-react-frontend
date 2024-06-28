import error404 from '../assets/error404.png'
import { Link } from 'react-router-dom'


const Error = () => {
  return (
    <div className='max-w-[1280px] mt-20 mb-24 flex flex-col mx-auto justify-center items-center'>
        <img className='w-[80%] lg:w-[35%]' src={error404} alt='404'/>
        <div className='flex flex-col justify-center items-center'>
          <p className='text-2xl lg:text-xl'>Page Not Found</p>
          <Link to={'/'}>
            <button className='border border-black shadow-lg font-medium hover:bg-black hover:text-white transition-all duration-500 px-3 py-[0.3rem] rounded-lg mt-4'>Go To Home</button>
          </Link>
        </div>
    </div>
  )
}

export default Error