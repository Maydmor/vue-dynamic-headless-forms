import { defineComponent as p, mergeModels as x, useModel as M, toRefs as T, computed as i, onMounted as V, renderSlot as _, unref as n } from "vue";
import { helpers as a, required as q, requiredIf as w, requiredUnless as F, minLength as y, maxLength as D, maxValue as L, minValue as R, sameAs as $ } from "@vuelidate/validators";
import A from "@vuelidate/core";
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
    const o = M(m, "modelValue"), f = m, { field: t, context: l } = T(f);
    function v(r) {
      o.value = r;
    }
    const h = i(() => {
      const r = {};
      for (const e of t.value.validationRules || [])
        console.debug("Add validation rule: ", e), e.name == "required" && (r.required = a.withMessage(e.errorText, q)), e.name == "required_if" && (r.requiredIf = a.withMessage(e.errorText, w(!!l.value[e.otherFieldName]))), e.name == "required_unless" && (r.requiredUnless = a.withMessage(e.errorText, F(!!l.value[e.otherFieldName]))), e.name == "min_length" && (r.minLength = a.withMessage(e.errorText, y(l.value[e.length]))), e.name == "max_length" && (r.maxLength = a.withMessage(e.errorText, D(l.value[e.length]))), e.name == "less_than" && (r.lessThan = a.withMessage(e.errorText, L(l.value[e.value]))), e.name == "greater_than" && (r.greaterThan = a.withMessage(e.errorText, R(l.value[e.value]))), e.name == "same_as" && (r.sameAs = a.withMessage(e.errorText, $(l.value[e.otherFieldName])));
      return r;
    }), c = i(() => ({
      model: o.value
    })), g = i(() => ({
      model: { ...h.value }
    }));
    function s(r) {
      if (t.value.type === "list")
        return s(t.value.itemDefinition);
      if (t.value.type === "object") {
        let e = {};
        for (const u of t.value.properties || [])
          e[u.name] = s();
        return e;
      }
      return t.value.default;
    }
    const d = A(g, c);
    return V(() => {
      t.value.default && (o.value = t.value.default);
    }), (r, e) => _(r.$slots, n(t).type, {
      field: n(t),
      modelValue: o.value,
      setModelValue: v,
      getDefaultValue: s,
      errorMessages: n(d).$error ? n(d).$errors.map((u) => u.$message) : []
    });
  }
});
export {
  U as DynamicFormField
};
