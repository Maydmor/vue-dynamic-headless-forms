import { defineComponent as y, mergeModels as M, useModel as V, toRefs as _, computed as d, onMounted as q, renderSlot as w, unref as n } from "vue";
import { helpers as a, required as N, requiredIf as F, requiredUnless as O, minLength as S, maxLength as J, maxValue as b, minValue as D, sameAs as j } from "@vuelidate/validators";
import A from "@vuelidate/core";
const U = /* @__PURE__ */ y({
  __name: "DynamicFormField",
  props: /* @__PURE__ */ M({
    field: {},
    context: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(s) {
    const r = V(s, "modelValue"), u = s, { field: l, context: o } = _(u);
    function h(t) {
      r.value = t;
    }
    const p = d(() => {
      const t = {};
      for (const e of l.value.validationRules || [])
        console.debug("Add validation rule: ", e), e.name == "required" && (t.required = a.withMessage(e.errorText, N)), e.name == "required_if" && (t.requiredIf = a.withMessage(e.errorText, F(!!o.value[e.otherFieldName]))), e.name == "required_unless" && (t.requiredUnless = a.withMessage(e.errorText, O(!!o.value[e.otherFieldName]))), e.name == "min_length" && (t.minLength = a.withMessage(e.errorText, S(e.length))), e.name == "max_length" && (t.maxLength = a.withMessage(e.errorText, J(e.length))), e.name == "less_than" && (t.lessThan = a.withMessage(e.errorText, b(e.value))), e.name == "greater_than" && (t.greaterThan = a.withMessage(e.errorText, D(e.value))), e.name == "same_as" && (t.sameAs = a.withMessage(e.errorText, j(o.value[e.otherFieldName])));
      return t;
    }), x = d(() => ({
      model: r.value
    })), T = d(() => ({
      model: { ...p.value }
    }));
    function m(t) {
      function e(i) {
        if (i.fieldType === "list")
          return [e(i.itemDefinition)];
        if (i.fieldType === "object") {
          let v = {};
          for (const c of i.itemProperties || [])
            v[c.name] = e(c);
          return v;
        }
        return JSON.parse(JSON.stringify(i.default));
      }
      return JSON.parse(JSON.stringify(e(t)));
    }
    const f = A(T, x);
    return q(() => {
      l.value.default && (r.value === null || r.value === void 0) ? r.value = JSON.parse(JSON.stringify(l.value.default)) : l.value.fieldType === "object" && (r.value === null || r.value === void 0 || typeof r.value == "object" && Object.keys(r.value).length === 0) ? r.value = m(l.value) : l.value.fieldType === "list" && (r.value === null || r.value === void 0) && (r.value = new Array());
    }), (t, e) => w(t.$slots, n(l).fieldType, {
      field: n(l),
      modelValue: r.value,
      setModelValue: h,
      getDefaultValue: m,
      errorMessages: n(f).$error ? n(f).$errors.map((i) => i.$message) : []
    });
  }
}), g = 1e7, k = (s) => s.sort((r, u) => (r.fieldIndex || g) - (u.fieldIndex || g));
export {
  U as DynamicFormField,
  k as sortFields
};
