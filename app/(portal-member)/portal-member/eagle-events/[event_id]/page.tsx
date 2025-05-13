"use client";
import EventDetails from "./content";
import { useParams } from "next/navigation";

export default function EventDetailsPage() {
  const params = useParams();
  console.log("Params:", params);
  const id = params?.event_id as string;
  console.log("Event ID:", id);
  return <EventDetails id={id} />;
}
