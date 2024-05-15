export interface FormPostDto {
  label: string;
}

export interface FormGetDto {
  id: number;
  label: string;
  form_groups: FormGroupGetDto[];
}

export interface FormGroupGetDto {
  id: number;
  label: string;
  fields: FieldGetDto[];
}

export interface FieldGetDto {
  id: number;
  component: string;
  label: string;
  metadata: object;
}
