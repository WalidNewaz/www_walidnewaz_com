export type clickHandler =
  | ((
      event: React.MouseEvent<
        HTMLAnchorElement | HTMLButtonElement | HTMLDivElement
      >
    ) => void)
  | (() => Promise<void>)
  | (() => void)
  | undefined;

export type ChapterHeading = {
  value: string;
  depth: number;
  id: string;
};