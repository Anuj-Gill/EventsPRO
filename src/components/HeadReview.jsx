import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { EventPoster } from './EventPoster';

export function HeadReview() {

    const location = useLocation();
    const passedData = location.state?.data;
    const navigate = useNavigate();
    console.log(passedData._id);
    const [popup, setPopup] = useState(false)



    useEffect(() => {


    }, []);

    function handleDelete() {
        setPopup(true)
        async function handleDeleteUpdate() {
            try {
                const req = await fetch("http://localhost:5000/head/deleteevent", {
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
                navigate('/headevents')
            }
            catch (error) {

            }
        }

        handleDeleteUpdate();
    }

   

    return (
        <div className="container mx-auto max-w-4xl  p-8 bg-white rounded-lg shadow-xl">
            <div className='flex'>
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
                <EventPoster driveLink={passedData.eventPoster} />
            </div>

            {passedData.status == "Approved" ?
                <div className='flex justify-between'>
                    <button onClick={() => navigate('/eventdashboard', { state: { data: passedData } })}>Event Dashboard</button>
                    <button onClick={() => navigate('/eventreport' , { state: { data: passedData } })}>Generate Report</button>
                    <button onClick={() => setPopup(true)}>Delete Event</button>
                </div>
                :
                <div></div>
            }

            {popup && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50" style={{ transition: 'opacity 0.3s ease-in-out' }}>
                    <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col">
                        <div>
                            Are you sure you want to delete this event
                        </div>
                        <div className='flex justify-between mt-5'>
                            <div>
                                <button className='bg-red-400 text-white p-2 rounded-lg' onClick={handleDelete}>Delete Event</button>

                            </div>
                            <div>
                                <button className='bg-blue-500 p-2 rounded-lg text-white' onClick={() => setPopup(false)}>No</button>

                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}