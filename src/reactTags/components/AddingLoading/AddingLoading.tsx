import React from 'react';
import { AddingLoadingProps } from './AddingLoading.interface';

const AddingLoading = ({ theme, loadingText }: AddingLoadingProps) => {
    return (
        <div className="flex items-center gap-2 w-36">
            <span
                className={`w-6 h-6 animate-spin border-2 border-dashed rounded-full mr-5 ${
                    theme === 'dark' ? 'border-zSecondary-400' : 'border-zGray-700'
                }`}
            />

            <span className="text-xs">{loadingText}</span>
        </div>
    );
};

export default AddingLoading;
