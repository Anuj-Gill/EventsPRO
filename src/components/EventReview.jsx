import { useLocation, useNavigate } from 'react-router-dom'
import ProgressTracker from './ProgressTracker';
import { useEffect, useState } from 'react';
import { EventPoster } from './EventPoster';

export function EventReview() {

    const location = useLocation();
    const navigate = useNavigate();
    const passedData = location.state?.data;
    const [status, setStatus] = useState(passedData[0].status);
    const [isPrizeValid, setIsPrizeValid] = useState(false);
    const [floatingScreen, setFloatingScreen] = useState(false);
    const [rejectFloatingScreen, setRejectFloatingScreen] = useState(false);
    const [feedback, setFeedback] = useState('')

    useEffect(() => {
        const regex = /^[0-9]+$/;
        setIsPrizeValid(regex.test(passedData[0].prize));
    }, []);

    console.log(status)

    function handleApprove() {
        if (status == "PendingEC") {
            setStatus("PendingHOD");

        }
        else if ((status == "PendingHOD") && (isPrizeValid)) {
            setStatus("PendingAccounts");

        }
        else if (status == "PendingHOD") {
            setStatus("PendingCAO");

        }
        else if (status == "PendingAccounts") {
            setStatus("PendingCAO")
        }
        else {
            setStatus("Approved");

        }

        setFloatingScreen(true);
        setTimeout(() => {
            navigate('/adminhome');
        }, 2000);

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
                    body: JSON.stringify({ status: status, eventId: passedData[0]._id, feedback: feedback })
                })
                const res = await req.json();
                console.log(res);
                setPending(res.pendingEvents);
            }
            catch (error) {

            }
        }
        handleStatusUpdate();

    }, [status])


    console.log(status);

    function handleReject() {
        setRejectFloatingScreen(true);
    }

    function handleRejectFeedback() {
        setStatus('Rejected');
    }

    return (
        <div className="container mx-auto max-w-4xl  p-8 bg-white rounded-lg shadow-xl">
            <div className='flex'>

                <div className="flex flex-col items-center justify-center">
                    <h2 className="mb-4 text-2xl font-bold text-center text-blue-700">{passedData[0].eventName}</h2>
                    <p className="mb-2 text-gray-700">{passedData[0].about}</p>
                    <p className="mb-2 font-semibold">{passedData[0].date}</p>
                    <p className="mb-2">Entry Fee: {passedData[0].entryFee}</p>
                    <p className="mb-2">Mode: {passedData[0].mode}</p>
                    <div className="mb-4">
                        <h4 className="font-bold text-lg text-gray-800">Contact Details:</h4>
                        {passedData[0].contactDetails.map((contact) => (
                            <div key={contact.name} className="flex items-center border-b py-2">
                                <p className="mr-2 font-semibold text-gray-800">{contact.name}:</p>
                                <p className="text-blue-600">{contact.mob}</p>
                            </div>
                        ))}
                    </div>
                    <p className="mb-2">Prize: {passedData[0].prize}</p>
                    <p className="mb-2">Time: {passedData[0].time}</p>
                    <p className="mb-2">Venue: {passedData[0].venue}</p>
                    <p className="mb-2">Type: {passedData[0].type}</p>
                    <p className="mb-2">WhatsApp Group Link: <a className='text-blue-500' href={passedData[0].whatsappGroupLink} target='_blank'>{passedData.whatsappGroupLink}</a></p>
                    <p className="mb-2">Proposal Link: <a className='text-blue-500' href={passedData[0].proposalLink} target='_blank'>{passedData.proposalLink}</a></p>
                </div>
                <EventPoster driveLink={passedData[0].eventPoster} />
            </div>

            {(status == "Approved" || passedData[1] == "head") ?
                <div></div>
                :
                <div className='flex justify-around mt-10 mb-20'>
                    <button onClick={handleApprove} className='p-2 bg-green-400 text-white'>Approve</button>
                    <button onClick={handleReject} className='p-2 bg-red-400 text-white'>Reject</button>

                </div>
            }

            {floatingScreen && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50" style={{ transition: 'opacity 0.3s ease-in-out' }}>
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <p className="text-center">Thank you for approving the event {passedData[0].eventName}</p>
                    </div>
                </div>
            )}
            {rejectFloatingScreen && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50" style={{ transition: 'opacity 0.3s ease-in-out' }}>
                    <div className="bg-white p-4 rounded-lg shadow-lg ">
                        <form onSubmit={handleRejectFeedback} className='flex flex-col'>
                            <div>
                                <label htmlFor='rejectFeedback'>Feedback</label>
                                <input type="text" id="rejectFeedback" placeholder='Feedback' required onChange={(e) => setFeedback(e.target.value)} />
                            </div>
                            <button type='submit'>Submit</button>
                        </form>

                    </div>
                </div>
            )}

            <ProgressTracker status={passedData[0].status} prize={passedData[0].prize} />
        </div>
    );
}