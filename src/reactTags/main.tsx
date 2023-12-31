import React from 'react';
import '../index.css';
import { TagContainerProps } from './components/TagContainer/TagContainer.interface';
import TagContainer from './components/TagContainer/TagContainer';

const ReactTags = (props: TagContainerProps) => {
    return (
        <TagContainer
            mode={props.mode}
            theme={props.theme}
            title={props.title}
            defaultSelectedTags={props.defaultSelectedTags}
            maxTags={props.maxTags}
            onChange={props.onChange}
            categoriesTags={props.categoriesTags}
            tagsContainerClassName={props.tagsContainerClassName}
            tagsClassName={props.tagsClassName}
            inputPlaceholder={props.inputPlaceholder}
            inputClassName={props.inputClassName}
            dropDownContainerClassName={props.dropDownContainerClassName}
            selectedTagClassName={props.selectedTagClassName}
            selectedTagCloseIconClass={props.selectedTagCloseIconClass}
            addToCategoryOnClick={props.addToCategoryOnClick}
        />
    );
};

export default ReactTags;
