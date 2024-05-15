import { useQuery } from "react-query";
import { getAllForms } from "../../services/form-service";

const Forms = () => {
  const { data: formsData } = useQuery({ queryFn: getAllForms });

  return (
    <>
      {formsData?.data.forms.map((form) => {
        return (
          <div key={form.id}>
            <h2>{form.label}</h2>
            {form.form_groups.map((formGroup) => {
              return (
                <div key={formGroup.id}>
                  <h3>{formGroup.label}</h3>
                  {formGroup.fields.map((field) => {
                    return (
                      <div key={field.id}>
                        <label htmlFor="">{field.label}</label>
                        <input type="text" />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default Forms;
