export type ClassName = {
	className: string;
};

export type PageParams<T extends string> = {
	params: Record<T, string>;
};
