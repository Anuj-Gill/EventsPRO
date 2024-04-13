import { useLocation } from 'react-router-dom'
import ProgressTracker from './ProgressTracker';
import { useEffect, useState } from 'react';

export function EventReview() {

    const location = useLocation();
    const passedData = location.state?.data;
    const curretnStatus = passedData.status;
    const [status, setStatus] = useState(passedData.status);
    console.log(passedData);

    function handleApprove(){
        if(status == "PendingEC"){
            setStatus("PendingHOD");
            
        } 
        else if(status == "PendingHOD") {
            setStatus("PendingCAO");
           
        }
        else {
            setStatus("Approved");
            
        }
        
    }
    
    useEffect(() => {
        async function handleStatusUpdate() {
            console.log(status);
            try {
                const req = await fetch("http://localhost:5000/admin/updateStatus", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({status: status, event: passedData._id})
                })
                const res = await req.json();
                console.log(res);
                setPending(res.pendingEvents);
            }
            catch (error) {
                
            }
        }
        handleStatusUpdate();

    },[status])
    

    console.log(status);

    function handleReject() {
        setStatus == "Rejected"
    }

    return (
        <div className="container mx-auto max-w-4xl  p-8 bg-white rounded-lg shadow-xl">
            <div className="flex flex-col items-center justify-center">
                <h2 className="mb-4 text-2xl font-bold text-center text-blue-700">{passedData.eventName}</h2>
                <p className="mb-2 text-gray-700">{passedData.about}</p>
                <p className="mb-2 font-semibold">{passedData.date}</p>
                <p className="mb-2">Entry Fee: {passedData.entryFee}</p>
                <p className="mb-2">Mode: {passedData.mode}</p>
                <div className="mb-4">
                    <h4 className="font-bold text-lg text-gray-800">Contact Details:</h4>
                    {passedData.contactDetails.map((contact) => (
                        <div key={contact.name} className="flex items-center border-b py-2">
                            <p className="mr-2 font-semibold text-gray-800">{contact.name}:</p>
                            <p className="text-blue-600">{contact.mob}</p>
                        </div>
                    ))}
                </div>
                <p className="mb-2">Prize: {passedData.prize}</p>
                <p className="mb-2">Time: {passedData.time}</p>
                <p className="mb-2">Venue: {passedData.venue}</p>
                <p className="mb-2">Type: {passedData.type}</p>
                <p className="mb-2">WhatsApp Group Link: <a className='text-blue-500' href={passedData.whatsappGroupLink} target='_blank'>{passedData.whatsappGroupLink}</a></p>
                <p className="mb-2">Proposal Link: <a className='text-blue-500' href={passedData.proposalLink} target='_blank'>{passedData.proposalLink}</a></p>
            </div>

            {status == "Approved" ? 
            <div></div>
            :
            <div className='flex justify-around mt-10 mb-20'>
                <button onClick={handleApprove} className='p-2 bg-green-400 text-white'>Approve</button>
                <button onClick={handleReject} className='p-2 bg-red-400 text-white'>Reject</button>

            </div>
            }

            <ProgressTracker status={passedData.status} />
        </div>
    );
}