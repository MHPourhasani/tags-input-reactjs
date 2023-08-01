import { ModeType, ThemeType } from '../../interfaces/general';

export interface SelectedTagsListProps {
    theme: ThemeType;
    mode: ModeType;
    maxTags?: number;
    selectedTags: string[];
    setSelectedTags: any;
    setShowDropdown: any;
    onChange: any;
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
