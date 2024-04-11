import { useNavigate } from 'react-router-dom'
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

    const handleInputChange = (event) => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            [event.target.name]: event.target.value,
        }));
    };
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setLoggedIn(true);
        }
    }), []
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
            })
            const res = await req.json();
            console.log(res);
            setResponse(res.message);
            if (res) {
                console.log(response)
                setEventSuccess(true);
                console.log(response)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {loggedIn ?
                <div>
                    <Navbar />
                   <div>
                    <form className="max-w-md mx-auto mt-16" onSubmit={handleForm}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventName">
                                Event Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="eventName"
                                type="text"
                                placeholder="Enter event name"
                                onChange={(e) => setInputs({ ...inputs, eventName: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventPoster">
                                Event Poster (Image url uploded on drive)
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="eventPoster"
                                type="url"
                                onChange={(e) => setInputs({ ...inputs, eventPoster: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventDate">
                                Date
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="eventDate"
                                type="date"
                                placeholder="Select event date"
                                onChange={(e) => setInputs({ ...inputs, date: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventTime">
                                Time
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="eventTime"
                                type="time"
                                placeholder="Select event time"
                                onChange={(e) => setInputs({ ...inputs, time: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventVenue">
                                Venue
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="eventVenue"
                                type="text"
                                placeholder="Enter event venue"
                                required
                                onChange={(e) => setInputs({ ...inputs, venue: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventAbout">
                                About (Overview) and Rules
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="eventAbout"
                                placeholder="Enter event overview and rules"
                                required
                                onChange={(e) => setInputs({ ...inputs, about: e.target.value })}
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventOnlineOffline">
                                Online/Offline
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="eventOnlineOffline" required onChange={(e) => setInputs({ ...inputs, mode: e.target.value })}
                            >
                                <option value="online">Online</option>
                                <option value="offline">Offline</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventSocialHandles">
                                Social Handles (Email, Website, Twitter, Instagram)
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="eventSocialHandles"
                                type="text"
                                placeholder="Enter social handles"
                                onChange={(e) => setInputs({ ...inputs, socialHandles: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventPrize">
                                Prize (optional)
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="eventPrize"
                                type="text"
                                placeholder="Enter event prize"
                                onChange={(e) => setInputs({ ...inputs, prize: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventEntryFees">
                                Entry Fees (optional)
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="eventEntryFees"
                                type="text"
                                placeholder="Enter event entry fees"
                                onChange={(e) => setInputs({ ...inputs, entryFee: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventContactDetails">
                                Contact Details (Name : Mob)
                            </label>
                            <div className="flex">
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="eventContactName"
                                    type="text"
                                    placeholder="Enter contact name"
                                    required
                                    onChange={(e) => setInputs({ ...inputs, contactDetails: { ...inputs.contactDetails, name: e.target.value } })}
                                />
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="eventContactMob"
                                    type="text"
                                    placeholder="Enter contact mobile number"
                                    required
                                    onChange={(e) => setInputs({ ...inputs, contactDetails: { ...inputs.contactDetails, mob: e.target.value } })}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventType">
                                Type (Solo, Team or both)
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="eventType" required onChange={(e) => setInputs({ ...inputs, type: e.target.value })}
                            >
                                <option value="solo">Solo</option>
                                <option value="team">Team</option>
                                <option value="both">Both</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventEntryFees">
                                WhatsApp group Link
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="whatsappGrpLink"
                                type="url"
                                placeholder="WhatsApp group Link"
                                required
                                onChange={(e) => setInputs({ ...inputs, whatsappGroupLink: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventEntryFees">
                                Proposal link(Document uploaded on committees drive)
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="proposalLink"
                                type="url"
                                placeholder="Proposal document"
                                required
                                onChange={(e) => setInputs({ ...inputs, proposalLink: e.target.value })}
                            />
                        </div>
                        <button type="submit">Submit Request</button>

                    </form>
                </div>
                    {eventSuccess && <div className='text-black'>{response}</div>}

                   </div> 
                :
                <div><button onClick={() => navigate('/login')}>Log In</button> First</div>
            }
        </div>
    )
}