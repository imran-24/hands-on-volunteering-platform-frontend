export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  isOrganization: boolean;
  bio?: string;
  skills: string[];
  causes: string[];
  profileImage?: string;
  coverImage?: string;
  volunteerHours: number;
  points: number;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
  eventsCreated: Event[];
  eventsJoined: UserEvent[];
  helpRequests: HelpRequest[];
  teamsCreated: Team[];
  teamsJoined: UserTeam[];
  logs: string[];
};

export type Event = {
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  address?: string;
  city?: string;
  country?: string;
  imageUrl?: string;
  isOnline: boolean;
  meetingLink?: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  urgencyLevel?: string;
  organizer: User;
  organizerId: string;
  attendees: UserEvent[];
  logs: string[];
};

export type UserEvent = {
  id: string;
  userId: string;
  eventId: string;
  user: User;
  event: Event;
};

export type HelpRequest = {
  id: string;
  title: string;
  description: string;
  urgency: string;
  createdAt: Date;
  photoUrl?: string;
  userId: string;
  user: User;
  volunteers: string[];
  comments: Comment[];
};

export type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  userId: string;
  user: User;
  helpRequestId: string;
  helpRequest: HelpRequest;
};

export type Team = {
  id: string;
  name: string;
  description?: string;
  type: string;
  createdAt: Date;
  organizer: User;
  organizerId: string;
  members: UserTeam[];
};

export type UserTeam = {
  id: string;
  userId: string;
  teamId: string;
  user: User;
  team: Team;
};

export type VolunteerLog = {
  id: string;
  hours: number;
  verified: boolean;
  createdAt: Date;
  userId: string;
  eventId?: string;
};
