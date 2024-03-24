import { Navbar } from './Navbar';

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-200">
      <Navbar />
      <div className='mt-10 flex flex-col items-center'>
        <p className='text-center font-medium text-5xl font-sans mb-20'>
          Organize, promote, and execute events <br></br>within our <span className='font-extrabold underline decoration-orange-500'>college community.</span>
        </p>
        <div className='flex justify-between'>
          <button className='mr-20 bg-transparent border-[#FF8C00] border-[3px] py-1 px-6 text-black rounded-full'>Admin</button>
          <button className='bg-transparent border-[#FF8C00] border-[3px] py-1 px-6 text-black rounded-full'>Student</button>
        </div>
      </div>
    </div>
  );
}
