import qs from "qs";

const token = process.env.NEXT_PUBLIC_API_TOKEN || "";
console.log("\n\n\n\nTOKEN:", token, "\n\n\n\n");

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
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

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);
  // console.log("\n\nAPI RESPONSE:", response, "\n\n");

  // Handle response
  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`An error occured please try again`);
  }
  const data = await response.json();
  return data;
}
