import { defineComponent as T, mergeModels as M, useModel as y, toRefs as V, computed as n, onMounted as _, renderSlot as q, unref as s } from "vue";
import { helpers as l, required as w, requiredIf as N, requiredUnless as F, minLength as S, maxLength as J, maxValue as O, minValue as D, sameAs as A } from "@vuelidate/validators";
import L from "@vuelidate/core";
const j = /* @__PURE__ */ T({
  __name: "DynamicFormField",
  props: /* @__PURE__ */ M({
    field: {},
    context: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(o) {
    const t = y(o, "modelValue"), g = o, { field: a, context: u } = V(g);
    function c(r) {
      t.value = r;
    }
    const h = n(() => {
      const r = {};
      for (const e of a.value.validationRules || [])
        console.debug("Add validation rule: ", e), e.name == "required" && (r.required = l.withMessage(e.errorText, w)), e.name == "required_if" && (r.requiredIf = l.withMessage(e.errorText, N(!!u.value[e.otherFieldName]))), e.name == "required_unless" && (r.requiredUnless = l.withMessage(e.errorText, F(!!u.value[e.otherFieldName]))), e.name == "min_length" && (r.minLength = l.withMessage(e.errorText, S(e.length))), e.name == "max_length" && (r.maxLength = l.withMessage(e.errorText, J(e.length))), e.name == "less_than" && (r.lessThan = l.withMessage(e.errorText, O(e.value))), e.name == "greater_than" && (r.greaterThan = l.withMessage(e.errorText, D(e.value))), e.name == "same_as" && (r.sameAs = l.withMessage(e.errorText, A(u.value[e.otherFieldName])));
      return r;
    }), p = n(() => ({
      model: t.value
    })), x = n(() => ({
      model: { ...h.value }
    }));
    function m(r) {
      function e(i) {
        if (i.fieldType === "list")
          return [e(i.itemDefinition)];
        if (i.fieldType === "object") {
          let f = {};
          for (const v of i.itemProperties || [])
            f[v.name] = e(v);
          return f;
        }
        return JSON.parse(JSON.stringify(i.default));
      }
      return JSON.parse(JSON.stringify(e(r)));
    }
    const d = L(x, p);
    return _(() => {
      a.value.default && (t.value === null || t.value === void 0) ? t.value = JSON.parse(JSON.stringify(a.value.default)) : a.value.fieldType === "object" && (t.value === null || t.value === void 0) ? t.value = m(a.value) : a.value.fieldType === "list" && (t.value === null || t.value === void 0) && (t.value = new Array());
    }), (r, e) => q(r.$slots, s(a).fieldType, {
      field: s(a),
      modelValue: t.value,
      setModelValue: c,
      getDefaultValue: m,
      errorMessages: s(d).$error ? s(d).$errors.map((i) => i.$message) : []
    });
  }
});
export {
  j as DynamicFormField
};
