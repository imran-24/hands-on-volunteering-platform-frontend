export const options = [
  { id: 1, value: "details", label: "details" },
  { id: 2, value: "edit", label: "edit" },
  { id: 3, value: "history", label: "history" },
  { id: 4, value: "contributions", label: "contributions" },
];

export const shortcutCreateOptions = [
  { id: 1, value: "event", label: "event" },
  { id: 2, value: "meet", label: "meet" },
];

export const cardOptions = [
  { id: 1, value: "details", label: "details" },
  { id: 2, value: "attendees", label: "attendees" },
];

export const causes = [
  { value: "environmental_conservation", label: "Environmental Conservation" },
  { value: "disaster_relief", label: "Disaster Relief" },
  { value: "education_tutoring", label: "Education & Tutoring" },
  { value: "animal_welfare", label: "Animal Welfare" },
  { value: "elderly_care", label: "Elderly Care" },
  { value: "healthcare_medical", label: "Healthcare & Medical Assistance" },
  { value: "hunger_homelessness", label: "Hunger & Homelessness" },
  { value: "mental_health", label: "Mental Health Support" },
  { value: "women_empowerment", label: "Women Empowerment" },
  { value: "children_youth", label: "Children & Youth Development" },
  { value: "community_development", label: "Community Development" },
  { value: "disability_support", label: "Disability Support" },
  { value: "lgbtq_support", label: "LGBTQ+ Support" },
  { value: "human_rights", label: "Human Rights & Advocacy" },
  { value: "arts_culture", label: "Arts & Culture" },
  { value: "tech_for_good", label: "Technology for Good" },
  { value: "refugee_assistance", label: "Refugee Assistance" },
  { value: "crisis_helplines", label: "Crisis Helplines" },
  { value: "blood_organ_donation", label: "Blood & Organ Donation" },
  { value: "legal_aid", label: "Legal Aid & Justice" },
];

export const skills = [
  { value: "teaching_mentoring", label: "Teaching & Mentoring" },
  { value: "event_planning", label: "Event Planning" },
  { value: "first_aid_cpr", label: "First Aid & CPR" },
  { value: "fundraising", label: "Fundraising" },
  { value: "graphic_design", label: "Graphic Design" },
  { value: "web_development", label: "Web Development" },
  { value: "social_media", label: "Social Media Management" },
  { value: "public_speaking", label: "Public Speaking" },
  { value: "community_outreach", label: "Community Outreach" },
  { value: "crisis_counseling", label: "Crisis Counseling" },
  { value: "legal_assistance", label: "Legal Assistance" },
  { value: "project_management", label: "Project Management" },
  { value: "translation", label: "Translation & Interpretation" },
  { value: "disaster_response", label: "Disaster Response" },
  { value: "sustainable_agriculture", label: "Sustainable Agriculture" },
  { value: "elderly_companionship", label: "Elderly Companionship" },
  { value: "content_writing", label: "Content Writing" },
  { value: "data_analysis", label: "Data Analysis" },
  { value: "medical_assistance", label: "Medical Assistance" },
  { value: "photography_videography", label: "Photography & Videography" },
];

import {
  Home,
  Users,
  PlusCircle,
  BarChart,
  Settings,
  LifeBuoy,
  MessageCircle,
  Trophy,
  User,
} from "lucide-react";

