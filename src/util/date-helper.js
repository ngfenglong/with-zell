export function formatStringDate(dateString) {
  return new Date(`${dateString}`).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** The same moment shifted to Singapore time (UTC+8), so server and browser agree. */
function toSingaporeTime(input, offset = 8) {
  const date = input instanceof Date ? input : new Date(input);
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utc + 3600000 * offset);
}

/** "September 5, 2022" */
export function formatDateToString(input, offset = 8) {
  return toSingaporeTime(input, offset).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** 2022 (in Singapore time, matching the displayed date) */
export function getYear(input, offset = 8) {
  return toSingaporeTime(input, offset).getFullYear();
}
