import cloudflareFetchInstance, { constructAResponseFromErrors } from "../../utils/index.js";

/**
 * Check if the given domain is available
 * @param {String} domain domain name to look for its availability
 * @return {Object} result of the lookup
 */
export default async function domainLookup(domain, requestConfig = {}) {
  let response;
  const cfFetchConfig = {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
    email: process.env.CLOUDFLARE_X_AUTH_EMAIL,
    authKey: process.env.CLOUDFLARE_X_AUTH_KEY,
  };
  requestConfig = {
    ...requestConfig,
    baseURL: `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}`,
  };

  try {
    const Axios = cloudflareFetchInstance(cfFetchConfig, requestConfig);
    const { data, status } = await Axios.get(`/registrar/domains/${domain}`);
    response = {
      status,
      code: "success",
      data
    };
  } catch (error) {
    response = constructAResponseFromErrors(error);
  }

  return response;
}