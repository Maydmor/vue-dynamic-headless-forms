import { defineComponent as c, mergeModels as x, useModel as M, toRefs as p, computed as n, onMounted as T, renderSlot as _, unref as o } from "vue";
import { helpers as a, required as q, requiredIf as w, requiredUnless as V, minLength as F, maxLength as L, maxValue as R, minValue as $, sameAs as y } from "@vuelidate/validators";
import N from "@vuelidate/core";
const U = /* @__PURE__ */ c({
  __name: "DynamicFormField",
  props: /* @__PURE__ */ x({
    field: {},
    context: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(i) {
    const l = M(i, "modelValue"), m = i, { field: s, context: t } = p(m);
    function d(r) {
      l.value = r;
    }
    const f = n(() => {
      const r = {};
      for (const e of s.value.validationRules || [])
        e.name == "required" && (r.required = a.withMessage(e.errorText, q)), e.name == "required_if" && (r.requiredIf = a.withMessage(e.errorText, w(!!t.value[e.otherFieldName]))), e.name == "required_unless" && (r.requiredUnless = a.withMessage(e.errorText, V(!!t.value[e.otherFieldName]))), e.name == "min_length" && (r.minLength = a.withMessage(e.errorText, F(t.value[e.length]))), e.name == "max_length" && (r.maxLength = a.withMessage(e.errorText, L(t.value[e.length]))), e.name == "less_than" && (r.lessThan = a.withMessage(e.errorText, R(t.value[e.value]))), e.name == "greater_than" && (r.greaterThan = a.withMessage(e.errorText, $(t.value[e.value]))), e.name == "same_as" && (r.sameAs = a.withMessage(e.errorText, y(t.value[e.otherFieldName])));
      return r;
    }), h = n(() => ({
      model: l.value
    })), g = n(() => ({
      model: { ...f.value }
    })), u = N(g, h);
    return T(() => {
      s.value.default && (l.value = s.value.default);
    }), (r, e) => _(r.$slots, o(s).type, {
      field: o(s),
      modelValue: l.value,
      setModelValue: d,
      errorMessages: o(u).$error ? o(u).$errors.map((v) => v.$message) : []
    });
  }
});
export {
  U as DynamicFormField
};
