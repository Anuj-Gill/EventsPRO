import bgImage from '../assets/bg.png';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { useEffect, useState } from 'react';

export function EventForm() {
    const [inputs, setInputs] = useState({
        eventName: '',
        eventPoster: '',
        date: '',
        time: '',
        venue: '',
        about: '',
        mode: '',
        socialHandles: '',
        prize: '',
        entryFee: '',
        contactDetails: '',
        type: '',
        whatsappGroupLink: '',
        proposalLink: ''
    });
    const [response, setResponse] = useState('');
    const [eventSuccess, setEventSuccess] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setLoggedIn(true);
        }
    }, []);

    const navigate = useNavigate();

    async function handleForm(e) {
        e.preventDefault();
        
        try {
            console.log('sending req', inputs);
            const req = await fetch("http://localhost:5000/head/createEvent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(inputs)
            });
            const res = await req.json();
            console.log(res);
            setResponse(res.message);
            if (res) {
                console.log(response);
                setEventSuccess(true);
                console.log(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="relative h-screen overflow-y-auto" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}>
        {loggedIn ?
            <div>
                <Navbar />

                <div className="relative mt-60">
                    <div className="absolute inset-0 backdrop-filter backdrop-blur-md bg-opacity-100" />

                    <div className="absolute top-0 left-0 w-full h-full mt-96 flex justify-center items-center">
                        <div className="bg-slate-600 rounded-md max-w-md p-8 ">
                            <form onSubmit={handleForm}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="mb-4 flex flex-col">
                                        <label htmlFor="eventName" className="block text-white text-sm font-bold mt-4 mb-3">Event Name</label>
                                        <input
                                            type="text"
                                            id="eventName"
                                            placeholder="Enter event name"
                                            onChange={(e) => setInputs({ ...inputs, eventName: e.target.value })}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    <div className="mb-4 flex flex-col">
                                        <label htmlFor="eventPoster" className="block text-white text-sm font-bold mb-2">Event Poster (Image url uploaded on drive)</label>
                                        <input
                                            type="url"
                                            id="eventPoster"
                                            onChange={(e) => setInputs({ ...inputs, eventPoster: e.target.value })}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    {/* Add other input fields similarly */}
                                    <div className="mb-4 flex flex-col">
                                    <label htmlFor="eventDate" className="block text-white text-sm font-bold mb-2">Date</label>
                                    <input
                                        type="date"
                                        id="eventDate"
                                        placeholder="Select event date"
                                        onChange={(e) => setInputs({ ...inputs, date: e.target.value })}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4 flex flex-col">
                                    <label htmlFor="eventTime" className="block text-white text-sm font-bold mb-2">Time</label>
                                    <input
                                        type="time"
                                        id="eventTime"
                                        placeholder="Select event time"
                                        onChange={(e) => setInputs({ ...inputs, time: e.target.value })}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4 flex flex-col">
                                    <label htmlFor="eventVenue" className="block text-white text-sm font-bold mt-4 mb-3">Venue</label>
                                    <input
                                        type="text"
                                        id="eventVenue"
                                        placeholder="Enter event venue"
                                        required
                                        onChange={(e) => setInputs({ ...inputs, venue: e.target.value })}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4 flex flex-col">
                                    <label htmlFor="eventAbout" className="block text-white text-sm font-bold mb-2">About (Overview) and Rules</label>
                                    <textarea
                                        id="eventAbout"
                                        placeholder="Enter event overview and rules"
                                        required
                                        onChange={(e) => setInputs({ ...inputs, about: e.target.value })}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    ></textarea>
                                </div>
                                <div className="mb-4 flex flex-col">
                                    <label htmlFor="eventOnlineOffline" className="block text-white text-sm font-bold mt-7 mb-5">Online/Offline</label>
                                    <select
                                        id="eventOnlineOffline"
                                        required
                                        onChange={(e) => setInputs({ ...inputs, mode: e.target.value })}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        <option value="online">Online</option>
                                        <option value="offline">Offline</option>
                                    </select>
                                </div>
                                <div className="mb-4 flex flex-col">
                                    <label htmlFor="eventSocialHandles" className="block text-white text-sm font-bold mb-2">Social Handles (Email, Website, Twitter, Instagram)</label>
                                    <input
                                        type="text"
                                        id="eventSocialHandles"
                                        placeholder="Enter social handles"
                                        onChange={(e) => setInputs({ ...inputs, socialHandles: e.target.value })}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4 flex flex-col">
                                    <label htmlFor="eventPrize" className="block text-white text-sm font-bold mb-2">Prize (optional)</label>
                                    <input
                                        type="text"
                                        id="eventPrize"
                                        placeholder="Enter event prize"
                                        onChange={(e) => setInputs({ ...inputs, prize: e.target.value })}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4 flex flex-col">
                                    <label htmlFor="eventEntryFees" className="block text-white text-sm font-bold mb-2">Entry Fees (optional)</label>
                                    <input
                                        type="text"
                                        id="eventEntryFees"
                                        placeholder="Enter event entry fees"
                                        onChange={(e) => setInputs({ ...inputs, entryFee: e.target.value })}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4 flex flex-col">
                                    <label htmlFor="eventContactDetails" className="block text-white text-sm font-bold mb-2">Contact Details (Name : Mob)</label>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            id="eventContactName"
                                            placeholder="Enter contact name"
                                            required
                                            onChange={(e) => setInputs({ ...inputs, contactDetails: { ...inputs.contactDetails, name: e.target.value } })}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 flex flex-col">
                                    <label htmlFor="eventType" className="block text-white text-sm font-bold mt-2 mb-5">Type (Solo, Team or both)</label>
                                    <select
                                        id="eventType"
                                        required
                                        onChange={(e) => setInputs({ ...inputs, type: e.target.value })}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        <option value="solo">Solo</option>
                                        <option value="team">Team</option>
                                        <option value="both">Both</option>
                                    </select>
                                </div>
                                <div className="mb-4 flex flex-col">
                                    <label htmlFor="whatsappGrpLink" className="block text-white text-sm font-bold mt-7 mb-5">WhatsApp group Link</label>
                                    <input
                                        type="url"
                                        id="whatsappGrpLink"
                                        placeholder="WhatsApp group Link"
                                        required
                                        onChange={(e) => setInputs({ ...inputs, whatsappGroupLink: e.target.value })}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4 flex flex-col">
                                    <label htmlFor="proposalLink" className="block text-white text-sm font-bold mb-2">Proposal link(Document uploaded on committees drive)</label>
                                    <input
                                        type="url"
                                        id="proposalLink"
                                        placeholder="Proposal document"
                                        required
                                        onChange={(e) => setInputs({ ...inputs, proposalLink: e.target.value })}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                </div>
                                <div className="flex justify-center">
                                    <button 
                                        type="submit" 
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Submit Request
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            

                    {eventSuccess && <div className='text-black'>{response}</div>}

                </div> 
                :
                <div><button onClick={() => navigate('/login')}>Log In</button> First</div>
            }
        </div>
    )
}
