import { useEffect, useState } from "react"


export function AdminHome() {
    const [pending, setPending] = useState([]);
    const [approved, setApproved] = useState([]);

    
    useEffect(() => {
        async function handleFetch() {
            try {
                const req = await fetch("http://localhost:5000/admin/fetchEvents", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                })
                const res = await req.json();
                console.log(res);
                setPending(res.pendingEvents);
                setApproved(res.approvedEvents);
            } 
            catch (error) {
        
            }
        }
        handleFetch();
    },[]);
    setTimeout(() => {

        console.log(pending)
        console.log(approved)
    },2000)

    

    return (
        <div>
            <div>
                <div>Pending Events</div>
                <div>

                </div>
            </div>
            <div>
                <div>Approved Events</div>
                <div></div>
            </div>
        </div>
    )
}