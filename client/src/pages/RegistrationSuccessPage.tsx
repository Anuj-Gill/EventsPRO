import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EventRegistrationSuccess from '../components/Event/EventRegistrationSuccess';


export const RegistrationSuccessPage = () => {
  const { state } = useLocation();
  const { qrCode, eventName, teamCode, teamMembers } = state;
  const navigate = useNavigate();
  console.log(qrCode, eventName, teamCode, teamMembers);

  const onDashboardClick = () => {
    navigate("/dashboard");
  }

  return (
    <EventRegistrationSuccess
      qrCodeBase64={qrCode}
      eventName={eventName}
      onDashboardClick={onDashboardClick}
      teamCode={teamCode}
      teamMembers={teamMembers}
    />
  )

}
