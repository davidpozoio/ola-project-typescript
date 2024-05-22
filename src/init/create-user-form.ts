import { ResultSetHeader } from "mysql2";
import pool from "../config/mysql-config";

const createUserForm = async () => {
  await pool.query(
    `INSERT INTO form_scheme (label, id) VALUES ("formulario de usuario", 2)`
  );
  //create first form group
  const [formGroup] = await pool.query<ResultSetHeader>(
    `INSERT INTO form_group (label, form_scheme_id) VALUES ("Metadata", 2)`
  );

  ///create first field
  await pool.query(
    `INSERT INTO field (label, component, form_group_id, metadata)
         VALUES ("Ciudad", "input", ?,  '{"type": "text"}')`,
    [formGroup.insertId]
  );

  await pool.query(
    `INSERT INTO field (label, component, form_group_id, metadata)
         VALUES ("Nombres Completos", "input", ?,  '{"type": "date"}')`,
    [formGroup.insertId]
  );
};

export default createUserForm;
