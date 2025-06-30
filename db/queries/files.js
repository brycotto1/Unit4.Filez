import db from "#db/client";

export const addFile = async (name, size, folderId) => {
  const sql = `
    INSERT INTO files (name, size, folder_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const {rows: [newFile]} = await db.query(sql, [name, size, folderId]);
  return newFile;
}

export const getFiles = async () => {
  //select all from files
  //and the folder names as folder_name
  //then join the databases together
  //where the folder's ID equals the files' folder_id
  const sql = `
    SELECT
      files.*,
      folders.name AS folder_name
    FROM
      files
      JOIN folders ON folders.id = files.folder_id;
  `;

  const {rows: files} = await (db.query(sql));
  return files;
}