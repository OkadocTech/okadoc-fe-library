import nookies from "nookies";

const getDomain = () => {
  const hostname = typeof window !== "undefined" && window.location.hostname;
  const arrHostname = hostname && hostname.split(".");

  // if length of hostname is 1 then set domain into localhost
  return arrHostname.length > 1
    ? `.${arrHostname
        .filter((_val, index) => index >= arrHostname.length - 2)
        .join(".")}`
    : hostname;
};

/**
 *
 * @param {*} name cookie name
 * @param {*} context nextjs context || (Express request object)
 * @param {*} expireIn cookie will expire in n-time, parameter time in seconds.
 */
export const setCookie = (name, value, context = null, expireIn = 86400) => {
  const domain = getDomain();
  nookies.set(context, name, value, {
    path: "/",
    maxAge: expireIn,
    domain,
  });
};

/**
 *
 * @param {*} name cookie name
 * @param {*} context nextjs context || (Express request object)
 */
export const destroyCookie = (name, context = null) => {
  const domain = getDomain();
  nookies.destroy(context, name, {
    path: "/",
    domain,
  });
};

/**
 *
 * @param {*} context nextjs context || (Express request object)
 * @returns all cookies
 */
export const getCookies = (context = null) => {
  return nookies.get(context);
};

export default {
  setCookie,
  destroyCookie,
  getCookies,
};
