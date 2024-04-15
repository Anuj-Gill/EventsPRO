import { useLocation } from 'react-router-dom'
import ProgressTracker from './ProgressTracker';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function StudentReview() {

    const location = useLocation();
    const navigate = useNavigate();
    const passedData = location.state?.data;
    console.log(passedData);

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
                <button onClick={() => navigate("/registerform", {state: {data: passedData}})} className='p-2 bg-green-400 text-white'>Register</button>

            </div>
            }
        </div>
    );
}