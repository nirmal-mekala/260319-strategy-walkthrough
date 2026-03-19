import { useState } from "react";
import ApiViewer from "./components/ApiViewer";

export type ApiMode = "cats" | "dogs";

type ApiOption = {
  value: ApiMode;
  label: string;
  description: string;
};

const OPTIONS: ApiOption[] = [
  {
    value: "cats",
    label: "Cats",
    description: "The Cat API returns an array of image objects.",
  },
  {
    value: "dogs",
    label: "Dogs",
    description: "Dog CEO returns an object with a message field.",
  },
];

export default function App() {
  const [selectedApi, setSelectedApi] = useState<ApiMode>("cats");

  const activeOption = OPTIONS.find((option) => option.value === selectedApi);

  return (
    <main className="page-shell">
      <section className="panel">
        <p className="eyebrow">Strategy Refactor Setup</p>
        <h1>Random pet media fetcher</h1>

        <label className="field">
          <span>Choose an API</span>
          <select
            value={selectedApi}
            onChange={(event) => setSelectedApi(event.target.value as ApiMode)}
          >
            {OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <p className="selected-description">{activeOption?.description}</p>

        <ApiViewer apiMode={selectedApi} />
      </section>
    </main>
  );
}
