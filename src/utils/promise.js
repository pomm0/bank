/**
 * Promise wrapper which will run for at least the passed time even the promise resolved earlier.
 *
 * @param {Promise} promise The promise
 * @param {Number} runtime The Milliseconds to run
 */
export const promiseWithMinRuntime = async (promise, runtime = 400) => {
  /* Create a promise that resolves in <ms> milliseconds */
  const timeout = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, runtime);
  });

  /**
   * Waits for all promised settled
   */
  await Promise.allSettled([promise, timeout]);

  return promise;
};
