import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { checkRegistered, getEventDetails, registerForEvent, registerTeam } from "../api/eventApi";
import { Event } from "../interfaces/eventInterface";
import EventDetailsContent from "../components/Event/EventDetailsContent";
import { extractEmbedCode } from "../utils/ExtractEmbedCode";
import { MultiStepLoader } from "../components/ui/multi-step-loader";
import { loggedinStatusState } from "../store/atoms/LoginStatus";
import { useRecoilValue } from "recoil";
import Loading from "../components/Helpers/Loading";
import { getSocialHandlesUsersApi } from "../api/committeeApi";

const loadingStates = [
  { text: "Retrieving event details" },
  { text: "Verifying event availability" },
  { text: "Preparing registration process" },
  { text: "Generating unique registration token" },
  { text: "Creating personalized QR code" },
  { text: "Sending confirmation email" },
  { text: "Finalizing registration" },
];

const createTeamLoadingStates = [
  { text: "Retrieving event details" },
  { text: "Preparing registration process" },
  { text: "Creating your team code" },
  { text: "Setting up team registration" },
  { text: "Creating personalized QR code" },
  { text: "Sending confirmation email" },
  { text: "Finalizing registration" },
];

const joinTeamLoadingStates = [
  { text: "Retrieving event details" },
  { text: "Validating team code" },
  { text: "Finding your teammates" },
  { text: "Adding you to the team" },
  { text: "Creating personalized QR code" },
  { text: "Sending confirmation email" },
  { text: "Finalizing registration" },
];

const EventDetailsPage = () => {
  const [event, setEvent] = useState<Event | null>(null);
  const [teamAction, setTeamAction] = useState<"create" | "join" | null>(null);
  const [teamCode, setTeamCode] = useState("");
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [registrationError, setRegistrationError] = useState(false);
  const navigate = useNavigate();
  const eventName = searchParams.get("eventName");
  const [qrCode, setQrCode] = useState("");
  const [registered, setRegistered] = useState(false);
  const loggedIn = useRecoilValue(loggedinStatusState);
  const [teamMembers, setTeamMembers] = useState([]);
  const [pubs, setPubs] = useState([]);
  const [socialHandles, setSocialHandles] = useState([]);

  useEffect(() => {
    const getDetails = async () => {
      if (eventName) {
        try {
          const response = await getEventDetails(eventName);
          const url = extractEmbedCode(response.data.eventDetails.eventPoster);
          const updatedEvent = {
            ...response.data.eventDetails,
            eventPoster: url,
          };
          setEvent(updatedEvent);
          setPubs(response.data.pubs || []);
        } catch (error) {
          console.error("Error fetching event details:", error);
        } finally {
          setInitialLoading(false);
        }
      }
    };

    getDetails();
  }, [eventName]);

  useEffect(() => {
    const fetchSocialHandles = async () => {
      try {
        console.log("fetching sc from db");
        const response = await getSocialHandlesUsersApi(Number(event?.committeeId));
        console.log(response);
        setSocialHandles(response.data.socialHandles);
      } catch (err) {
        console.error(err);
      } finally {
      }
    };

    fetchSocialHandles();
  }, [event]);


  useEffect(() => {
    const check = async () => {
      if (event?.id) {
        try {
          const response = await checkRegistered({ eventId: event.id });
          console.log(response);
          if (response.data.status) {
            setRegistered(true);
            setQrCode(response.data.qrCode);
            if (response.data.teamCode) {
              setTeamCode(response.data.teamCode);
              const teamMembersNames = response.data.teamMembers?.map((member: any) => member.user.name);
              console.log(teamMembersNames);
              setTeamMembers(teamMembersNames)
            }
          }
        } catch (error) {
          console.error("Error checking registration status:", error);
        }
      }
    };

    check();
  }, [event]);

  const register = async () => {
    setLoading(true);

    try {
      const response = await registerForEvent({ eventId: event?.id as number, teamCode });
      if (response.data.qrCode) {
        setQrCode(response.data.qrCode);
        if (response.data.teamMembers) {
          const teamMembersNames = response.data.teamMembers?.map((member: any) => member.user.name);
          console.log(teamMembersNames);
          setTeamMembers(teamMembersNames)
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setRegistrationError(true);
    }
  };

  const createTeam = async () => {
    setLoading(true);
    try {
      console.log("creating team!");
      const response = await registerTeam({ eventId: event?.id as number });
      if (response.data.qrCode) {
        setQrCode(response.data.qrCode);
        setTeamCode(response.data.teamCode);
        if (response.data.teamMembers) {
          const teamMembersNames = response.data.teamMembers?.map((member: any) => member.user.name);
          console.log(teamMembersNames);
          setTeamMembers(teamMembersNames)
        }
      }
      console.log(response);
    } catch (error) {
      console.error("Error during creating team:", error);
    }
  }

  // Show loading component while fetching event details
  if (initialLoading) {
    return <Loading text="Fetching Event Details" />;
  }

  // If event is not found after loading
  if (!event) {
    return (
      <div className="text-white min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Event Not Found</h2>
          <p className="text-gray-400 text-2xl">The event you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" ">
      <MultiStepLoader
        loadingStates={
          teamAction === "create"
            ? createTeamLoadingStates
            : teamAction === "join"
              ? joinTeamLoadingStates
              : loadingStates // Default loadingStates for general event registration
        }
        loading={loading}
        duration={2000}
        onComplete={() => {
          if (!registrationError) {
            navigate("/event/register/success", { state: { qrCode, eventName: event.eventName, teamCode, teamMembers } });
          }
        }}
        onError={() => {
          setLoading(false);
          setRegistrationError(true);
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 ">
        <EventDetailsContent
          event={event}
          teamAction={teamAction}
          setTeamAction={setTeamAction}
          register={loggedIn ? register : null}
          registered={registered}
          qrCode={qrCode}
          createTeam={loggedIn ? createTeam : null}
          setTeamCode={setTeamCode}
          teamCode={teamCode}
          teamMembers={teamMembers}
          pubs={pubs}
          socialHandles={socialHandles}
          loginButton={!loggedIn ? (
            <Link
              to="/login"
              state={{ from: `/event?eventName=${eventName}` }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In to Register
            </Link>
          ) : null}
        />
      </div>
    </div>
  );
};

export default EventDetailsPage;
