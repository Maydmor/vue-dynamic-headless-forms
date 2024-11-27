import { defineComponent as p, mergeModels as x, useModel as M, toRefs as T, computed as u, onMounted as V, renderSlot as _, unref as o } from "vue";
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
    const l = M(m, "modelValue"), f = m, { field: t, context: n } = T(f);
    function h(r) {
      l.value = r;
    }
    const c = u(() => {
      const r = {};
      for (const e of t.value.validationRules || [])
        console.debug("Add validation rule: ", e), e.name == "required" && (r.required = a.withMessage(e.errorText, q)), e.name == "required_if" && (r.requiredIf = a.withMessage(e.errorText, w(!!n.value[e.otherFieldName]))), e.name == "required_unless" && (r.requiredUnless = a.withMessage(e.errorText, F(!!n.value[e.otherFieldName]))), e.name == "min_length" && (r.minLength = a.withMessage(e.errorText, y(e.length))), e.name == "max_length" && (r.maxLength = a.withMessage(e.errorText, D(e.length))), e.name == "less_than" && (r.lessThan = a.withMessage(e.errorText, L(e.value))), e.name == "greater_than" && (r.greaterThan = a.withMessage(e.errorText, R(e.value))), e.name == "same_as" && (r.sameAs = a.withMessage(e.errorText, $(n.value[e.otherFieldName])));
      return r;
    }), g = u(() => ({
      model: l.value
    })), v = u(() => ({
      model: { ...c.value }
    }));
    function s(r) {
      if (t.value.type === "list")
        return s(t.value.itemDefinition);
      if (t.value.type === "object") {
        let e = {};
        for (const i of t.value.properties || [])
          e[i.name] = s();
        return e;
      }
      return t.value.default;
    }
    const d = A(v, g);
    return V(() => {
      t.value.default && (l.value = t.value.default);
    }), (r, e) => _(r.$slots, o(t).type, {
      field: o(t),
      modelValue: l.value,
      setModelValue: h,
      getDefaultValue: s,
      errorMessages: o(d).$error ? o(d).$errors.map((i) => i.$message) : []
    });
  }
});
export {
  U as DynamicFormField
};
