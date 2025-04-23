import axios from "axios";

const baseUrl = "http://localhost:8092/";

export async function sendMessage(
  accessToken: string,
  message: string
): Promise<any> {
  const url = baseUrl + "message/" + message;
  try {
    const response = await axios.post(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data from song service:", error);
    throw error;
  }
}
