import { Button } from "primereact/button";
import {
  generateLink,
  getAllForms,
  invalidateLink,
  saveForm,
} from "../../services/form-service";
import { useQuery } from "react-query";
import { Dropdown } from "primereact/dropdown";

const Sales = () => {
  const { data: formsData } = useQuery({ queryFn: getAllForms });

  return (
    <div>
      <Dropdown
        id="form-scheme"
        style={{ width: "100%" }}
        name="area"
        options={formsData?.data.form_schemes}
        optionLabel="name"
        placeholder="Selecciona una plantilla de formulario"
        className="w-full md:w-14rem"
      />
      {formsData?.data.form_schemes.map((formScheme) => {
        return <div key={formScheme.id}>{formScheme.label}</div>;
      })}
      <Button
        onClick={() => {
          saveForm({ form_scheme_id: 1 });
        }}
      >
        Crear nuevo formulario
      </Button>
      <Button
        onClick={() => {
          generateLink(1);
        }}
      >
        generar link
      </Button>
      <Button
        onClick={() => {
          invalidateLink(1);
        }}
      >
        invalidar link
      </Button>
    </div>
  );
};

export default Sales;
