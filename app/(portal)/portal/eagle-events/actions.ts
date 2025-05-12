"use server";

export async function getDetails(token: string) {
  try {
    const response = await fetch(`http://localhost:3001/event`);

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
