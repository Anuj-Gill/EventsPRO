import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function EventReport() {
    const location = useLocation();
    const passedData = location.state?.data;
    const [response, setResponse] = useState();


    useEffect(() => {
        const handleFetch = async () => {
            
            try {
                const req = await fetch("https://playground.jsreport.net/w/Anuj-Gill/I2eKWNW9/api/report", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/pdf",
                    },
                    body: JSON.stringify({
                        "template": { "name": "EventReport", "recipe": "phantom-pdf", "engine": "handlebars",
                         },
                        "data": {
                            "title": passedData.eventName,
                            "objective": "Organinzing a DSA coding competition",
                            "activity_date": passedData.date,
                            "time": passedData.time,
                            "venue": passedData.venue,
                            "conducted_by": passedData.committee,
                            "event_details": passedData.about,
                            "student_strength": "49",
                            "event_summary": "THe event was a great success"
                        },
                        "options": { "reportName": `${passedData.eventName}-${passedData.committee}-Report`}
                    })
                });
                console.log(req);
                const res = await req.blob();
                const fileUrl = URL.createObjectURL(res);
                setResponse(fileUrl);
                console.log(res);
                console.log('inside handle fetch')

            }
            catch (error) {

            }
        }
        handleFetch();
    }, []);

    return (
        <div class="container mx-auto p-6">
  <h1 class="text-2xl font-bold text-center mb-4">Event Report</h1>

  <div class="flex justify-center">
    <a href={response} target="_blank" 
       class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Report
    </a>
  </div>
</div>

    )
}


