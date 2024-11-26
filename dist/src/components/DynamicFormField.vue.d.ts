import { FormField } from '../types';
declare let __VLS_typeProps: {
    field: FormField;
    context: Record<string, any>;
};
declare function setModelValue(value: any): void;
declare function getDefaultValue(fieldInfo: FormField): any;
type __VLS_PublicProps = {
    modelValue?: any;
} & typeof __VLS_typeProps;
declare function __VLS_template(): {
    slots: Partial<Record<string, (_: {
        field: FormField;
        modelValue: unknown;
        setModelValue: typeof setModelValue;
        getDefaultValue: typeof getDefaultValue;
        errorMessages: (string | import('vue').Ref<string, string>)[];
    }) => any>>;
    refs: {};
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (modelValue: any) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((modelValue: any) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=DynamicFormField.vue.d.ts.map