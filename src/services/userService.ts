import db from "../config/db";

export const getUserProfileService = async (userId: number) => {
  const [rows]: any = await db.query(
    `
        SELECT
          id,
          username,
          email,
          bio,
          avatar,
          phone,
          location
        FROM users
        WHERE id = ?
        `,
    [userId],
  );

  return rows[0];
};

export const updateUserProfileService = async (
  userId: number,
  bio: string,
  avatar: string | null,
  phone: string,
  location: string,
) => {
  await db.query(
    `
      UPDATE users
      SET
        bio = ?,
        avatar = ?,
        phone = ?,
        location = ?
      WHERE id = ?
      `,
    [bio, avatar, phone, location, userId],
  );
};
