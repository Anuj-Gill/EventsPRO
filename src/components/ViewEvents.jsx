import { NavbarAfterLogin } from './NavbarAfterLogin';
import bgImage from '../assets/bg.png';

export default function ViewEvents() {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen pt-12"
      style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      }}
      >
        <NavbarAfterLogin />
        <div className="container mx-auto">
          <div className="mb-10 mt-12 pl-52">
            <h1 className="text-white text-6xl font-bold">Hello, Arkan!</h1>
          </div>
          <div className="flex flex-wrap justify-center pl-52">
            <div className="w-full mt-10 flex">
              <button className="w-32 px-12 py-6 bg-white text-black rounded-2xl transition-all duration-300 hover:bg-black hover:text-white hover:font-semibold hover:shadow-md mr-52">
                GDSC
              </button>
              <button className="w-32 px-12 py-6 bg-white text-black rounded-2xl transition-all duration-300 hover:bg-black hover:text-white hover:font-semibold hover:shadow-md mr-52">
                CSI
              </button>
              <button className="w-32 px-12 py-6 bg-white text-black rounded-2xl transition-all duration-300 hover:bg-black hover:text-white hover:font-semibold hover:shadow-md">
                ITSA
              </button>
            </div>
            <div className="w-full mb-10 flex">
              <button className="w-32 px-12 py-6 bg-white text-black rounded-2xl transition-all duration-300 hover:bg-black hover:text-white hover:font-semibold hover:shadow-md mr-52 mt-28">
                IEEE
              </button>
              <button className="w-32 px-12 py-6 bg-white text-black rounded-2xl transition-all duration-300 hover:bg-black hover:text-white hover:font-semibold hover:shadow-md mt-28">
                BEEE
              </button>
            </div>
          </div>
        </div>
  
      </div>
    );
  }
  