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