import qs from "qs";

const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || "";
// console.log("\n\n\n\nTOKEN:", token, "\n\n\n\n");

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
// const BASE_URL =
//   process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
export function getStrapiURL(path = "") {
  // let baseUrl = // This is what we want
  //   process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  let baseUrl = "http://localhost:1337";
  return `${baseUrl}${path}`;
  // return `${
  //   process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  // }${path}`;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  let headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `bearer ${token}`;
  }
  // Merge default and user options
  const mergedOptions = {
    headers,
    ...options,
  };

  // Build request URL
  const queryString = qs.stringify(urlParamsObject);
  console.log("\n\n\n\nQUERY DATA:", {
    queryString,
    path,
  });
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`;

  try {
    // Trigger API call
    // console.log("\nFETCH OPTIONS:", { requestUrl, mergedOptions });
    const response = await fetch(requestUrl, mergedOptions);
    // console.log("\n\nAPI RESPONSE:", response, "\n\n");

    // Handle response
    if (!response.ok) {
      console.error(response.statusText);
      throw new Error(`An error occured please try again`);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.log("\n\nFETCH FAILED:", e, "\n\n");
    return JSON.stringify({});
  }
}
