import { useState } from "react";
import type { ApiMode } from "../App";

type ViewerResult = {
	imageUrl: string;
	source: string;
	title: string;
};

type ViewerStatus = "idle" | "loading" | "success" | "error";

type CatApiItem = {
	id: string;
	url: string;
	width: number;
	height: number;
};

type DogApiResponse = {
	message: string;
	status: string;
};

type ApiViewerProps = {
	apiMode: ApiMode;
};

const EMPTY_RESULT: ViewerResult = {
	imageUrl: "",
	source: "",
	title: "",
};

export default function ApiViewer({ apiMode }: ApiViewerProps) {
	const [result, setResult] = useState<ViewerResult>(EMPTY_RESULT);
	const [status, setStatus] = useState<ViewerStatus>("idle");
	const [errorMessage, setErrorMessage] = useState("");

	/*
	 *
	 *  CHALLENGE: Refactor handleFetch so that it only reads `apiMode` once.
	 *
	 *  BONUS PTS: Do it without `if`, a ternary operator (`?` / `:`), or a `switch` statement.
	 *
	 *  BONUS PTS: Ensure typesafety.
	 *
	 */

	async function handleFetch() {
		setStatus("loading");
		setErrorMessage("");

		let endpoint = "";

		if (apiMode === "cats") {
			endpoint = "https://api.thecatapi.com/v1/images/search";
		} else if (apiMode === "dogs") {
			endpoint = "https://dog.ceo/api/breeds/image/random";
		} else {
			endpoint = "";
		}

		try {
			const response = await fetch(endpoint);

			if (!response.ok) {
				throw new Error("Request failed.");
			}

			const data: CatApiItem[] | DogApiResponse = await response.json();
			let nextResult = EMPTY_RESULT;

			if (apiMode === "cats") {
				const firstImage = (data as CatApiItem[])[0];
				nextResult = {
					imageUrl: firstImage?.url ?? "",
					source: "https://thecatapi.com/",
					title: "Random cat image",
				};
			} else if (apiMode === "dogs") {
				nextResult = {
					imageUrl: (data as DogApiResponse).message,
					source: "https://dog.ceo/dog-api/",
					title: "Random dog image",
				};
			} else {
				nextResult = EMPTY_RESULT;
			}

			setResult(nextResult);
			setStatus("success");
		} catch (error) {
			setStatus("error");
			setResult(EMPTY_RESULT);
			setErrorMessage(
				error instanceof Error ? error.message : "Unknown error.",
			);
		}
	}

	return (
		<section className="viewer">
			<button className="fetch-button" onClick={handleFetch} type="button">
				{status === "loading" ? "Fetching..." : "Fetch"}
			</button>

			{status === "error" ? <p className="error-text">{errorMessage}</p> : null}

			{result.imageUrl ? (
				<article className="result-card">
					<img alt={result.title} src={result.imageUrl} />
					<div className="result-copy">
						<h2>{result.title}</h2>
						<a href={result.source} rel="noreferrer" target="_blank">
							View API source
						</a>
					</div>
				</article>
			) : null}
		</section>
	);
}
