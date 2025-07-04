export interface RenderCondition {
    propertyPath: string,
    hasValue: any,
    renderConditions?: Array<RenderCondition>
}

export interface ValidationRule {
    name: string,
    errorText: string,
    otherFieldName?: string,
    length?: number,
    value?: number
}

export interface RequiredRule extends ValidationRule {
    name: 'required'
}

export interface RequiredIfRule extends ValidationRule {
    name: 'required_if',
    otherFieldName: string
}

export interface RequiredUnlessRule extends ValidationRule {
    name: 'required_unless',
    otherFieldName: string

}

export interface SameAsRule extends ValidationRule {
    name: 'same_as',
    otherFieldName: string
}

export interface SameAsRule extends ValidationRule {
    name: 'same_as',
    otherFieldName: string
}

export interface MinLengthRule extends ValidationRule {
    name: 'min_length',
    length: number
}

export interface MaxLengthRule extends ValidationRule {
    name: 'max_length',
    length: number
}

export interface GreaterThanRule extends ValidationRule {
    name: 'greater_than',
    value: number
}

export interface LessThanRule extends ValidationRule {
    name: 'less_than',
    value: number
}

export interface FormField {
    fieldType: string,
    name: string,
    label?: string
    hint?: string,
    default?: any,
    rendered?: boolean,
    style?: string,
    renderConditions?: Array<RenderCondition>,
    validationRules?: Array<ValidationRule>,
    itemProperties?: Array<FormField>,
    itemDefinition?: FormField,
    choices?: Array<any>,
    radios?: boolean,
    fieldIndex?: number

}
