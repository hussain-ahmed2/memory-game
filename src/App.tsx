import { ChangeEvent, useEffect, useState } from "react";
import Card from "./components/Card";

export interface CardType {
	id: number | null;
	value: number | null;
}

export interface SelectedType {
	first: CardType;
	second: CardType;
}

const INITIAL_SELECTED_STATE = {
	first: {
		id: null,
		value: null,
	},
	second: {
		id: null,
		value: null,
	},
};

export default function App() {
	const [length, setLength] = useState<number>(4);
	const [cards, setCards] = useState<CardType[]>(generateCards(length));
	const [matched, setMatched] = useState<CardType[]>([]);
	const [selected, setSelected] = useState<SelectedType>(
		INITIAL_SELECTED_STATE
	);
	const [isWon, setIsWon] = useState<boolean>(false);

	function generateArray(length: number) {
		return Array.from(
			{ length: (length * length) / 2 },
			(_, index) => index + 1
		);
	}

	function generateCards(length: number) {
		const array = generateArray(length);
		return [...array, ...array]
			.map((value, index) => ({ id: index, value: value }))
			.sort(() => Math.random() - 0.5);
	}

	function handleReset() {
		setMatched([]);
		setSelected(INITIAL_SELECTED_STATE);
		setCards(generateCards(length));
		setIsWon(false);
	}

	function handleChange(event: ChangeEvent<HTMLSelectElement>) {
		setLength(parseInt(event.target.value));
	}

	useEffect(() => {
		let id: number;
		if (selected.first.value !== null && selected.second.value !== null) {
			if (selected.first.value === selected.second.value) {
				setMatched((prev) => [...prev, selected.second]);
			}
			id = setTimeout(() => {
				setSelected(INITIAL_SELECTED_STATE);
			}, 300);
		}
		return () => clearTimeout(id);
	}, [selected]);

	useEffect(() => {
		if (matched.length === (length * length) / 2) {
			console.log("game over");
			setIsWon(true);
		}
	}, [matched]);

	useEffect(() => {
		handleReset();
	}, [length]);

	return (
		<div>
			<h1 className="text-center text-2xl font-bold mt-10">
				Memory Game
			</h1>
			<div className="mx-auto w-fit py-5 flex items-center gap-2 justify-center">
				<label htmlFor="length">Select Length</label>
				<select className="border border-blue-200 focus:ring-2 outline-none ring-blue-300 px-4 py-1 rounded-md " onChange={handleChange} defaultValue={4} name="length" id="length">
					<option value='2'>2</option>
					<option value='4'>4</option>
					<option value="6">6</option>
					<option value="8">8</option>
					<option value="10">10</option>
				</select>
			</div>
			<div
				style={{gridTemplateColumns: `repeat(${length}, 60px)`}}
				className={`grid justify-center gap-2 p-4`}
			>
				{cards.map((card, index) => (
					<Card
						key={index}
						card={card}
						matched={matched}
						selected={selected}
						setSelected={setSelected}
					/>
				))}
			</div>
			<div>
				<div
					className={`absolute w-full h-screen top-0 left-0 flex flex-col items-center justify-center gap-4 bg-blue-50/75 text-center transition duration-300 ${
						isWon ? "scale-100 visible" : "scale-0 invisible"
					}`}
				>
					<p className="font-bold text-2xl">
						Congratulation, You Won! the Game.
					</p>
					<button
						className="border bg-sky-500 text-white px-5 py-2 rounded cursor-pointer hover:bg-sky-600"
						onClick={handleReset}
					>
						Play Again!
					</button>
				</div>
			</div>
		</div>
	);
}
