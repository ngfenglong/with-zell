export function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00Z`).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function formatDateToString(date, offset = 8) {
  // set time zone offset for Singapore Standard Time (UTC+8)
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  const formatDate = new Date(utc + 3600000 * offset);

  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  // format the date in 'September 5, 2022' format
  return formatDate.toLocaleDateString('en-US', options);
}
