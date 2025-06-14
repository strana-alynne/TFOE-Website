"use server";

export async function getDetails(token: any) {
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
export async function getEventDetail(token: any, eventId: string) {
  try {
    const response = await fetch(
      `https://tfoe-backend.onrender.com/user/event/${eventId}`,
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
    console.log("Response data:", data);

    return { data: data };
  } catch (error) {
    console.error("Error fetching details:", error);
    return {
      message: error instanceof Error ? error.message : "Failed to fetch data!",
    };
  }
}
// Get user details
export async function getUserDetails(token: string) {
  try {
    const response = await fetch('https://tfoe-backend.onrender.com/member/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.log("Response status:", response);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
}

export async function markAttendance(token: string, eventId: string, attendanceData: {
  eventCode: string;
  memberId: string;
  memberName: string;
  attendanceType: string; // Add this field
}) {
  try {
    const response = await fetch(`https://tfoe-backend.onrender.com/member/event/${eventId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attendanceData),
    });

    console.log("Attendance Data:", response);
    if (!response.ok) {
      console.log("Response Attendance:", response);
    }

    return await response.json();
  } catch (error) {
    console.log('Error marking attendance:', error);
    throw error;
  }
}

// Submit feedback
export async function submitFeedback(token: string, feedbackData: {
  feedbackContent: string;
  feedbackSenderId: string;
  eventId: string;
  feedbackDate: string;
}) {
  try {
    const response = await fetch('https://tfoe-backend.onrender.com/member/feedback', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData),
    });

    if (!response.ok) {
      console.log("Response status:", response);
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
}