import { ResultSetHeader } from "mysql2";
import pool from "../config/mysql-config";

const createUserForm = async () => {
  const [formUser] = await pool.query<ResultSetHeader>(
    `INSERT INTO form_scheme (label, id) VALUES ("formulario de usuario", 2)`
  );
  formUser.insertId = 2;
  //create first my Data group
  const [myDataGroup] = await pool.query<ResultSetHeader>(
    `INSERT INTO form_group (label, form_scheme_id) VALUES ("Mis datos", ?)`,
    [formUser.insertId]
  );

  ///create first field
  await pool.query(
    `INSERT INTO field (label, component, form_group_id, metadata)
         VALUES ("Nombres y Apellidos", "input", ?,  '{"type": "text"}')`,
    [myDataGroup.insertId]
  );

  //create birth group
  const [myBirthGroup] = await pool.query<ResultSetHeader>(
    `INSERT INTO form_group (label, form_scheme_id) VALUES ("Datos de nacimiento", ?)`,
    [formUser.insertId]
  );

  await pool.query(
    `INSERT INTO field (label, component, form_group_id, metadata)
         VALUES ("Lugar de nacimiento", "input", ?,  '{"type": "text"}')`,
    [myBirthGroup.insertId]
  );

  await pool.query(
    `INSERT INTO field (label, component, form_group_id, metadata)
         VALUES ("Fecha de nacimiento", "input", ?,  '{"type": "date"}')`,
    [myBirthGroup.insertId]
  );

  await pool.query(
    `INSERT INTO field (label, component, form_group_id, metadata)
         VALUES ("Edad", "input", ?,  '{"type": "number"}')`,
    [myBirthGroup.insertId]
  );

  //create civil group
  const [myCivilGroup] = await pool.query<ResultSetHeader>(
    `INSERT INTO form_group (label, form_scheme_id) VALUES ("Estado civil", ?)`,
    [formUser.insertId]
  );

  await pool.query(
    `INSERT INTO field (label, component, form_group_id, metadata)
         VALUES ("Estado civil", "select", ?,  '{"type": "text", "options": [{"value": "single", "label": "soltero"}, {"value": "married", "label": "casado"}]}')`,
    [myCivilGroup.insertId]
  );

  await pool.query(
    `INSERT INTO field (label, component, form_group_id, metadata)
         VALUES ("N° de hijos", "input", ?,  '{"type": "number"}')`,
    [myCivilGroup.insertId]
  );
};

export default createUserForm;
