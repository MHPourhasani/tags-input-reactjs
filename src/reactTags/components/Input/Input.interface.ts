import { ThemeType } from '../../interfaces/general';

export interface InputProps {
    label?: string;
    placeholder?: string;
    value?: string;
    changeHandler?: (e: any) => void;
    keyDown?: (e: any) => void;
    theme?: ThemeType;
    inputClassName?: string;
    selectedTags: { id: string; tag: string }[];
    inputFocus: boolean;
    setInputFocus: any;
    setShowDropdown: any;
}
