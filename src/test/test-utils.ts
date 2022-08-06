// https://www.linkedin.com/pulse/setting-up-rtl-vite-react-project-william-ku
// https://stackblitz.com/edit/vitest-dev-vitest-fhiwyw?file=src%2Futils%2Ftest-utils.tsx&initialPath=__vitest__

/* eslint-disable import/export */
import { render } from "@testing-library/react";

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options,
  });

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render };
