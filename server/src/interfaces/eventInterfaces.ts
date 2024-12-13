export interface createEventRequest {
  eventDetails: {
    eventName: string;
    eventPoster: string;
    dateTime: Date;
    venue: string;
    about: string;
    isOnline: boolean;
    prize: string;
    entryFee: number;
    team: boolean;
  };
  jwtPayload: any; // From middleware
  role: string; // From middleware
}

export interface registerRequestBody {
  details: {
    eventId: number;
    teamCode?: string;
  };
  jwtPayload: any;
}

export interface updateEventRequest {
  eventId: number;
  eventDetails: {
    eventName: string;
    eventPoster: string;
    dateTime: Date;
    venue: string;
    about: string;
    isOnline: boolean;
    prize: string;
    entryFee: number;
    team: boolean;
  };
  jwtPayload: any; // From middleware
  role: string; // From middleware
}
