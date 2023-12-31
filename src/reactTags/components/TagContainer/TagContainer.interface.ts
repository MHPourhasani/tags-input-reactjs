import { ModeType, ThemeType } from '../../types/general';

export interface TagContainerProps {
    mode: ModeType;
    theme?: ThemeType;
    title?: string;
    maxTags?: number;
    defaultSelectedTags?: string[];
    onChange?: (tags: string[]) => void;
    categoriesTags?: string[];
    inputPlaceholder?: string;
    inputClassName?: string;
    dropDownContainerClassName?: string;
    tagsContainerClassName?: string;
    tagsClassName?: string;
    selectedTagClassName?: string;
    selectedTagCloseIconClass?: string;
    addToCategoryOnClick?: (a?: any) => any;
    closeIcon?: any;
}
