import { ModeType, SelectedTagsType, ThemeType } from '../../types/general';

export interface DropdownProps {
    theme: ThemeType;
    mode: ModeType;
    maxTags?: number;
    filteredTags: string[];
    selectedTags: SelectedTagsType;
    setSelectedTags: any;
    onChange: any;
    dropDownContainerClassName?: string;
    inputValue: string;
    setInputValue: any;
    activeIndex?: number | null;
    clickHandler: () => void;
    setShowDropdown?: any;
    isLoading: boolean;
}
