import db from "../config/db";

import { BOOKING_STATUS } from "../constants/bookingStatus";

export const createBookingService = async (
  serviceId: number,
  buyerId: number,
) => {
  await db.query(
    `
      INSERT INTO bookings
      (
        service_id,
        buyer_id,
        status
      )
      VALUES (?, ?, ?)
      `,
    [serviceId, buyerId, BOOKING_STATUS.PENDING],
  );
};

export const getBookingsService = async () => {
  const [rows] = await db.query(
    `
        SELECT
          bookings.id,
          bookings.status,

          services.title
            AS service_title,

          users.username
            AS buyer_name

        FROM bookings

        JOIN services
          ON bookings.service_id =
          services.id

        JOIN users
          ON bookings.buyer_id =
          users.id
        `,
  );

  return rows;
};

export const getBookingByIdService = async (bookingId: number) => {
  const [rows]: any = await db.query(
    `
        SELECT
          bookings.*,

          services.user_id

        FROM bookings

        JOIN services
          ON bookings.service_id =
          services.id

        WHERE bookings.id = ?
        `,
    [bookingId],
  );

  return rows[0];
};

export const updateBookingStatusService = async (
  bookingId: number,
  status: string,
) => {
  await db.query(
    `
      UPDATE bookings
      SET status = ?
      WHERE id = ?
      `,
    [status, bookingId],
  );
};
