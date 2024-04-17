import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import React from 'react';
import * as FileSaver from 'file-saver';

export function Confirmation() {
    const location = useLocation();
    const passedData = location.state?.data;
    console.log(passedData);
    const [response, setResponse] = useState({
        message: "",
        status: false
    });
    const [src, setSrc] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [eventName, setEventName] = useState(passedData.eventName)

    useEffect(() => {
        console.log("Indside handleQRForm");
        async function fetchQr() {
            try {
                const req = await fetch("http://localhost:5000/qr/generateqr", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ eventId: passedData._id })
                })
                const res = await req.json();
                if (res.status) {
                    setSrc(res.src);
                    setResponse({ message: "QR generated successfully!!", status: true });
                    setRollNo(res.rollNo);
                }
                else {
                    setResponse({ message: res.message, status: true })
                }

            }
            catch (error) {
                console.log(error)
            }
        }
        fetchQr();
    }
        , []);

        const downloadImage = (imageSrc, filename) => {
            FileSaver.saveAs(imageSrc, `${rollNo}-${eventName}-QRCode`);
        }

        return (
            <div className="container mx-auto p-6"> 
              <div className="bg-white rounded-lg shadow-md p-8"> 
                <h1 className="text-2xl font-bold text-center mb-4">
                  Yayyy!! You have successfully registered for the event!!
                </h1>
          
                <div className="flex flex-col items-center"> 
                  <h2 className="text-xl font-bold mb-2">QR Code</h2>
          
                  {response.status && (
                    <div className="mt-4">
                      <h3 className="text-lg font-medium mb-2">{response.message}</h3>
                      <img src={src} alt="QR Code" className="w-48 border border-gray-300 rounded" />
                      <button 
                        onClick={() => downloadImage(src, 'qr-code.png')}
                        className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium"
                      >
                        Download
                      </button> 
                    </div>
                  )}
          
                  {!response.status && (
                    <div className="mt-4 text-red-600 font-bold">
                      {response.message}
                    </div>
                  )}
                </div>
          
                <div className="mt-6">
                  <a href={passedData.whatsappGroupLink} target='_blank' className="text-blue-500 hover:underline">WhatsApp group link</a>
                </div>
              </div> 
            </div> 
          );
}