"use server";

export async function getDetails(token: string, id: string) {
  try {
    const response = await fetch(`http://localhost:3001/members/${id}`);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    // Get the raw response body as text
    const data = await response.json();

    // OPTION 1: Return raw text (unparsed)
    return { data: data };

    // OPTION 2: Manually parse JSON later if you need it
    // const data = JSON.parse(rawText);
    // return { data };

  } catch (error) {
    console.error("Error fetching details:", error);
    return {
      message: error instanceof Error ? error.message : "Failed to fetch data!",
    };
  }
}
