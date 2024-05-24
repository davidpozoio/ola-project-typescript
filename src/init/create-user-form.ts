import { createFormSchemeJson } from "../utils/form-creation-utils";
import userFormScheme from "../schemes/user-form.json";

const createUserForm = async () => {
  await createFormSchemeJson(userFormScheme as any); /* 
  const formUser = await createFormScheme({
    id: 2,
    label: "Formulario de usuario",
  });
  //create first my Data group
  const myDataGroup = await createFormGroup({
    label: "Mis datos",
    form_scheme_id: formUser.id,
  });

  ///create first field
  await createFields({
    component: "input",
    label: "Nombre y Apellidos",
    form_group_id: myDataGroup.id,
    metadata: {
      type: "text",
    },
  });
  const formUser = await createFormScheme({
    id: 2,
    label: "Formulario de usuario",
  });
  //create first my Data group
  const myDataGroup = await createFormGroup({
    label: "Mis datos",
    form_scheme_id: formUser.id,
  });

  ///create first field
  await createFields({
    component: "input",
    label: "Nombre y Apellidos",
    form_group_id: myDataGroup.id,
    metadata: {
      type: "text",
    },
  });

  //create birth group
  const myBirthGroup = await createFormGroup({
    label: "Datos de nacimiento",
    form_scheme_id: formUser.id,
  });

  await createFields({
    label: "Lugar de nacimiento",
    component: "input",
    form_group_id: myBirthGroup.id,
    metadata: {
      type: "text",
    },
  });

  await createFields({
    label: "Fecha de nacimiento",
    component: "input",
    form_group_id: myBirthGroup.id,
    metadata: {
      type: "date",
    },
  });

  await createFields({
    label: "Edad",
    component: "input",
    form_group_id: myBirthGroup.id,
    metadata: {
      type: "number",
    },
  });
  /// create civil group
  const myCivilGroup = await createFormGroup({
    label: "Estado Civil",
    form_scheme_id: formUser.id,
  });

  await createFields({
    label: "Estado civil",
    component: "select",
    form_group_id: myCivilGroup.id,
    metadata: {
      type: "text",
      options: [
        { value: "married", label: "casado" },
        { value: "single", label: "soltero" },
      ],
    },
  });

  await createFields({
    label: "N° de hijos",
    component: "input",
    form_group_id: myCivilGroup.id,
    metadata: {
      type: "number",
    },
  });

  //create birth group
  const myBirthGroup = await createFormGroup({
    label: "Datos de nacimiento",
    form_scheme_id: formUser.id,
  });

  await createFields({
    label: "Lugar de nacimiento",
    component: "input",
    form_group_id: myBirthGroup.id,
    metadata: {
      type: "text",
    },
  });

  await createFields({
    label: "Fecha de nacimiento",
    component: "input",
    form_group_id: myBirthGroup.id,
    metadata: {
      type: "date",
    },
  });

  await createFields({
    label: "Edad",
    component: "input",
    form_group_id: myBirthGroup.id,
    metadata: {
      type: "number",
    },
  });
  /// create civil group
  const myCivilGroup = await createFormGroup({
    label: "Estado Civil",
    form_scheme_id: formUser.id,
  });

  await createFields({
    label: "Estado civil",
    component: "select",
    form_group_id: myCivilGroup.id,
    metadata: {
      type: "text",
      options: [
        { value: "married", label: "casado" },
        { value: "single", label: "soltero" },
      ],
    },
  });

  await createFields({
    label: "N° de hijos",
    component: "input",
    form_group_id: myCivilGroup.id,
    metadata: {
      type: "number",
    },
  }); */
};

export default createUserForm;
