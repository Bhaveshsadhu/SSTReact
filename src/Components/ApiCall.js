export const ApiCall = async (url, method = "GET", options = {}) => {
  const headers = new Headers({
    "Content-Type": "application/json",
    "Public-Token":
      "743c7a15a3850459adb8c1b9e3bfc744ed3efe26c9d3d808fdf30c9c2fd5c09d",
  });

  // Add Authorization header if token is available
  const tokenId = localStorage.getItem("token");
  if (tokenId) {
    headers.append("Authorization", `Bearer ${tokenId}`);
  }

  // Set up request options
  const requestOptions = {
    method,
    headers,
    credentials: "include",
    body: options.body ? JSON.stringify(options.body) : null,
  };

  try {
    // Make the API call
    // console.log("url : " + url);
    // console.log("body data : " + JSON.stringify(options.body));

    const response = await fetch(url, requestOptions);

    // console.log("response : " + JSON.stringify(response));
    // Log the status code of the response
    console.log("Response status code:", response.status);

    // Check for error status
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from ${url}: ${response.statusText}`
      );
    }

    // Parse response data
    const data = await response.json();
    // console.log("Response data:", data); // Log the data
    return data;
  } catch (error) {
    // Handle errors
    throw new Error(`Error fetching data from ${url}: ${error.message}`);
  }
};
