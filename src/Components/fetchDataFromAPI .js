const cachedData = {};

export const fetchDataFromAPI = async (url, method = "GET", params = {}) => {
  try {
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append(
      "Public-Token",
      "743c7a15a3850459adb8c1b9e3bfc744ed3efe26c9d3d808fdf30c9c2fd5c09d"
    );

    const tokenId = localStorage.getItem("token");
    if (tokenId) {
      headers.append("Authorization", `Bearer ${tokenId}`);
    }

    let requestOptions = {
      method: method,
      headers: headers,
      credentials: "include",
    };
    if (method === "POST") {
      const body = JSON.stringify(params);
      requestOptions.body = body;
    }

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    if (method === "GET") {
      cachedData[url] = data;
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data from API");
  }
};
