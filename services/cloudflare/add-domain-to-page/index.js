import cloudflareFetchInstance, { constructAResponseFromErrors } from "../../utils/index.js";

/**
 * Add a new domain for the Pages project
 * @param {String} projectName name of the page project(website)
 * @param {String} domain new domain of the pages project(aka website)
 * @returns formatted response
 * @see https://api.cloudflare.com/#pages-domains-add-domain
 */
export default async function addDomainToPageWebsite(projectName, domain) {
  const cfFetchConfig = {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
    email: process.env.CLOUDFLARE_X_AUTH_EMAIL,
    authKey: process.env.CLOUDFLARE_X_AUTH_KEY
  };
  let response;

  try {
    const Axios = cloudflareFetchInstance(cfFetchConfig);
    const { status, data } = await Axios.post(
      `/${projectName}/domains`,
      {
        name: domain
      }
    );
    response = {
      status,
      code: "success",
      data
    }
  } catch (error) {
    response = constructAResponseFromErrors(error);
  }

  return response;
}