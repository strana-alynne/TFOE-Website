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
  console.log("🚀 === PRE-REGISTRATION DEBUG START ===");
  
  try {
    // Log all FormData entries
    console.log("📝 Raw FormData entries:");
    for (const [key, value] of formData.entries()) {
      console.log(`  ${key}: ${value}`);
    }

    // Extract data from FormData
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const contact = formData.get("contact") as string;
    const interest = formData.get("interest") as string;

    console.log("🔄 Extracted form data:");
    console.log("  firstName:", firstName);
    console.log("  lastName:", lastName);
    console.log("  email:", email);
    console.log("  contact:", contact);
    console.log("  interest:", interest);

    // Create the request body matching your API schema
    const requestBody: PreregData = {
      firstName,
      lastName,
      email,
      contact,
      reason: interest, // mapping 'interest' to 'reason'
      dateJoined: new Date().toISOString(), // current date
    };

    console.log("📦 Request body to be sent:");
    console.log(JSON.stringify(requestBody, null, 2));

    const apiUrl = "https://tfoe-backend.onrender.com/user/join_us";
    console.log("🌐 Making request to:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log("📡 Response received:");
    console.log("  Status:", response.status);
    console.log("  Status Text:", response.statusText);
    console.log("  Headers:", Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      console.log("❌ Response not ok!");
      const errorText = await response.text();
      console.log("  Error response body:", errorText);
      
      return {
        success: false,
        message: `Server error: ${response.status} - ${errorText}`,
      };
    }

    const data = await response.json();
    console.log("✅ Success response data:");
    console.log(JSON.stringify(data, null, 2));

    console.log("🎉 === PRE-REGISTRATION DEBUG END ===");
    
    return { 
      success: true, 
      data: data 
    };
    
  } catch (error) {
    console.log("💥 Error in addPrereg:");
    console.log("  Error type:", typeof error);
    console.log("  Error message:", error instanceof Error ? error.message : String(error));
    console.log("  Error stack:", error instanceof Error ? error.stack : "No stack trace");
    
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to submit form!",
    };
  }
}