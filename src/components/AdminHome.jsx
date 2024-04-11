import { useState } from "react"


export function AdminHome() {
    const [pending, setPending] = useState([]);
    const [approved, setApproved] = useState([]);

    const handleFetch = async (e) => {
        e.preventDefault();

        try {
            const req = await fetch("http://localhost:5000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(inputs)
            })
            const res = await req.json();
        } 
        catch (error) {

        }
    }

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