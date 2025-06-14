"use server";

import { ConfigResolutionError } from "sanity";


export async function getDetails(token: any) {
  try {
    const response = await fetch(
      `https://tfoe-backend.onrender.com/admin/event`,
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

export async function getEventDetail(token: any, eventId: any) {
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
      console.log("Response status:", response);
      }

    const data = await response.json();
    console.log("Response data:", data);

    return { data: data };
  } catch (error) {
    console.log("Error fetching event details:", error);
    return {
      message: error instanceof Error ? error.message : "Failed to fetch data!",
    };
  }
}

export async function deleteEvent(token: string, eventId: string) {
  try {
    const response = await fetch(
      `https://tfoe-backend.onrender.com/admin/event/${eventId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to delete event. Status:", response.status);
      return { error: `Failed with status ${response.status}` };
    }

    const data = await response.json();
    console.log("Event deleted successfully:", data);

    return { data };
  } catch (error) {
    console.error("Error deleting event:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to delete event",
    };
  }
}

export async function addEvent(token: string, eventData: any) {
  try {
    const response = await fetch(
      `https://tfoe-backend.onrender.com/admin/event`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
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
export async function updateEvent(token: string, eventData: any, eventId: any) {
  try {
    
    console.log("updateEvent - Token:", token);
    console.log("updateEvent - Event Data:", eventData);
    const response = await fetch(
      `https://tfoe-backend.onrender.com/admin/event/${eventId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      },
    );

    console.log('updateEvent - Response status:', response.status);

    if (!response.ok) {
      // Try to get more detailed error information
      let errorMessage = `Failed to update event: ${response.status}`;
      
      try {
        const errorData = await response.json();
        console.log('updateEvent - Error response:', errorData);
        
        if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        } else if (errorData.details) {
          errorMessage = Array.isArray(errorData.details) 
            ? errorData.details.join(', ') 
            : errorData.details;
        }
      } catch (jsonError) {
        // If response is not JSON, use the text
        try {
          const errorText = await response.text();
          if (errorText) {
            errorMessage = errorText;
          }
        } catch (textError) {
          console.log('Could not parse error response');
        }
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('updateEvent - Success response:', data);
    return { data, success: true };
  } catch (error) {
    console.error("Error updating event:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to update event!",
    };
  }
}

export async function getFeedback(token: any, eventId: any) {
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
      console.log("Response status:", response);
      }

    const data = await response.json();
    console.log("Response data:", data);

    return { data: data };
  } catch (error) {
    console.log("Error fetching event details:", error);
    return {
      message: error instanceof Error ? error.message : "Failed to fetch data!",
    };
  }
}

export async function closeEvent(token: string, eventId: string) {
  try {
    console.log("Closing event with ID:", eventId);
    const response = await fetch(
      `https://tfoe-backend.onrender.com/admin/event/${eventId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("Response status:", response.status);
    
    if (!response.ok) {
      console.log("Response not ok:", response.status);
      return { 
        success: false,
        error: `Failed with status ${response.status}` 
      };
    }

    // DELETE requests often don't return JSON, so don't try to parse it
    console.log("Event closed successfully");

    return { 
      success: true,
      data: null // DELETE typically doesn't return data
    };
  } catch (error) {
    console.log("Error closing event:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to close event",
    };
  }
}