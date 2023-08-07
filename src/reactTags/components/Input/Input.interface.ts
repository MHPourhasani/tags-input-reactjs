import { SelectedTagsType, ThemeType } from '../../types/general';

export interface InputProps {
    label?: string;
    placeholder?: string;
    value?: string;
    changeHandler?: (e: any) => void;
    keyDown?: (e: any) => void;
    theme?: ThemeType;
    inputClassName?: string;
    selectedTags: SelectedTagsType;
    inputFocus: boolean;
    setInputFocus: any;
    setShowDropdown: any;
}
