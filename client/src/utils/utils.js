const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const phoneRegex = /^\+92\d{10}$/;

// utility function to validate the email
export function validateEmail(email) {
  return emailRegex.test(email);
}
// utility function to correct the format of date in product card show component in review/componen/reviewCard
export function formatDateTime(isoString, hours = 0, minutes = 0, seconds = 0) {
  const date = new Date(isoString);

  const dateOptions = { month: "short", day: "2-digit", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", dateOptions);

  const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

  return `${formattedDate}, ${formattedTime}`;
}
// function to validate phone number
export function validatePhoneNumber(phoneNumber) {
  return phoneRegex.test(phoneNumber);
}
// function to capitalize the state of order
export function capitalizeWords(text) {
  return text
    .toLowerCase() // Ensure all text is lowercase first
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
}
