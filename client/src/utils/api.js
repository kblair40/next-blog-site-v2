import qs from "qs";

const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || "";
const envName = process.env.NODE_ENV;
// console.log("\n\n\n\nTOKEN:", token, "\n\n\n\n");

console.log("ENV NAME:", envName);
console.log("API URL:", process.env.NEXT_PUBLIC_STRAPI_API_URL);

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
// const BASE_URL =
//   process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
export function getStrapiURL(path = "") {
  let baseUrl =
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  // let baseUrl = "http://localhost:1337";
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
  // headers["Authorization"] = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
  //  PUT BELOW 'IF' CHECK BACK - DELETE LINE ABOVE
  if (token && envName !== "development") {
    console.log("YES TOKEN");
    // headers["Authorization"] = `bearer ${token}`; // old
    headers["Authorization"] = `bearer ${token}`; // new
  } else {
    headers["Authorization"] =
      "2327aba91f2a917004eb66f5b0ac03c7bf71af60024965138dbd2f8305833ef89cfe20b2f9d0ed76b5372835e70836ec0d26e5a39c04256d707926e7b315474da9f25bc1b4f83a7ea8e232cf9278da7e9dac70263089ec5be46183912fd8b6ae84d47e042727fdfea9994e2da3b32159de87923e0e1bf7252dc8e92a84efd625";
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
