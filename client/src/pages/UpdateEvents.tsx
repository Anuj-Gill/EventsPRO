import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getEventDetails } from "../api/eventApi";
import Loading from "../components/Helpers/Loading";
import EventForm from "../components/Event/EventForm";
import { updateEvent } from "../api/eventApi";
const UpdateEvent: React.FC = () => {
  const [search] = useSearchParams();
  const eventName = search.get("name");
  const [formData, setFormData] = useState<any>(null); // Adjust the type to match your API response
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      if (eventName) {
        try {
          const response = await getEventDetails(eventName);
          setFormData(response?.data?.eventDetails);

        } catch (error) {
          console.error("Error fetching event details:", error);
        } finally {
          setInitialLoading(false);
        }
      }
    };

    getDetails();
  }, [eventName]);


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
      const response = await updateEvent(eventDetails, formData.id);
    } catch (error) {
      console.error("Error creating event!", error);
    }
  };


  if (initialLoading) {
    return <Loading text="Fetching Event Details" />;
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">
        Update Event
      </h1>
      <EventForm
        formData={formData}
        onChange={onChange}
        onSubmit={onSubmit}
        buttonText="Update Event"
      />
    </div>
  );
};

export default UpdateEvent;
