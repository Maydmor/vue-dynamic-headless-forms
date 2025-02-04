import { defineComponent as p, mergeModels as x, useModel as T, toRefs as M, computed as n, onMounted as V, renderSlot as _, unref as s } from "vue";
import { helpers as a, required as q, requiredIf as w, requiredUnless as y, minLength as F, maxLength as D, maxValue as L, minValue as R, sameAs as $ } from "@vuelidate/validators";
import b from "@vuelidate/core";
const U = /* @__PURE__ */ p({
  __name: "DynamicFormField",
  props: /* @__PURE__ */ x({
    field: {},
    context: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(m) {
    const l = T(m, "modelValue"), f = m, { field: t, context: o } = M(f);
    function v(r) {
      l.value = r;
    }
    const h = n(() => {
      const r = {};
      for (const e of t.value.validationRules || [])
        console.debug("Add validation rule: ", e), e.name == "required" && (r.required = a.withMessage(e.errorText, q)), e.name == "required_if" && (r.requiredIf = a.withMessage(e.errorText, w(!!o.value[e.otherFieldName]))), e.name == "required_unless" && (r.requiredUnless = a.withMessage(e.errorText, y(!!o.value[e.otherFieldName]))), e.name == "min_length" && (r.minLength = a.withMessage(e.errorText, F(e.length))), e.name == "max_length" && (r.maxLength = a.withMessage(e.errorText, D(e.length))), e.name == "less_than" && (r.lessThan = a.withMessage(e.errorText, L(e.value))), e.name == "greater_than" && (r.greaterThan = a.withMessage(e.errorText, R(e.value))), e.name == "same_as" && (r.sameAs = a.withMessage(e.errorText, $(o.value[e.otherFieldName])));
      return r;
    }), c = n(() => ({
      model: l.value
    })), g = n(() => ({
      model: { ...h.value }
    }));
    function i(r) {
      if (r.fieldType === "list")
        return [i(r.itemDefinition)];
      if (r.fieldType === "object") {
        let e = {};
        for (const u of r.itemProperties || [])
          e[u.name] = i(u);
        return e;
      }
      return r.default;
    }
    const d = b(g, c);
    return V(() => {
      t.value.default && (l.value === null || l.value === void 0) ? l.value = t.value.default : t.value.fieldType === "object" && (l.value === null || l.value === void 0) ? l.value = i(t.value) : t.value.fieldType === "list" && (l.value === null || l.value === void 0) && (l.value = []);
    }), (r, e) => _(r.$slots, s(t).fieldType, {
      field: s(t),
      modelValue: l.value,
      setModelValue: v,
      getDefaultValue: i,
      errorMessages: s(d).$error ? s(d).$errors.map((u) => u.$message) : []
    });
  }
});
export {
  U as DynamicFormField
};
