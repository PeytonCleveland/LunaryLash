import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import getConfirmationEmailMarkup from "../../email/confirmation";
const sgMail = require("@sendgrid/mail");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, openingId, service } = req.body;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("id", openingId);

  if (error) {
    console.log("error", error);
    return res.status(500).json({ error: error.message });
  }

  if (data[0].is_booked) {
    return res
      .status(200)
      .json({ message: "already confirmed", data: data[0] });
  }

  // Get the service ID by the name of the service
  const { data: serviceData, error: serviceError } = await supabase
    .from("services")
    .select("*")
    .eq("name", service);

  if (serviceError) {
    console.log("error", serviceError);
    return res.status(500).json({ error: serviceError.message });
  }

  // Create a confirmation number
  const characters = "ABCEFGHKMNPQRSVWXYZ";
  const charOne = characters.charAt(
    Math.floor(Math.random() * characters.length)
  );
  const charTwo = characters.charAt(
    Math.floor(Math.random() * characters.length)
  );
  const confirmationNumber = `${charOne}${charTwo}${Math.floor(
    Math.random() * 10000
  )}`;

  const { data: updateData, error: updateError } = await supabase
    .from("appointments")
    .update({
      is_booked: true,
      client_email: email,
      booked_at: new Date(),
      service: serviceData[0].id,
      confirmation_number: confirmationNumber,
    })
    .eq("id", openingId)
    .select();

  if (updateError) {
    console.log("error", updateError);
    return res.status(500).json({ error: updateError.message });
  }

  const html = getConfirmationEmailMarkup(
    updateData[0].time,
    updateData[0].date,
    service,
    confirmationNumber
  );

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: { email: "morgan@lunarylash.com", name: "Lunary Lash" },
    subject: "Lash Appointment Confirmation",
    text: "You have successfully booked an appointment with Lunary Lash. We look forward to seeing you soon!",
    html: html,
  };

  (async () => {
    try {
      await sgMail.send(msg);
    } catch (error: any) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();

  res.status(200).json({ message: "success", data: updateData[0] });
}
