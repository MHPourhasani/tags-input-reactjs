import { ModeType, ThemeType } from '../../interfaces/general';

export interface SelectedTagsListProps {
    theme: ThemeType;
    mode: ModeType;
    maxTags?: number;
    selectedTags: string[];
    setSelectedTags: any;
    onChange: any;
    selectedTagClassName?: string;
    selectedTagCloseIconClass?: string;
    inputPlaceholder: string;
    inputValue: string;
    inputChangeHandler: any;
    inputKeyDown: any;
    setShowDropdown: any;
    inputClassName?: string;
}
