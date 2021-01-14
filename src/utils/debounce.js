export const debounce = (fn, delay) => {
  let timeOutId;

  return function(...args) {
    if (timeOutId) {
      //if the timeOut exists, clear it (start over)
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
