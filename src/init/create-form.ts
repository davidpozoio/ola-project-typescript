import pool from "../config/mysql-config";

const createForm = async () => {
  //create form
  await pool.query(
    `INSERT INTO form_scheme (label, id) VALUES ("Formulario Ola", 1)`
  );
  //create first form group
  await pool.query(
    `INSERT INTO form_group (label, form_scheme_id) VALUES ("Información referencial", 1)`
  );

  ///create first field
  await pool.query(
    `INSERT INTO field (label, component, form_group_id, metadata)
     VALUES ("Ciudad", "input", 1,  '{"type": "text"}')`
  );

  await pool.query(
    `INSERT INTO field (label, component, form_group_id, metadata)
     VALUES ("Fecha", "input", 1,  '{"type": "date"}')`
  );
};

export default createForm;
