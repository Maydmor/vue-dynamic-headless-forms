import { openBlock as e, createElementBlock as o } from "vue";
const t = (c, n) => {
  const r = c.__vccOpts || c;
  for (const [_, i] of n)
    r[_] = i;
  return r;
}, m = {};
function s(c, n) {
  return e(), o("div", null, "Dynamic Form");
}
const d = /* @__PURE__ */ t(m, [["render", s]]), a = {};
function l(c, n) {
  return e(), o("div", null, "Dynamic FormField");
}
const u = /* @__PURE__ */ t(a, [["render", l]]);
export {
  d as DynamicForm,
  u as DynamicFormField
};
