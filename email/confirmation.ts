import formatDate from "../utils/format-date";

const getConfirmationEmailMarkup = (
  time: string,
  date: Date,
  service: string,
  confirmationNumber: string
) => {
  return `
        <h1>Thank you for booking an appointment with Lunary Lash!</h1>
        <p>You have successfully booked an appointment with Lunary Lash. We look forward to seeing you soon!</p>
        <h2>Appointment Details</h2>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Date:</strong> ${formatDate(date)}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Confirmation Number:</strong> ${confirmationNumber}</p>
    `;
};

export default getConfirmationEmailMarkup;
