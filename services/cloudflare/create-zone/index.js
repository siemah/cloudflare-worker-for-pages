import cloudflareFetchInstance, { constructAResponseFromErrors } from "../../utils/index.js";

/**
 * Create new zone for a new website
 * @param {String} name new zone domain name such as "example.com"
 * @param {String} accountId cloudflare account id
 * @param {Boolean} jump_start weither allow to get default dns settings in a value of true/false
 * @param {Enum} type accept one of "full", if DNS is hosted with Cloudflare, or "partial"
 * @returns structured response
 */
export default async function createZone(name, accountId, jump_start = true, type = "full") {
  const cfFetchConfig = {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
    email: process.env.CLOUDFLARE_X_AUTH_EMAIL,
    authKey: process.env.CLOUDFLARE_X_AUTH_KEY
  }
  const requestConfig = {
    baseURL: `https://api.cloudflare.com/client/v4/zones`,
  }
  const Axios = cloudflareFetchInstance(cfFetchConfig, requestConfig);
  let response;
  try {
    const newZone = {
      name,
      accountId,
      jump_start,
      type
    }
    const { status, data } = await Axios.post("/", newZone);
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