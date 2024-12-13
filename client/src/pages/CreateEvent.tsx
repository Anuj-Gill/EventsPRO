import React, { useState } from "react";
import { createEvent } from "../api/eventApi";
import EventForm from "../components/Event//EventForm";

const CreateEvent: React.FC = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    eventPoster: "",
    date: "",
    time: "",
    venue: "",
    about: "",
    isOnline: false,
    prize: "",
    entryFee: "0.0",
    team: false,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dateTime = new Date(`${formData.date}T${formData.time}:00`).toISOString();
      const eventDetails = {
        ...formData,
        dateTime,
        date: undefined,
        time: undefined,
      };
      const response = await createEvent(eventDetails);
      console.log("Event created successfully!", response.data);
    } catch (error) {
      console.error("Error creating event!", error);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">
          Create New Event
        </h1>
        <EventForm
          formData={formData}
          onChange={onChange}
          onSubmit={onSubmit}
          buttonText="Create Event"
        />
      </div>
    </div>
  );
};

export default CreateEvent;
