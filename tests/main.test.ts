const { generate } = require("../src/main");

interface TestCase {
  testName: string;
  username?: string;
  company?: string;
  number?: string;
  feature?: string;
  expectedBranch: string;
  expectedCommit: string;
}

const testCases: TestCase[] = [
  {
    testName: "Test empty inputs",
    username: "",
    company: "",
    number: "",
    feature: "",
    expectedBranch: "users//-/",
    expectedCommit: "[-]/",
  },
  {
    testName: "Test cases (feature lowercase)",
    username: "testUser",
    company: "testCompany",
    number: "123",
    feature: "test feature",
    expectedBranch: "users/testUser/testCompany-123/testFeature",
    expectedCommit: "[testCompany-123]/test feature",
  },
  {
    testName: "Test cases (feature uppercase)",
    username: "testUser",
    company: "testCompany",
    number: "123",
    feature: "Test feature",
    expectedBranch: "users/testUser/testCompany-123/TestFeature",
    expectedCommit: "[testCompany-123]/Test feature",
  },
  {
    testName: "Test feature with spaces",
    username: "testUser",
    company: "testCompany",
    number: "123",
    feature: " test feature ",
    expectedBranch: "users/testUser/testCompany-123/testFeature",
    expectedCommit: "[testCompany-123]/test feature",
  },
  {
    testName: "Test feature ending with a dot",
    username: "testUser",
    company: "testCompany",
    number: "123",
    feature: "test feature . ",
    expectedBranch: "users/testUser/testCompany-123/testFeature",
    expectedCommit: "[testCompany-123]/test feature",
  },
  {
    testName: "Test feature without greater than sign",
    username: "testUser",
    company: "testCompany",
    number: "123",
    feature: "test > feature",
    expectedBranch: "users/testUser/testCompany-123/testFeature",
    expectedCommit: "[testCompany-123]/test feature",
  },
];

testCases.forEach((testCase) =>
  test(testCase.testName, () => testMain(testCase))
);

const testMain = (testCase: TestCase) => {
  const { username, company, number, feature, expectedBranch, expectedCommit } =
    testCase;
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
  if (branchElement) {
    expect(branchElement.innerText).toBe(expectedBranch);
  }

  const commitElement = document.getElementById("commit");
  expect(commitElement).not.toBeNull();
  if (commitElement) {
    expect(commitElement.innerText).toBe(expectedCommit);
  }
};
