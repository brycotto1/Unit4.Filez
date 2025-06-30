import db from "#db/client";

export const addFolder = async (name) => {
  const sql = `
    INSERT INTO folders (name)
    VALUES ($1)
    RETURNING *;
  `;

  const {rows: [newFolder]} = await db.query(sql, [name]);
  return newFolder;
}

//returns all folders in the folder database
export const getAllFolders = async () => {
  const sql = `
    SELECT *
    FROM folders;
  `;

  const {rows: folders} = await db.query(sql);
  return folders;
}

//gets a folder by a specified ID
export const getFolderById = async (id) => {
  const sql = `
    SELECT
      folders.*,
      (
        SELECT json_agg(files)
        FROM files
        WHERE files.folder_id = folders.id
      ) AS files
    FROM folders
    WHERE id = $1;
  `;

  const {rows: [folder]} = await db.query(sql, [id]);
  return folder;
}