const getNextAppointment = async (supabase: any) => {
  const dateObj = new Date();
  const { data, error } = await supabase
    .from("appointments")
    .select("time, is_booked, service(name)")
    .eq("date", dateObj.toISOString().split("T")[0]);
  if (error) {
    console.log(error);
  }

  if (data.length === 0) return null;

  let next: any = null;

  data.forEach((appointment: any) => {
    if (!next && appointment.is_booked) {
      next = appointment;
    }
  });

  return next;
};

export default getNextAppointment;
