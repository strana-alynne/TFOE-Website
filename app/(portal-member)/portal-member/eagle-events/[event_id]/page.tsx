"use client";
import EventDetails from "./content";
import { useParams } from "next/navigation";

export default function EventDetailsPage() {
  const params = useParams();
  const id = params?.event_id as string;
  return <EventDetails id={id} />;
}
