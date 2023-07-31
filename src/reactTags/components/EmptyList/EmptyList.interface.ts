import { ThemeType } from "../../interfaces/general";

export interface EmptyListProps {
    theme: ThemeType;
    clickHandler: () => void;
    inputValue: string;
    resolveStatus: boolean | undefined;
}
