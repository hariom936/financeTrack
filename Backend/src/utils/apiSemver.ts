/**
 * Checks the base api version and constructs a normalized api route starting with vX.X.X
 * according to semver standard
 * @param {string} apiVersion - The base route version - Eg: 1.2.0
 * @param {string[]} args - Additional route paths
 * @returns {string}
 */
const apiRoute = (apiVersion: string, ...args: string[]) => {
    const base = `/api/${apiVersion}`;
    return [base, ...args].join('/');
  };
  
  export { apiRoute };
  