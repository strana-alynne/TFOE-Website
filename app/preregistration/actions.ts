"use server";

interface PreregData {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  reason: string;
  dateJoined: string;
}

export async function addPrereg(formData: FormData) {
  
  try {
    // Log all FormData entries
    for (const [key, value] of formData.entries()) {
      console.log(`  ${key}: ${value}`);
    }

    // Extract data from FormData
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const contact = formData.get("contact") as string;
    const interest = formData.get("interest") as string;

    // Create the request body matching your API schema
    const requestBody: PreregData = {
      firstName,
      lastName,
      email,
      contact,
      reason: interest, // mapping 'interest' to 'reason'
      dateJoined: new Date().toISOString(), // current date
    };


    const apiUrl = "https://tfoe-backend.onrender.com/user/join_us";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      
      return {
        success: false,
        message: `Server error: ${response.status} - ${errorText}`,
      };
    }

    const data = await response.json();
    
    return { 
      success: true, 
      data: data 
    };
    
  } catch (error) {
    console.log("  Error type:", typeof error);
    
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to submit form!",
    };
  }
}