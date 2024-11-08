<template>
   
    <slot :name="field.type" :field="field" :model-value="model" :set-model-value="setModelValue" :error-messages="v.$error ? v.$errors.map(error => error.$message) : []">
    </slot>

</template>

<script lang="ts" setup>
import { computed, onMounted, PropType, toRefs } from 'vue';
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
            rules.minLength = helpers.withMessage(validationRule.errorText, minLength(context.value[(validationRule as MinLengthRule).length]))
        }
        if(validationRule.name == 'max_length') {
            rules.maxLength = helpers.withMessage(validationRule.errorText, maxLength(context.value[(validationRule as MaxLengthRule).length]))
        }
        if(validationRule.name == 'less_than') {
            rules.lessThan = helpers.withMessage(validationRule.errorText, maxValue(context.value[(validationRule as GreaterThanRule).value]))
        }
        if(validationRule.name == 'greater_than') {
            rules.greaterThan = helpers.withMessage(validationRule.errorText, minValue(context.value[(validationRule as LessThanRule).value]))
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

const v = useVuelidate(rules, state);

onMounted(() => {
    if(field.value.default) {
        model.value = field.value.default;
    }

})
</script>