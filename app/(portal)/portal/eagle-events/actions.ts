"use server";

export async function getDetails(token: string) {
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
      throw new Error(`Request failed: ${response.status}`);
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
export async function getEventDetail(token: string, eventId: string) {
  try {
    const response = await fetch(`http://localhost:3001/event/${eventId}`);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
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
