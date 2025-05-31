"use server";

import { AnyAaaaRecord } from "node:dns";

export async function getDetails(token: any) {
  try {
    const response = await fetch(
      `https://tfoe-backend.onrender.com/admin/event`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
     console.log("Response status:", response);
    }

    const data = await response.json();

    return { data: data };
  } catch (error) {
    console.error("Error fetching details:", error);
    return {
      message: error instanceof Error ? error.message : "Failed to fetch data!",
    };
  }
}

export async function getEventDetail(token: any, eventId: any) {
  try {
     const response = await fetch(
      `https://tfoe-backend.onrender.com/admin/event/${eventId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      console.log("Response status:", response);
      }

    const data = await response.json();

    return { data: data };
  } catch (error) {
    console.log("Error fetching event details:", error);
    return {
      message: error instanceof Error ? error.message : "Failed to fetch data!",
    };
  }
}

export async function addEvent(token: string, eventData: any) {
  try {
    const response = await fetch(
      `https://tfoe-backend.onrender.com/admin/event`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      },
    );

    console.log("Response status:", response);
    if (!response.ok) {
      console.log("Response status:", response);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error creating event:", error);
    return {
      message:
        error instanceof Error ? error.message : "Failed to create event!",
    };
  }
}

export async function updateEvent(token: string, eventData: any, eventId: any) {
  try {
    const response = await fetch(
      `https://tfoe-backend.onrender.com/admin/event/${eventId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to create event: ${response.status}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error creating event:", error);
    return {
      message:
        error instanceof Error ? error.message : "Failed to create event!",
    };
  }
}
