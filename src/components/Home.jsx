import { Navbar } from './Navbar';

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-200">
      <Navbar />
      <div className='mt-10 flex flex-col items-center'>
        <p className='text-center text-5xl font-sans mb-20'>
          Organize, promote, and execute events <br></br>within our college community.
        </p>
        <div className='flex'>
          <button className='mr-2 bg-blue-900 py-2 px-6 text-white rounded-full'>Admin</button>
          <button className='bg-blue-900 py-2 px-6 text-white rounded-full'>Student</button>
        </div>
      </div>
    </div>
  );
}
