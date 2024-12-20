interface Elements {
  usernameInput?: HTMLInputElement;
  companyInput?: HTMLSelectElement;
  numberInput?: HTMLInputElement;
  featureInput?: HTMLInputElement;
  branchParagraph?: HTMLParagraphElement;
  commitParagraph?: HTMLParagraphElement;
  generateButton?: HTMLButtonElement;
  findButton?: HTMLButtonElement;
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
    findButton,
  } = setupElements();
  if (
    !usernameInput ||
    !companyInput ||
    !numberInput ||
    !featureInput ||
    !branchParagraph ||
    !commitParagraph ||
    !generateButton ||
    !findButton
  ) {
    return;
  }
  generateButton.addEventListener("click", generate);
  findButton.addEventListener("click", findData);

  [usernameInput, companyInput, numberInput, featureInput].forEach((input) =>
    addOnEnterEvent(input)
  );
  [branchParagraph, commitParagraph].forEach((element) => copyText(element));
};

let currentIndex = 0;

const findData = async (): Promise<void> => {
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

  const number = numberInput.value.trim();
  const company = companyInput.value.trim();
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/read.php`;

  let url: string;

  if (number) {
    url = `${apiUrl}?number=${number}&company=${company}`;
    currentIndex = 0;
  } else {
    url = `${apiUrl}?index=${currentIndex}`;
    currentIndex++;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    const branch = data.data?.branch ?? null;
    const commit = data.data?.commit ?? null;

    if (branch && commit) {
      branchParagraph.innerText = branch;
      commitParagraph.innerText = commit;
    } else {

      branchParagraph.innerText = "";
      commitParagraph.innerText = "";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
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
  const findButton = <HTMLButtonElement>document.getElementById("findButton");
  return {
    usernameInput: usernameInput,
    companyInput: companyInput,
    numberInput: numberInput,
    featureInput: featureInput,
    branchParagraph: branchParagraph,
    commitParagraph: commitParagraph,
    generateButton: generateButton,
    findButton: findButton,
  };
};

const updateBackend = async (branch: string, commit: string): Promise<void> => {
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/write.php`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ branch, commit }),
    });

    const data = await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};

mounted();
