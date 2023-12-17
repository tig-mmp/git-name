const { generate, convertCase } = require("../src/main");

interface TestCase {
  username?: string;
  company?: string;
  number?: string;
  feature?: string;
  expectedBranch: string;
  expectedCommit: string;
}

const testCases: TestCase[] = [
  {
    username: "",
    company: "",
    number: "",
    feature: "",
    expectedBranch: "users//-/",
    expectedCommit: "[-]/",
  },
  {
    username: "testUser",
    company: "testCompany",
    number: "123",
    feature: "test feature",
    expectedBranch: "users/testUser/testCompany-123/testFeature",
    expectedCommit: "[testCompany-123]/test feature",
  },
  {
    username: "testUser",
    company: "testCompany",
    number: "123",
    feature: "Test feature",
    expectedBranch: "users/testUser/testCompany-123/TestFeature",
    expectedCommit: "[testCompany-123]/Test feature",
  },
];

test.each(testCases)(
  "Generate branch and commit text correctly",
  ({
    username,
    company,
    number,
    feature,
    expectedBranch,
    expectedCommit,
  }: TestCase) => {
    document.body.innerHTML = `
    <input id="username" value="${username}" />
    <input id="company" value="${company}" />
    <input id="number" value="${number}" />
    <input id="feature" value="${feature}" />
    <button id="generateButton">Generate</button>
    <p id="branch"></p>
    <p id="commit"></p>
  `;

    generate();

    const branchElement = document.getElementById("branch");
    expect(branchElement).not.toBeNull();
    const commitElement = document.getElementById("commit");
    expect(commitElement).not.toBeNull();

    expect(branchElement?.innerText).toBe(expectedBranch);
    expect(commitElement?.innerText).toBe(expectedCommit);
  }
);
