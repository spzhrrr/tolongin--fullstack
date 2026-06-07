import db from "../config/db";

export const getAllServicesService = async (
  search?: string,
  category?: string,
) => {
  let query = `
      SELECT
        services.*,
        categories.name
          AS category_name
      FROM services
      LEFT JOIN categories
        ON services.category_id =
        categories.id
      WHERE 1=1
    `;

  const values: any[] = [];

  if (search) {
    query += `
        AND services.title
        LIKE ?
      `;

    values.push(`%${search}%`);
  }

  if (category) {
    query += `
        AND categories.name = ?
      `;

    values.push(category);
  }

  const [rows] = await db.query(query, values);

  return rows;
};

export const getServiceByIdService = async (id: number) => {
  const [rows]: any = await db.query(
    `
        SELECT
          services.*,
          categories.name
            AS category_name
        FROM services
        LEFT JOIN categories
          ON services.category_id =
          categories.id
        WHERE services.id = ?
        `,
    [id],
  );

  return rows[0];
};

export const createServiceService = async (
  title: string,
  price: number,
  userId: number,
  categoryId: number,
  image: string | null,
) => {
  await db.query(
    `
      INSERT INTO services
      (
        title,
        price,
        user_id,
        category_id,
        image
      )
      VALUES (?, ?, ?, ?, ?)
      `,
    [title, price, userId, categoryId, image],
  );
};

export const updateServiceService = async (
  id: number,
  title: string,
  price: number,
  categoryId: number,
  image: string | null,
) => {
  await db.query(
    `
      UPDATE services
      SET
        title = ?,
        price = ?,
        category_id = ?,
        image = ?
      WHERE id = ?
      `,
    [title, price, categoryId, image, id],
  );
};

export const deleteServiceService = async (id: number) => {
  await db.query(
    `
      DELETE FROM services
      WHERE id = ?
      `,
    [id],
  );
};
