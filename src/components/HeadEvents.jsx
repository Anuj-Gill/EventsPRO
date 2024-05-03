import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export function HeadEvents() {

    const [pending, setPending] = useState([]);
    const [approved, setApproved] = useState([]);
    const [role, setRole] = useState("Event Coordinator");
    const navigate = useNavigate();

    useEffect(() => {
        async function handleFetch() {
            try {
                const req = await fetch("http://localhost:5000/admin/fetchEvents", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                })
                const res = await req.json();
                console.log(res);
                setRole(res.role);
                setPending(res.pendingEvents);
                setApproved(res.approvedEvents)
            }
            catch (error) {

            }
        }
        handleFetch();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl">Hello {role}</h1>
                <div className="font-bold text-lg mb-4">Approved Events</div>
                <div className="flex flex-wrap">
                    {approved.map((event) => {
                        return (
                            <div key={event._id} className="bg-gray-100 p-4 rounded-md mr-4 mb-4 w-1/2 sm:w-1/3 md:w-1/4">
                                <div className="text-gray-700 font-semibold text-3xl">{event.committee}</div>
                                <div className="text-gray-500 text-lg">{event.eventName}</div>
                                <button
                                    onClick={() => navigate('/headreview', { state: { data: event } })}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded-md focus:outline-none focus:shadow-outline"
                                >
                                    View Details
                                </button>
                            </div>
                        );
                    })}
                </div>
            <div className="bg-white shadow-md rounded-md p-4">
                <div className="font-bold text-lg mb-4">Pending Events</div>
                <div className="flex flex-wrap">
                    {pending.map((event) => {
                        return (
                            <div key={event._id} className="bg-gray-100 p-4 rounded-md mr-4 mb-4 w-1/2 sm:w-1/3 md:w-1/4">
                                <div className="text-gray-700 font-semibold text-3xl">{event.committee}</div>
                                <div className="text-gray-500 text-lg">{event.eventName}</div>
                                <button
                                    onClick={() => navigate('/eventreview', { state: { data: [event, role] } })}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded-md focus:outline-none focus:shadow-outline"
                                >
                                    View Details
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

    );
}