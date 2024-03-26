import { Navbar } from './Navbar';
import bgImage from '../assets/bg.png';

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <Navbar />
      <div className='mt-10 flex flex-col items-center'>
        <p className='text-center text-white font-medium text-5xl font-sans mb-20'>
          Organize, promote, and execute events <br></br>within our <br></br>college community.
        </p>
        <div className='flex justify-between my-16'>
          <button className='mr-20 w-32 bg-transparent border-[#FF8C00] border-[3px] py-2 px-6 text-white rounded-full transition-all duration-300 hover:bg-[#FF8C00] hover:text-black hover:font-semibold'
          >Admin</button>
          <button className='w-32 bg-transparent border-[#FF8C00] border-[3px] py-2 px-6 text-white rounded-full transition-all duration-300 hover:bg-[#FF8C00] hover:text-black hover:font-semibold'>Student</button>
        </div>
      </div>
    </div>
  );
}
