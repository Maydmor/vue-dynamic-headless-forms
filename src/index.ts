import DynamicFormField from "./components/DynamicFormField.vue";
import { FormField, ValidationRule, RenderCondition } from "./types";
import { get } from 'lodash';
export { DynamicFormField };
export type { FormField, ValidationRule, RenderCondition };
const defaultIndex = 10000000
export const sortFields = (fields: Array<FormField>) => fields.sort((a,b) => (a.fieldIndex || defaultIndex) - (b.fieldIndex || defaultIndex))
export const evaluateRenderCondition = (context: Record<string, any>, renderCondition: RenderCondition) => {
    const propertyValue = get(context, renderCondition.propertyPath);
    let rendered = propertyValue == renderCondition.hasValue;
    if(renderCondition.renderConditions?.length) {
        for(const childCondition of renderCondition.renderConditions || []) {
            if(evaluateRenderCondition(context, childCondition)){
                return rendered
            }
        }
        return false;
    }
    return rendered;
}

export const isRendered = (context: Record<string, any>, field: FormField) => {
    if(!field.rendered) {
        return false;
    }
    if(field.renderConditions?.length){
        for(const renderCondition of field.renderConditions) {
            if(evaluateRenderCondition(context, renderCondition)){
                return true;
            }
        }
        return false;
    }
    return true
};
// export const rendered = (field: FormField) => 