import { NavbarAfterLogin } from './NavbarAfterLogin';
import bgImage from '../assets/bg.png';

export default function Committees() {
  return (
    <div
      className="flex flex-col items-center justify-start min-h-screen pt-12"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <NavbarAfterLogin />
      <div className="container mx-auto mt-16 -mt-1 w-5/6 px-4">

        <div className="mb-10 mt-12">
          <h1 className="text-white text-6xl font-bold">Hello, User!</h1>
        </div>
        <div className="flex flex-wrap justify-between mb-8"> {/* Flex wrapper for rows with space between each button */}
          {/* First row of buttons */}
          <div className="flex items-start justify-center rounded-3xl bg-white p-4 w-40 h-24 mb-8 mr-8 "> {/* Button div with rounded corners and margin */}
          <div className="flex justify-center items-center bg-gray-300 rounded-full w-16 h-16 mr-2"></div> {/* Rounded image placeholder */}
            <h3 className="text-lg pt-4 font-semibold">GDSC</h3>
          </div>
          <div className="flex items-start justify-center rounded-3xl bg-white p-4 w-40 h-24 mb-8 mr-8"> {/* Button div with rounded corners and margin */}
            <div className="flex justify-center items-center w-16 h-16 rounded-full bg-gray-300 mr-2"></div> {/* Rounded image placeholder */}
            <div className="flex flex-col justify-center">
              <h3 className="text-lg pt-4 font-semibold">CSI</h3>
            </div>
          </div>
          <div className="flex items-start justify-center rounded-3xl bg-white p-4 w-40 h-24 mb-8 mr-8"> {/* Button div with rounded corners and margin */}
            <div className="flex justify-center items-center w-16 h-16 rounded-full bg-gray-300 mr-2"></div> {/* Rounded image placeholder */}
            <div className="flex flex-col justify-center">
              <h3 className="text-lg pt-4 font-semibold">ITSA</h3>
            </div>
          </div>
          <div className="flex items-start justify-center rounded-3xl bg-white p-4 w-40 h-24 mb-8"> {/* Button div with rounded corners and margin */}
            <div className="flex justify-center items-center w-16 h-16 rounded-full bg-gray-300 mr-2"></div> {/* Rounded image placeholder */}
            <div className="flex flex-col justify-center">
              <h3 className="text-lg pt-4 font-semibold">GDSC</h3>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between mb-8"> {/* Flex wrapper for rows with space between each button */}
          {/* second row of buttons */}
          <div className="flex items-start justify-center rounded-3xl bg-white p-4 w-40 h-24 mb-8 mr-8"> {/* Button div with rounded corners and margin */}
            <div className="flex justify-center items-center w-16 h-16 rounded-full bg-gray-300 mr-2"></div> {/* Rounded image placeholder */}
            <div className="flex flex-col justify-center">
              <h3 className="text-lg pt-4 font-semibold">GDSC</h3>
            </div>
          </div>
          <div className="flex items-start justify-center rounded-3xl bg-white p-4 w-40 h-24 mb-8 mr-8"> {/* Button div with rounded corners and margin */}
            <div className="flex justify-center items-center w-16 h-16 rounded-full bg-gray-300 mr-2"></div> {/* Rounded image placeholder */}
            <div className="flex flex-col justify-center">
              <h3 className="text-lg pt-4 font-semibold">CSI</h3>
            </div>
          </div>
          <div className="flex items-start justify-center rounded-3xl bg-white p-4 w-40 h-24 mb-8 mr-8"> {/* Button div with rounded corners and margin */}
            <div className="flex justify-center items-center w-16 h-16 rounded-full bg-gray-300 mr-2"></div> {/* Rounded image placeholder */}
            <div className="flex flex-col justify-center">
              <h3 className="text-lg pt-4 font-semibold">ITSA</h3>
            </div>
          </div>
          <div className="flex items-start justify-center rounded-3xl bg-white p-4 w-40 h-24 mb-8"> {/* Button div with rounded corners and margin */}
            <div className="flex justify-center items-center w-16 h-16 rounded-full bg-gray-300 mr-2"></div> {/* Rounded image placeholder */}
            <div className="flex flex-col justify-center">
              <h3 className="text-lg pt-4 font-semibold">GDSC</h3>
            </div>
          </div>
        </div>
      
        <div className="flex flex-wrap justify-between mb-8"> {/* Flex wrapper for rows with space between each button */}
  {/* Third row of buttons */}
  <div className="flex items-start justify-center rounded-3xl bg-white p-4 w-40 h-24 mb-8 mr-8"> {/* Button div with rounded corners and margin */}
    <div className="flex justify-center items-center w-16 h-16 rounded-full bg-gray-300 mr-2"></div> {/* Rounded image placeholder */}
    <div className="flex flex-col justify-center">
      <h3 className="text-lg pt-4 font-semibold">GDSC</h3>
    </div>
  </div>
  <div className="flex items-start justify-center rounded-3xl bg-white p-4 w-40 h-24 mb-8 mr-8"> {/* Button div with rounded corners and margin */}
    <div className="flex justify-center items-center w-16 h-16 rounded-full bg-gray-300 mr-2"></div> {/* Rounded image placeholder */}
    <div className="flex flex-col justify-center">
      <h3 className="text-lg pt-4 font-semibold">CSI</h3>
    </div>
  </div>
  <div className="flex items-start justify-center rounded-3xl bg-white p-4 w-40 h-24 mb-8 mr-8"> {/* Button div with rounded corners and margin */}
    <div className="flex justify-center items-center w-16 h-16 rounded-full bg-gray-300 mr-2"></div> {/* Rounded image placeholder */}
    <div className="flex flex-col justify-center">
      <h3 className="text-lg pt-4 font-semibold">ITSA</h3>
    </div>
  </div>
  <div className="flex items-start justify-center rounded-3xl bg-white p-4 w-40 h-24 mb-8"> {/* Button div with rounded corners and margin */}
    <div className="flex justify-center items-center w-16 h-16 rounded-full bg-gray-300 mr-2"></div> {/* Rounded image placeholder */}
    <div className="flex flex-col justify-center">
      <h3 className="text-lg pt-4 font-semibold">GDSC</h3>
    </div>
  </div>
</div>
      </div>
    </div>
  );
}
