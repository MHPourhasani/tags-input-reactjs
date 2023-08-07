import { ModeType, SelectedTagsType, ThemeType } from '../../types/general';

export interface SelectedTagsListProps {
    theme: ThemeType;
    mode: ModeType;
    maxTags?: number;
    selectedTags: SelectedTagsType;
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
