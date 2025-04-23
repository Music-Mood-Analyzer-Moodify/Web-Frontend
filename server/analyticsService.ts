import axios from "axios";

const baseUrl = "http://localhost:8091/";

export async function getMessages(accessToken: string): Promise<any> {
  const url = baseUrl + "messages/";
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data from analytics service:", error);
    throw error;
  }
}
