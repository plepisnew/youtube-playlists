import clsx from "clsx";
import { HTMLAttributes } from "react";

export type ModalProps = {
	open: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const Modal: React.FC<ModalProps> = ({
	open,
	className,
	...divProps
}) => {
	return (
		<div
			{...divProps}
			className={clsx(
				className,
				"fixed left-0 right-0 top-0 bottom-0 bg-black/10",
			)}
		/>
	);
};
