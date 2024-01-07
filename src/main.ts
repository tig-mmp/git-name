interface Elements {
  usernameInput?: HTMLInputElement;
  companyInput?: HTMLInputElement;
  numberInput?: HTMLInputElement;
  featureInput?: HTMLInputElement;
  branchParagraph?: HTMLParagraphElement;
  commitParagraph?: HTMLParagraphElement;
  generateButton?: HTMLButtonElement;
}

export const generate = (): void => {
  const {
    usernameInput,
    companyInput,
    numberInput,
    featureInput,
    branchParagraph,
    commitParagraph,
  } = setupElements();
  if (
    !usernameInput ||
    !companyInput ||
    !numberInput ||
    !featureInput ||
    !branchParagraph ||
    !commitParagraph
  ) {
    return;
  }
  const username = usernameInput.value;
  const company = companyInput.value;
  const number = numberInput.value;
  let feature = featureInput.value.trim();
  if (feature.endsWith(".")) {
    feature = feature.slice(0, -1).trim();
  }
  const featureCase = convertCase(feature);

  const branch = `users/${username}/${company}-${number}/${featureCase}`;
  const commit = `[${company}-${number}]/${feature}`;

  branchParagraph.innerText = branch;
  commitParagraph.innerText = commit;
};

const convertCase = (input?: string): string => {
  if (!input) {
    return "";
  }
  const words = input.split(/\s+/);
  const firstWord = words.shift();
  return [
    firstWord,
    ...words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)),
  ].join("");
};

const mounted = () => {
  const {
    usernameInput,
    companyInput,
    numberInput,
    featureInput,
    branchParagraph,
    commitParagraph,
    generateButton,
  } = setupElements();
  if (
    !usernameInput ||
    !companyInput ||
    !numberInput ||
    !featureInput ||
    !generateButton
  ) {
    return;
  }
  generateButton.addEventListener("click", generate);

  [usernameInput, companyInput, numberInput, featureInput].forEach((input) =>
    addOnEnterEvent(input)
  );
};

const addOnEnterEvent = (input: HTMLInputElement | null) => {
  if (!input) {
    return;
  }
  input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") generate();
  });
};

const setupElements = (): Elements => {
  const usernameInput = <HTMLInputElement>document.getElementById("username");
  const companyInput = <HTMLInputElement>document.getElementById("company");
  const numberInput = <HTMLInputElement>document.getElementById("number");
  const featureInput = <HTMLInputElement>document.getElementById("feature");
  const branchParagraph = <HTMLParagraphElement>(
    document.getElementById("branch")
  );
  const commitParagraph = <HTMLParagraphElement>(
    document.getElementById("commit")
  );
  const generateButton = <HTMLButtonElement>(
    document.getElementById("generateButton")
  );
  return {
    usernameInput: usernameInput,
    companyInput: companyInput,
    numberInput: numberInput,
    featureInput: featureInput,
    branchParagraph: branchParagraph,
    commitParagraph: commitParagraph,
    generateButton: generateButton,
  };
};

mounted();
