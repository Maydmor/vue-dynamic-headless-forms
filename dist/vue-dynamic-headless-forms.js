import { defineComponent as p, mergeModels as x, useModel as M, toRefs as T, computed as n, onMounted as V, renderSlot as _, unref as o } from "vue";
import { helpers as l, required as q, requiredIf as w, requiredUnless as y, minLength as N, maxLength as F, maxValue as D, minValue as L, sameAs as R } from "@vuelidate/validators";
import $ from "@vuelidate/core";
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
    const t = M(m, "modelValue"), v = m, { field: a, context: i } = T(v);
    function f(r) {
      t.value = r;
    }
    const h = n(() => {
      const r = {};
      for (const e of a.value.validationRules || [])
        console.debug("Add validation rule: ", e), e.name == "required" && (r.required = l.withMessage(e.errorText, q)), e.name == "required_if" && (r.requiredIf = l.withMessage(e.errorText, w(!!i.value[e.otherFieldName]))), e.name == "required_unless" && (r.requiredUnless = l.withMessage(e.errorText, y(!!i.value[e.otherFieldName]))), e.name == "min_length" && (r.minLength = l.withMessage(e.errorText, N(e.length))), e.name == "max_length" && (r.maxLength = l.withMessage(e.errorText, F(e.length))), e.name == "less_than" && (r.lessThan = l.withMessage(e.errorText, D(e.value))), e.name == "greater_than" && (r.greaterThan = l.withMessage(e.errorText, L(e.value))), e.name == "same_as" && (r.sameAs = l.withMessage(e.errorText, R(i.value[e.otherFieldName])));
      return r;
    }), c = n(() => ({
      model: t.value
    })), g = n(() => ({
      model: { ...h.value }
    }));
    function u(r) {
      if (r.typeName === "list")
        return [u(r.itemDefinition)];
      if (r.typeName === "object") {
        let e = {};
        for (const s of r.itemProperties || [])
          e[s.name] = u(s);
        return e;
      }
      return r.default;
    }
    const d = $(g, c);
    return V(() => {
      a.value.default && (t.value === null || t.value === void 0) ? t.value = a.value.default : a.value.typeName === "object" && (t.value === null || t.value === void 0) ? t.value = u(a.value) : a.value.typeName === "list" && (t.value === null || t.value === void 0) && (t.value = []);
    }), (r, e) => _(r.$slots, o(a).typeName, {
      field: o(a),
      modelValue: t.value,
      setModelValue: f,
      getDefaultValue: u,
      errorMessages: o(d).$error ? o(d).$errors.map((s) => s.$message) : []
    });
  }
});
export {
  U as DynamicFormField
};
