interface Elements {
  usernameInput?: HTMLInputElement;
  companyInput?: HTMLSelectElement;
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
  let feature = featureInput.value.replace("  ", " ").trim();
  if (feature.endsWith(".")) {
    feature = feature.slice(0, -1).trim();
  }
  const featureCase = convertCase(feature);

  const branch = `users/${username}/${company}-${number}/${featureCase}`;
  const commit = `[${company}-${number}]/${feature}`;

  branchParagraph.innerText = branch;
  commitParagraph.innerText = commit;
  updateBackend(branch, commit);
};

const convertCase = (input?: string): string => {
  if (!input) {
    return "";
  }
  const words = input.replace(/[/:*"<>|\\]/g, "").split(/\s+/);
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
    !branchParagraph ||
    !commitParagraph ||
    !generateButton
  ) {
    return;
  }
  generateButton.addEventListener("click", generate);

  [usernameInput, companyInput, numberInput, featureInput].forEach((input) =>
    addOnEnterEvent(input)
  );
  [branchParagraph, commitParagraph].forEach((element) => copyText(element));
};

const addOnEnterEvent = (
  input: HTMLInputElement | HTMLSelectElement | null
) => {
  if (!input) {
    return;
  }
  input.addEventListener("keyup", (event) => {
    if ("key" in event && event.key === "Enter") generate();
  });
};

const copyText = (element: HTMLParagraphElement) => {
  element.addEventListener("click", () => {
    const text = element.innerText ?? element.textContent;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      var textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  });
};

const setupElements = (): Elements => {
  const usernameInput = <HTMLInputElement>document.getElementById("username");
  const companyInput = <HTMLSelectElement>document.getElementById("company");
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

const updateBackend = async (branch: string, commit: string): Promise<void> => {
  try {
    writeDateInBackend(branch);
    writeDateInBackend(commit);
  } catch (error) {
    console.error("Error writing data:", error);
  }
};

const writeDateInBackend = async (data: string) => {
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/write`;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  });
  if (!response.ok) {
    console.log(response);
  }
};

mounted();
