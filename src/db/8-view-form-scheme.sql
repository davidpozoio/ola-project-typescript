CREATE VIEW v_form_scheme AS
SELECT form_scheme.*, form_group.*, field.*
FROM form_scheme 
LEFT JOIN form_group 
ON form_group.form_scheme_id = form_scheme.id
LEFT JOIN field
ON field.form_group_id = form_group.id;