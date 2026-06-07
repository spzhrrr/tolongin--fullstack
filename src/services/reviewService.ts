import db from "../config/db";

export const createReviewService = async (
  serviceId: number,
  reviewerId: number,
  rating: number,
  comment: string,
) => {
  await db.query(
    `
      INSERT INTO reviews
      (service_id, reviewer_id, rating, comment)
      VALUES (?, ?, ?, ?)
      `,
    [serviceId, reviewerId, rating, comment],
  );
};

export const getReviewsByServiceService = async (serviceId: number) => {
  const [rows] = await db.query(
    `
      SELECT
        reviews.*,
        users.username
      FROM reviews
      JOIN users
        ON reviews.reviewer_id = users.id
      WHERE reviews.service_id = ?
      `,
    [serviceId],
  );

  return rows;
};

export const checkBookingExistsService = async (
  serviceId: number,
  buyerId: number,
) => {
  const [rows]: any = await db.query(
    `
      SELECT * FROM bookings
      WHERE service_id = ?
      AND buyer_id = ?
      `,
    [serviceId, buyerId],
  );

  return rows[0];
};
