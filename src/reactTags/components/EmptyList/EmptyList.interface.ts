import { ModeType, ThemeType } from '../../types/general';

export interface EmptyListProps {
    theme: ThemeType;
    mode: ModeType;
    clickHandler: () => void;
    inputValue: string;
    isLoading: boolean;
    emptyListClassName?: string;
}
