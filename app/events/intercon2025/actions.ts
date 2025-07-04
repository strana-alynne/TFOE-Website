
export async function addAttendance(attendeeData: any) {
  try {
    const response = await fetch(
      `https://tfoe-events.onrender.com/api/v1/attendance`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attendeeData),
      },
    );

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    const data = await response.json();
    console.log("Response data:", data);

    if (!response.ok) {
      // Return the error from the API
      return {
        error: true,
        message: data.detail || data.message || `HTTP ${response.status}`,
        data: data
      };
    }

    return { data };
  } catch (error) {
    console.error("Error creating event:", error);
    return {
      error: true,
      message: error instanceof Error ? error.message : "Failed to create event!",
    };
  }
}