const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string) ?? "http://localhost:8000";
import { buildBranchAndCommit } from "./lib/gitname";

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
  const feature = featureInput.value;
  const { branch, commit } = buildBranchAndCommit(
    username,
    company,
    number,
    feature
  );

  branchParagraph.innerText = branch;
  commitParagraph.innerText = commit;
  updateBackend(branch, commit);
};

// `convertCase` is implemented in `src/lib/gitname.ts` and imported where needed.

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
let lastCompany: string | null = null;
let lastNumber: string | null = null;

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
  const apiUrl = `${API_BASE_URL}/read.php`;

  if (number || lastNumber !== number || lastCompany !== company) {
    currentIndex = 0;
    lastCompany = company;
    lastNumber = number;
  } else {
    currentIndex++;
  }

  const searchParams = new URLSearchParams();
  if (number) {
    searchParams.set("number", number);
  }
  if (company) {
    searchParams.set("company", company);
  }
  if (currentIndex) {
    searchParams.set("index", String(currentIndex));
  }
  let url = `${apiUrl}?${searchParams.toString()}`;

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
  const apiUrl = `${API_BASE_URL}/write.php`;

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
