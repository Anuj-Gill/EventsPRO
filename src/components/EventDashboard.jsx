import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';

export function EventDashboard() {
    const location = useLocation();
    const passedData = location.state?.data;
    const [attended, setAttended] = useState(0);
    const [participants, setParticipants] = useState([])
    console.log(passedData);


    useEffect(() => {
        passedData.participants.map((student) => {
            if (student.status) {
                setAttended(attended + 1);
            }
        })
    }, [])

    useEffect(() => {

        async function handleFetch() {
            try {
                const req = await fetch("http://localhost:5000/event/studentDetails", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ eventId: passedData._id })
                })
                const res = await req.json();
                console.log(res);
                setParticipants(res.participants)

            }
            catch (error) {

            }
        }
        handleFetch();
    }, [])



    return (
        <div className="container mx-auto p-6"> 
          <h1 className='text-center font-bold text-4xl mb-5'>{passedData.eventName}</h1>
    
          <div className='grid grid-cols-3 gap-6 mb-5'> 
            <div className="bg-blue-100 rounded-lg shadow-md p-4"> 
              <h2 className="text-lg font-medium text-blue-700 mb-2">Registered</h2>
              <div className="text-3xl font-bold text-center text-blue-900">{passedData.participants.length}</div>
            </div>
            <div className="bg-green-100 rounded-lg shadow-md p-4">
              <h2 className="text-lg font-medium text-green-700 mb-2">Attended</h2>
              <div className="text-3xl font-bold text-center text-green-900">{attended}</div>
            </div>
            <div className="bg-yellow-100 rounded-lg shadow-md p-4"> 
              <h2 className="text-lg font-medium text-yellow-700 mb-2">Attendance Chart</h2>
              <div>Pie Chart Goes Here</div> 
            </div> 
          </div>
    
          <div className="overflow-x-auto"> 
            <table className="w-full table-auto"> 
              <thead className='text-left'>
                <tr>
                  <th className="px-4 py-2">Name</th> 
                  <th className="px-4 py-2">Roll Number</th> 
                  <th className="px-4 py-2">Email</th> 
                  <th className="px-4 py-2">Branch</th> 
                  <th className="px-4 py-2">Year</th> 
                  <th className="px-4 py-2">Gender</th>
                  <th className="px-4 py-2">Status</th> 
                </tr>
              </thead>
              <tbody>
                {participants.map((student) => {
                  return (
                    <tr key={student.rollNo} className="hover:bg-gray-100"> 
                      <td className="px-4 py-2">{student.name}</td>
                      <td className="px-4 py-2">{student.rollNo}</td>
                      <td className="px-4 py-2">{student.email}</td>
                      <td className="px-4 py-2">{student.branch}</td>
                      <td className="px-4 py-2">{student.year}</td> 
                      <td className="px-4 py-2">{student.gender}</td>
                      <td className="px-4 py-2"> 
                        {student.status === "Present" ? (
                          <span className="text-green-500">Present</span>
                        ) : (
                         <span className="text-yellow-500">Pending</span>
                        )}
                      </td> 
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );

}