import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { EventPoster } from './EventPoster';

export function HeadReview() {

    const location = useLocation();
    const passedData = location.state?.data;
    const navigate = useNavigate();
    console.log(passedData);



    useEffect(() => {


    }, [])

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
                    <button>Delete Event</button>
                </div>
                :
                <div></div>
            }
        </div>
    );
}