export const routes = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Discover Events",
    url: "/events",
    icon: Users,
  },
  {
    title: "Community Help",
    url: "/help-requests",
    icon: LifeBuoy,
  },
  {
    title: "Create Event",
    url: "/create-event",
    icon: PlusCircle,
  },
  {
    title: "Discover Teams",
    url: "/teams",
    icon: Users,
  },
  {
    title: "Impact Tracker",
    url: "/impact",
    icon: BarChart,
  },
  {
    title: "Leaderboard",
    url: "/leaderboard",
    icon: Trophy,
  },
  {
    title: "Messages",
    url: "/messages",
    icon: MessageCircle,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export const generateImageUid = (
  userId: string,
  title: string,
  description: string
) => {
  const baseString = `${userId}-${title}-${description}`;
  const hash = baseString
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return hash.slice(0, 64).padEnd(64, "x");
};

const YOUR_BUCKET_NAME = "file-store-9bc94.appspot.com";

export const extractFilePath = (downloadURL: string | undefined) => {
  if(downloadURL == undefined) return null;
  
  const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${YOUR_BUCKET_NAME}/o/`;
  if (!downloadURL.startsWith(baseUrl)) return null;

  const encodedPath = downloadURL.replace(baseUrl, "").split("?")[0]; // Remove query params
  return decodeURIComponent(encodedPath); // Decode the path to get the original file path
};


export const randomSelect = (list: string[]) =>
  list[Math.floor(Math.random() * list.length)]; // Pick a random gradient

export const helpRequests = [
  {
    title: "Urgent Blood Donation Needed",
    description:
      "A patient requires an immediate O+ blood donation at City Hospital. Please help if you can!",
    urgency: "urgent",
  },
  {
    title: "Help Needed for Senior Home Cleanup",
    description:
      "Looking for volunteers to assist in cleaning and organizing a local senior care home this weekend.",
    urgency: "medium",
  },
  {
    title: "Food Drive Assistance Required",
    description:
      "We need extra hands to distribute food packages to underprivileged families in the community.",
    urgency: "high",
  },
  {
    title: "Tutors Needed for Underprivileged Kids",
    description:
      "Seeking volunteers to provide online tutoring sessions for children struggling in school.",
    urgency: "medium",
  },
  {
    title: "Pet Shelter Needs Volunteers",
    description:
      "Our animal shelter is overcrowded, and we need help walking dogs and cleaning shelters.",
    urgency: "low",
  },
  {
    title: "Emergency Flood Relief Support",
    description:
      "Volunteers needed to help distribute emergency supplies to families affected by recent flooding.",
    urgency: "urgent",
  },
  {
    title: "Help Organizing a Beach Cleanup",
    description:
      "Join us for a weekend cleanup to restore the beauty of our local beach. Every hand helps!",
    urgency: "medium",
  },
  {
    title: "Tech Support for Nonprofits",
    description:
      "Local NGOs need assistance setting up websites and managing online donations. Any tech experts willing to help?",
    urgency: "low",
  },
  {
    title: "Assist at a Homeless Shelter",
    description:
      "Our shelter is short on staff. Volunteers are needed to serve meals and provide support to those in need.",
    urgency: "high",
  },
  {
    title: "School Supply Donation Drive",
    description:
      "Looking for volunteers to help pack and distribute school supplies for children in need.",
    urgency: "medium",
  },
];

export const avatars = [
  "/src/assets/avatars/toon_1.png",
  "/src/assets/avatars/toon_2.png",
  "/src/assets/avatars/toon_3.png",
  "/src/assets/avatars/toon_4.png",
  "/src/assets/avatars/toon_5.png",
  "/src/assets/avatars/toon_6.png",
  "/src/assets/avatars/toon_7.png",
  "/src/assets/avatars/toon_8.png",
  "/src/assets/avatars/toon_9.png",
  "/src/assets/avatars/toon_10.png",
];

export const solidBgColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-indigo-500",
  "bg-gray-800",
  "bg-lime-600",
  "bg-cyan-600",
  "bg-rose-600",
  "bg-emerald-600",
  "bg-fuchsia-600",
  "bg-violet-700",
  "bg-amber-600",
  "bg-sky-600",
  "bg-slate-700",
  "bg-zinc-700",
];

export const eventCategories = [
  { key: "environment", label: "Environment & Sustainability" },
  { key: "education", label: "Education & Mentorship" },
  { key: "healthcare", label: "Healthcare & Wellness" },
  { key: "animal_welfare", label: "Animal Welfare & Rescue" },
  { key: "disaster_relief", label: "Disaster Relief & Emergency Response" },
  { key: "community_service", label: "Community Service & Outreach" },
  { key: "social_justice", label: "Social Justice & Advocacy" },
  { key: "senior_care", label: "Senior & Elderly Care" },
  { key: "child_welfare", label: "Child Welfare & Protection" },
  { key: "homeless_support", label: "Homeless Support & Housing" },
  { key: "mental_health", label: "Mental Health Awareness" },
  { key: "arts_culture", label: "Arts, Culture & Heritage" },
  { key: "sports_fitness", label: "Sports & Fitness Volunteering" },
  { key: "technology", label: "Tech for Good & Digital Literacy" },
  { key: "fundraising", label: "Fundraising & Nonprofit Support" },
  { key: "food_security", label: "Food Security & Hunger Relief" },
  { key: "disability_support", label: "Disability Support & Inclusion" },
  { key: "women_empowerment", label: "Women Empowerment & Gender Equality" },
  { key: "refugee_support", label: "Refugee Assistance & Integration" },
  { key: "youth_development", label: "Youth Development & Leadership" },
];

export const gradients = [
  "bg-gradient-to-r from-purple-200 to-indigo-300",
  "bg-gradient-to-r from-blue-200/50 to-cyan-300",
  "bg-gradient-to-r from-teal-200 to-emerald-300",
  "bg-gradient-to-r from-rose-200/40 to-fuchsia-300",
  "bg-gradient-to-r from-amber-200 to-orange-300",
  "bg-gradient-to-r from-pink-400 to-red-500",
  "bg-gradient-to-r from-blue-500 to-violet-600",
  "bg-gradient-to-r from-green-400 to-lime-500",
  "bg-gradient-to-r from-yellow-400 to-orange-500",
  "bg-gradient-to-r from-cyan-400 to-teal-500",
  "bg-gradient-to-r from-gray-800 to-gray-900",
  "bg-gradient-to-r from-slate-700 to-indigo-800",
  "bg-gradient-to-r from-zinc-700 to-neutral-800",
  "bg-gradient-to-r from-teal-800 to-emerald-900",
  "bg-gradient-to-r from-blue-900 to-purple-900",
  "bg-gradient-to-r from-lime-200/60 to-teal-200/70",
  "bg-gradient-to-r from-indigo-200/50 to-purple-300/60",
  "bg-gradient-to-r from-fuchsia-200/40 to-pink-300/60",
  "bg-gradient-to-r from-sky-200/50 to-cyan-300/70",
  "bg-gradient-to-r from-rose-200/20 to-amber-300/60",
];
