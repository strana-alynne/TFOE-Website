
export async function addAttendance(attendeeData: any) {
  try {
   const response = await fetch(
  `https://34qxhbungzt75udjai6nkbvxyy0rpesi.lambda-url.ap-southeast-1.on.aws/api/v1/attendance/record`,
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


export async function ParticipantCheckout(eagleId: string) {
  const price = "price_1RnESx2MVcHoWIBeBEwqkr8H";
  
  try {
    const response = await fetch(
      `https://34qxhbungzt75udjai6nkbvxyy0rpesi.lambda-url.ap-southeast-1.on.aws/api/v1/payment/checkout-session?price=${price}&eagle_id=${eagleId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();

    // Your API: 200 = error, 400 = success
    if (response.status === 202) {
      // Status 202 means success in your API
      return {
        error: false,
        message: "Checkout session created successfully",
        data: {
          checkout_id: data.checkout_id,
          checkout_url: data.checkout_url
        }
      };
    } else {
      // Status 200 or any other status means error
      return {
        error: true,
        message: data.detail || data.message || "Failed to create checkout session",
        data: data
      };
    }

  } catch (error) {
    console.error("Error creating checkout session:", error);
    return {
      error: true,
      message: error instanceof Error ? error.message : "Network connection failed",
    };
  }
}

export async function SponsorCheckout(price: string, eagleId: string) {
  
  try {
    const response = await fetch(
      `https://34qxhbungzt75udjai6nkbvxyy0rpesi.lambda-url.ap-southeast-1.on.aws//api/v1/payment/checkout-session?price=${price}&eagle_id=${eagleId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();

    // Your API: 200 = error, 400 = success
    if (response.status === 202) {
      // Status 202 means success in your API
      return {
        error: false,
        message: "Checkout session created successfully",
        data: {
          checkout_id: data.checkout_id,
          checkout_url: data.checkout_url
        }
      };
    } else {
      // Status 200 or any other status means error
      return {
        error: true,
        message: data.detail || data.message || "Failed to create checkout session",
        data: data
      };
    }

  } catch (error) {
    console.error("Error creating checkout session:", error);
    return {
      error: true,
      message: error instanceof Error ? error.message : "Network connection failed",
    };
  }
}


export async function getDetails() {
  try {
    const response = await fetch(
      `https://xyu3d24ek7.execute-api.ap-southeast-1.amazonaws.com/api/v1/attendance/admin/list`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      console.log("Response status:", response);
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


export async function closeCheckout(eagleId: string) {
  try {
   const response = await fetch(
  `https://34qxhbungzt75udjai6nkbvxyy0rpesi.lambda-url.ap-southeast-1.on.aws/api/v1/payment/checkout-session`,
  {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
     body: JSON.stringify({
          eagle_id: eagleId,
        })
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

export async function checkAttendance(id: any) {
  try {
   const response = await fetch(
  `https://34qxhbungzt75udjai6nkbvxyy0rpesi.lambda-url.ap-southeast-1.on.aws/api/v1/attendance/${id}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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