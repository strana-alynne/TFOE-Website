"use server";

export async function getDetails(token: string) {
  try {
    const response = await fetch(
      `https://tfoe-backend.onrender.com/user/events`,
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
export async function addFeedback(
  token: string,
  memberId: string,
  feedback: string,
) {
  try {
    const body = {
      feedbackContent: feedback,
      feedbackSenderId: memberId,
      feedbackDate: Date.now(),
    };
    const response = await fetch(
      `https://tfoe-backend.onrender.com/member/feedback`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
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
