import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function RegisterForm() {

    const location = useLocation();
    const navigate = useNavigate();
    const passedData = location.state?.data;
    console.log(passedData);

    function handleRegister(e) {
        e.preventDefault();
        async function handleSubmit() {
            try {
                const req = await fetch("http://localhost:5000/event/registerEvent", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({eventId: passedData._id})
                })
                const res = await req.json();
                console.log(res);
            }
            catch (error) {
        }
        }
        handleSubmit();
}


    return (
        <div>
            <form className="max-w-md mx-auto">
                <label htmlFor="phoneNumber" className="block mb-2">Phone Number:</label>
                <input type="text" id="phoneNumber" name="phoneNumber" className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />

                {passedData?.type === "team" ? (
                    <div className="flex justify-between">
                        <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Register Team</button>
                        <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Join a Team</button>
                    </div>
                ) : (
                    <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={handleRegister}>Register</button>
                )}
            </form>
        </div>
    );
}