import { ModeType, ThemeType } from '../../interfaces/general';

export interface SelectedTagsListProps {
    theme: ThemeType;
    mode: ModeType;
    maxTags?: number;
    selectedTags: { id: string; tag: string }[];
    setSelectedTags: any;
    setShowDropdown: any;
    onChange?: (tags: string[]) => void;
    selectedTagClassName?: string;
    selectedTagCloseIconClass?: string;
    inputPlaceholder: string;
    inputValue: string;
    inputChangeHandler: any;
    inputKeyDown: any;
    inputClassName?: string;
    inputFocus: boolean;
    setInputFocus: any;
}
