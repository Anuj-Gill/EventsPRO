import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventPoster } from './EventPoster';
import { Navbar } from './Navbar';

export function StudentReview() {

    const location = useLocation();
    const passedData = location.state?.data;
    const navigate = useNavigate();
    const [teamCode, setTeamCode] = useState(false);
    const [status, setStatus] = useState(false);
    const [joinMode, setJoinMode] = useState(false);
    const [joinTeamCode, setJoinTeamCode] = useState(false);

    console.log(passedData);

    useEffect(() => {
        async function fetchStatus() {
            const req = await fetch("http://localhost:5000/event/checkstatus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ eventId: passedData._id, teamCode: teamCode })
            });
            const res = await req.json();
            setStatus(res.message);
            if (res.teamCode) {
                setTeamCode(res.teamCode);
            }
            console.log(res);
        }
        fetchStatus();

    }, [])


    async function generateRandomCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters[randomIndex];
        }
        setTeamCode(code);
    }

    if (teamCode) {
        handleRegister();
    }

    console.log("Team code", teamCode);

    function handleRegister() {
        async function handleSubmit() {
            try {
                if (teamCode) {
                    console.log('team code exists', teamCode)
                    const req = await fetch("http://localhost:5000/event/registerEvent", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({ eventId: passedData._id, teamCode: teamCode })
                    });
                    const res = await req.json();
                    console.log(res);
                    setStatus(res.message);
                }
                else {
                    console.log(teamCode)
                    const req = await fetch("http://localhost:5000/event/registerEvent", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({ eventId: passedData._id, })
                    });
                    const res = await req.json();
                    console.log(res);
                    setStatus(res.message);
                    navigate('/confirmation', { state: { data: passedData } })
                }

            }
            catch (error) {
            }
        }
        handleSubmit();
    }





    return (
        <>
        <Navbar />
        <div className='min-h-screen flex justify-center items-center bg-cover bg-no-repeat bg-center '>
            <div className='flex justify-center w-full min-h-screen mt-20'>
                <div className="container mr-5 w-2/6 h-5/6 p-8 bg-white rounded-lg shadow-xl">
                    <div className='flex justify-center'>
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
                        </div>


                    </div>

                    <div>
                        {(status) ?
                            <div className="">
                                <button onClick={() => navigate('/confirmation', { state: { data: passedData } })}>View QR</button>
                                {teamCode && <div>
                                    <h3>Team Code:{teamCode} (Share this team code with you friends to let them join your team!)</h3>
                                </div>}
                            </div>
                            :
                            <div>
                                {passedData?.type === "team" ? (
                                    <div className="flex justify-between">
                                        <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={generateRandomCode}>Create Team</button>
                                        <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={() => setJoinMode(true)}>Join a Team</button>
                                    </div>
                                ) : (
                                    <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={handleRegister}>Register</button>
                                )}
                            </div>
                        }
                        {joinMode ? <div className='mt-10 text-center'>
                            <input type='text' required placeholder='Enter Team Code' className='border-2 border-black rounded-md' onChange={(e) => setJoinTeamCode(e.target.value)}></input>
                            <button onClick={() => {
                                setTeamCode(joinTeamCode);
                                handleRegister
                            }
                            }>Join</button>
                        </div>
                            :
                            <div></div>}
                    </div>




                </div>
                <div className='ml-5'>
                    <EventPoster driveLink={passedData.eventPoster} />
                </div>
            </div>
        </div>
        </>
    );
}