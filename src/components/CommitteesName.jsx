import { useNavigate } from "react-router-dom";

export function CommitteesName({ name, logo }) {

  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/viewevents', {state : {data : name}})}>
      <div className="flex items-center justify-center w-full sm:w-1/2 mb-4 md:mb-8"> {/* Responsive width for mobile */}
        <div className="flex items-center justify-center rounded-3xl bg-white p-4 sm:w-40 sm:h-20"> {/* Responsive size for mobile */}
          <div className="flex justify-center items-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-300 mr-2"> {/* Placeholder for logo */}
            {/* Placeholder for logo */}
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-center">{name}</h3> {/* Center-aligned name */}
          </div>
        </div>
      </div>
    </button>
  );
}
