import { buildBranchAndCommit, convertCase } from "../src/lib/gitname";

describe("Bracket sanitization", () => {
  test("convertCase removes '[' and ']' characters", () => {
    const out = convertCase("feat [x] some]feature");
    expect(out).not.toMatch(/\[|\]/);
  });

  test("buildBranchAndCommit produces branch without '['", () => {
    const { branch } = buildBranchAndCommit("user[", "company", "1", "feat");
    expect(branch).not.toContain("[");
  });

  test("buildBranchAndCommit produces branch without ']'", () => {
    const { branch } = buildBranchAndCommit("user", "comp]any", "1", "feat");
    expect(branch).not.toContain("]");
  });
});
