import cloudflareFetchInstance from "../utils/index.js";

/**
 * Create a blank(void) website using cloudflare pages
 * @param {String} websiteName name of the new website at cloudflare pages
 * @param {String} environ one of production/preview defined if this deployement is a production/previewing
 * @param {String} mainBranch name of the branch
 * @returns response from cloudflare api
 * @see https://api.cloudflare.com/#pages-project-create-project
 * to understand how to create a blank website at cloudflare pages without
 * configuring/allowing/linking cloudflare 2connect with a github account use this below
 * @see https://github.com/cloudflare/wrangler2/blob/808c0ab39465c61c8cca532329a56fa4786331b0/packages/wrangler/src/pages/projects.tsx#L146
 */
export default async function createWebsiteAtCFPage(websiteName, environ, mainBranch) {
  const cfFetchConfig = {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
    email: process.env.CLOUDFLARE_X_AUTH_EMAIL,
    authKey: process.env.CLOUDFLARE_X_AUTH_KEY
  }
  const Axios = cloudflareFetchInstance(cfFetchConfig);
  let response;
  try {
    const { data, status } = await Axios.post(
      "/",
      {
        name: websiteName,
        production_branch: mainBranch,
        environ
      }
    );
    response = {
      code: "success",
      status,
      data
    }
  } catch (error) {
    response = {
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
  }
  return response;
}