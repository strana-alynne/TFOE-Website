"use server";
// Function to send OTP to user's email
export async function getDetails(token: string) {
  try {
    // Call your OTP API endpoint
    const response = await fetch(`https://tfoe-backend.onrender.com/member/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
    }

    return { data: data.data };
  } catch (error) {
    console.error("OTP sending error:", error);
    return {
      message: error instanceof Error ? error.message : "Failed to fetch data!",
    };
  }
}
