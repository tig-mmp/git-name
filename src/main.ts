import "./styles.css";

const generate = (): void => {
  const username = (<HTMLInputElement>document.getElementById("username"))
    .value;
  const company = (<HTMLInputElement>document.getElementById("company")).value;
  const number = (<HTMLInputElement>document.getElementById("number")).value;
  const feature = (<HTMLInputElement>(
    document.getElementById("feature")
  )).value.trim();

  const featureCase = convertCase(feature);

  const branch = `users/${username}/${company}-${number}/${featureCase}`;
  const commit = `[${company}-${number}]/${feature}`;

  (<HTMLParagraphElement>document.getElementById("resultBranch")).innerText =
    branch;
  (<HTMLParagraphElement>document.getElementById("resultCommit")).innerText =
    commit;
};

const convertCase = (input: string): string => {
  const words = input.split(/\s+/);
  const firstWord = words.shift();
  return [
    firstWord,
    ...words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)),
  ].join("");
};

const mounted = () => {
  const generateButton = document.getElementById("generateButton");
  if (generateButton) {
    generateButton.addEventListener("click", generate);
  }
};

mounted();
