"use server";

export async function getDetails(token: string, id: string) {
  try {
    const response = await fetch(
      `https://tfoe-backend.onrender.com/admin/member/${id}`,
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

    // Get the raw response body as text
    const data = await response.json();
    console.log("Response data:", data);

    // OPTION 1: Return raw text (unparsed)
    return { data: data };
  } catch (error) {
    console.log("Error fetching details:", error);
    return {
      message: error instanceof Error ? error.message : "Failed to fetch data!",
    };
  }
}

export async function getContribution(token: string, id: string) {
  try {
    const response = await fetch(
      `https://tfoe-backend.onrender.com/admin/contributions`,
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

    // Get the raw response body as text
    const data = await response.json();
    console.log("Response data:", data);

    // OPTION 1: Return raw text (unparsed)
    return { data: data };
  } catch (error) {
    console.log("Error fetching details:", error);
    return {
      message: error instanceof Error ? error.message : "Failed to fetch data!",
    };
  }
}