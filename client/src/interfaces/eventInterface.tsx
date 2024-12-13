export interface Event {
  id: number;
  eventName: string;
  eventPoster: string;
  dateTime: Date;
  venue: string;
  about: string;
  isOnline: boolean;
  prize: string;
  entryFee: number;
  team: boolean;
  committee?: any;
  committeeId?: number
}
