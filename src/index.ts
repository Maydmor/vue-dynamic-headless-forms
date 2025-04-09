import DynamicFormField from "./components/DynamicFormField.vue";
import { FormField, ValidationRule } from "./types";

export { DynamicFormField };
export type { FormField, ValidationRule };
const defaultIndex = 10000000
export const sortFields = (fields: Array<FormField>) => fields.sort((a,b) => (a.fieldIndex || defaultIndex) - (b.fieldIndex || defaultIndex))