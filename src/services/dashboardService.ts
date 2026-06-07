import db from "../config/db";

export const getDashboardStatsService = async () => {
  const [users]: any = await db.query(
    "SELECT COUNT(*) as totalUsers FROM users",
  );

  const [services]: any = await db.query(
    "SELECT COUNT(*) as totalServices FROM services",
  );

  const [bookings]: any = await db.query(
    "SELECT COUNT(*) as totalBookings FROM bookings",
  );

  const [reviews]: any = await db.query(
    "SELECT COUNT(*) as totalReviews FROM reviews",
  );

  const [topRatedServices]: any = await db.query(`
        SELECT
          services.id,
          services.title,
          AVG(reviews.rating)
            AS average_rating
        FROM services
        JOIN reviews
          ON services.id =
          reviews.service_id
        GROUP BY services.id
        ORDER BY average_rating DESC
        LIMIT 5
      `);

  return {
    totalUsers: users[0].totalUsers,

    totalServices: services[0].totalServices,

    totalBookings: bookings[0].totalBookings,

    totalReviews: reviews[0].totalReviews,

    topRatedServices,
  };
};
