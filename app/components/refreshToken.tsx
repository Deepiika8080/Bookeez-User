import dotenv from 'dotenv';

const refreshAccessToken = async () => {
    dotenv.config();
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    console.log("No refresh token available");
    return;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${refreshToken}`
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error refreshing token:", errorText); // log the error response body
      throw new Error("Failed to refresh token:)");
    }

    const data = await response.json();
    localStorage.setItem("authToken", data.accessToken);
    return data.accessToken;
  } catch (error) {
    console.log("Error during token refresh:", error);
  }
};

export default refreshAccessToken;
  