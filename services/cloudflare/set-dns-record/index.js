import cloudflareFetchInstance, { constructAResponseFromErrors } from "../../utils/index.js";

/**
 * Set a new dns record for a given zone
 * @param {String} zoneId zone identifier(ID)
 * @param {String} type DNS record(A, CNAME, AAA...)
 * @param {String} name record name such as "www"
 * @param {String} content value of the record
 * @param {Boolean} proxied if proxied or note
 * @param {Number} ttl DNS ttl value 1 will mean automatic
 * @returns formatted response
 */
export default async function setDNSRecordByZone(zoneId, type, name, content, proxied = true, ttl = 1) {
  let response;
  const cfFetchConfig = {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
    email: process.env.CLOUDFLARE_X_AUTH_EMAIL,
    authKey: process.env.CLOUDFLARE_X_AUTH_KEY
  }
  const requestConfig = {
    baseURL: `https://api.cloudflare.com/client/v4/zones`,
  }

  try {
    const Axios = cloudflareFetchInstance(cfFetchConfig, requestConfig);
    const { status, data } = await Axios.post(
      `/${zoneId}/dns_records`,
      {
        type,
        name,
        content,
        proxied,
        ttl,
      }
    );
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