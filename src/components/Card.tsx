import { Dispatch, SetStateAction } from "react";
import { CardType, SelectedType } from "../App";

export default function Card({
	card,
	matched,
	selected,
	setSelected,
}: {
	card: CardType;
	matched: CardType[];
	selected: SelectedType;
	setSelected: Dispatch<SetStateAction<SelectedType>>;
}) {
	function handleClick() {
		if (selected.first.id === null) {
			setSelected((prev) => ({ ...prev, first: card }));
		} else {
			setSelected((prev) => ({ ...prev, second: card }));
		}
	}
	return (
		<div
			className={`relative aspect-square overflow-hidden rounded`}
			onClick={handleClick}
		>
			<button
				disabled={
					matched.find((item) => item.value === card.value) && true
				}
				className={`relative h-full w-full bg-blue-100 transform-3d transition-all duration-300 ${
					matched.find((item) => item.value === card.value) ||
					selected.first?.id === card.id ||
					selected.second?.id === card.id
						? "rotate-y-180 opacity-0"
						: "cursor-pointer"
				}`}
			></button>
			<button
				disabled={
					(matched.find((item) => item.value === card.value) ||
						selected.first?.id === card.id ||
						selected.second?.id === card.id) &&
					true
				}
				className={`font-semibold text-2xl absolute top-0 left-0 w-full h-full grid place-content-center transform-3d transition-all duration-300 ${
					!(
						matched.find((item) => item.value === card.value) ||
						selected.first?.id === card.id ||
						selected.second?.id === card.id
					) && "-rotate-y-180 opacity-0"
				} ${
					matched.find((item) => item.value === card.value)
						? "!bg-green-500"
						: selected.first?.id === card.id ||
						  selected.second?.id === card.id
						? "bg-yellow-500"
						: "cursor-pointer"
				}`}
			>
				{card.value}
			</button>
		</div>
	);
}
