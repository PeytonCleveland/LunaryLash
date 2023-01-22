// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Availability = {
  date: Date;
  time: string;
};

type Data = {
  openings: Availability[];
};

const openingsData: Availability[] = [
  {
    date: new Date("2023-01-24"),
    time: "9:00",
  },
  {
    date: new Date("2023-01-24"),
    time: "11:30",
  },
  {
    date: new Date("2023-01-24"),
    time: "2:00",
  },
  {
    date: new Date("2023-01-24"),
    time: "4:30",
  },
];

export default function appointmentsHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const date: Date = new Date(req.query.date as string);
  const openings: Availability[] = openingsData.filter(
    (opening) => opening.date.toDateString() === date.toDateString()
  );
  res.status(200).json({ openings: openings });
}
