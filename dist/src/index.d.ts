import { default as DynamicFormField } from './components/DynamicFormField.vue';
import { FormField, ValidationRule, RenderCondition } from './types';
export { DynamicFormField };
export type { FormField, ValidationRule, RenderCondition };
export declare const sortFields: (fields: Array<FormField>) => FormField[];
export declare const evaluateRenderCondition: (context: Record<string, any>, renderCondition: RenderCondition) => boolean;
export declare const isRendered: (context: Record<string, any>, field: FormField) => boolean;
//# sourceMappingURL=index.d.ts.map