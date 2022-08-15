import axios from "axios";

/**
 * Create a fetch instance for cloudflare api
 * @param {String} accountId cloudflare account id
 * @param {Object} requestConfig fetch request config
 * @returns instance a http fetch request
 */
export default function cloudflareFetchInstance(cfCredentials, requestConfig = {}) {
  const Axios = axios.create({
    headers: {
      "X-Auth-Email": cfCredentials.email,
      "X-Auth-Key": cfCredentials.authKey,
      ...(requestConfig.headers || {})
    },
    baseURL: `https://api.cloudflare.com/client/v4/accounts/${cfCredentials.accountId}/pages/projects`,
    ...requestConfig
  });

  return Axios;
}

/**
 * Construct response based on a thrown errors
 * @param {Error} error instance of the thrown error
 * @returns well structured response for a thrown errors
 */
export function constructAResponseFromErrors(error) {
  let response = {
    code: "failed",
  };
  if ("response" in error) {
    response = {
      ...response,
      status: error.response.status,
      errors: error.response.data.errors
    }
  } else {
    response = {
      ...response,
      status: 400,
      errors: {
        global: `Something went wrong please check this ${error.message}`
      }
    }
  }

  return response;
}