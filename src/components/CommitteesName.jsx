import { useNavigate } from "react-router-dom";
import CSI from '../assets/CSI_Logo.jpeg';
import ITSA from '../assets/ITSA_Logo.jpeg';
import CESA from '../assets/CESA_Logo.jpeg';
import GDSC from '../assets/GDSC_Logo.webp';
import IEEE from '../assets/IEEE_Logo.jpeg';
import ACM from '../assets/ACM_Logo.jpeg';
import BMSA from '../assets/BMSA_Logo.jpeg';

export function CommitteesName({ name, logo }) {

  const navigate = useNavigate();

    if (logo === "CSI") {
      logo = CSI;
    } else if (logo === "ITSA") {
      logo = ITSA;
    } else if (logo === "ACM") {
      logo = ACM;
    } else if (logo === "CESA") {
      logo = CESA;
    } else if (logo === "BMSA") {
      logo = BMSA;
    } else if (logo === "IEEE") {
      logo = IEEE;
    } else if (logo === "GDSC") {
      logo = GDSC;
    }

  return (
    <button onClick={() => navigate('/viewevents', {state : {data : name}})}>
      <div className="flex items-center justify-center w-full sm:w-1/2 mb-4 md:mb-8"> {/* Responsive width for mobile */}
        <div className="flex items-center justify-center rounded-3xl bg-white p-4 sm:w-40 sm:h-20"> {/* Responsive size for mobile */}
          <div className="flex justify-center items-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gray-300 mr-2"> {/* Placeholder for logo */}
            <img className="rounded-full " src={logo} alt="Committee Logo"></img>
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-center">{name}</h3> {/* Center-aligned name */}
          </div>
        </div>
      </div>
    </button>
  );
}
