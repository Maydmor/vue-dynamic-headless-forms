<template>
   
    <slot :name="field.fieldType" :field="field" :model-value="model" :set-model-value="setModelValue" :get-default-value="getDefaultValue" :error-messages="v.$error ? v.$errors.map(error => error.$message) : []">
    </slot>

</template>

<script lang="ts" setup>
import { computed, onMounted, toRefs } from 'vue';
import { FormField, GreaterThanRule, LessThanRule, MaxLengthRule, MinLengthRule, RequiredIfRule, RequiredUnlessRule, SameAsRule } from '../types';
import { helpers, required, requiredIf, requiredUnless, minLength, maxLength, minValue, maxValue, sameAs } from '@vuelidate/validators';
import useVuelidate, { ValidationRule } from '@vuelidate/core';

const model = defineModel()
const props = defineProps<{
    field: FormField,
    context: Record<string, any>
}>();
const { field, context } = toRefs(props);

function setModelValue(value: any)  {
    model.value = value;
}
const validationRules = computed(() => {
    const rules = {
    } as Record<string, ValidationRule|undefined>
    for(const validationRule of field.value.validationRules || []) {

        console.debug(`Add validation rule: `, validationRule)
        if(validationRule.name == 'required') {
            rules.required = helpers.withMessage(validationRule.errorText, required);
        }
        if(validationRule.name == 'required_if') {
            rules.requiredIf = helpers.withMessage(validationRule.errorText, requiredIf(!!context.value[(validationRule as RequiredIfRule).otherFieldName]))
        }
        if(validationRule.name == 'required_unless') {
            rules.requiredUnless = helpers.withMessage(validationRule.errorText, requiredUnless(!!context.value[(validationRule as RequiredUnlessRule).otherFieldName]))
        }
        if(validationRule.name == 'min_length') {
            rules.minLength = helpers.withMessage(validationRule.errorText, minLength(validationRule.length!))
        }
        if(validationRule.name == 'max_length') {
            rules.maxLength = helpers.withMessage(validationRule.errorText, maxLength(validationRule.length!))
        }
        if(validationRule.name == 'less_than') {
            rules.lessThan = helpers.withMessage(validationRule.errorText, maxValue(validationRule.value!))
        }
        if(validationRule.name == 'greater_than') {
            rules.greaterThan = helpers.withMessage(validationRule.errorText, minValue(validationRule.value!))
        }
        if(validationRule.name == 'same_as') {
            rules.sameAs = helpers.withMessage(validationRule.errorText, sameAs(context.value[(validationRule as SameAsRule).otherFieldName]))
        }
    }
    return rules
}) 

const state = computed(() => {
    return {
        model: model.value
    }
})

const rules = computed(() => {
    return {
        model: {...validationRules.value}
    }

})

function getDefaultValue(fieldInfo: FormField): any {
    function _getDefaultValue(fieldInfo: FormField): any {
        if(fieldInfo.fieldType === 'list') {
            // returns the items default value
            return [_getDefaultValue(fieldInfo.itemDefinition!)]
        }
        if(fieldInfo.fieldType === 'object') {
            // returns the objects default value
            let defaultValue: Record<string, any> = {}
            for(const property of fieldInfo.itemProperties ||[]) {
                defaultValue[property.name] = _getDefaultValue(property);
            }
            return defaultValue;
        }
        return JSON.parse(JSON.stringify(fieldInfo.default));
    }
    return JSON.parse(JSON.stringify(_getDefaultValue(fieldInfo)));
}



const v = useVuelidate(rules, state);

onMounted(() => {
    if(field.value.default && (model.value === null || model.value === undefined)) {
        // use default value defined in default
        model.value = JSON.parse(JSON.stringify(field.value.default));
    }
    else if (field.value.fieldType === 'object' && (model.value === null || model.value === undefined || (typeof model.value === 'object' && Object.keys(model.value).length === 0))) {
        // prefill object by getDefaultValue
        model.value = getDefaultValue(field.value);
    }
    else if (field.value.fieldType === 'list' && (model.value === null || model.value === undefined)) {
        // set default to []
        model.value = new Array();
    }
    

})
</script>