## Tags Input

Simple react tags input with React, TypeScript and Tailwindcss.

## Installation

```
npm install --save tags-input-reactjs

yarn add tags-input-reactjs
```

## Features

## Available props

|     | Props                      | Types                                                         | Default                               |           |
| :-: | :------------------------- | :------------------------------------------------------------ | :------------------------------------ | :-------: |
|  1  | mode                       | 'array-of-string' or 'multi-select' or'advanced-multi-select' | --------                              | Mandatory |
|  2  | theme                      | 'light' or 'dark'                                             | light                                 | optional  |
|  3  | maxTags                    | number                                                        | --------                              | optional  |
|  4  | defaultSelectedTags        | string[]                                                      | --------                              | optional  |
|  5  | categoriesTags             | string[]                                                      |                                       | optional  |
|  6  | onChange                   | (tags: string[]) => void                                      |                                       | optional  |
|  7  | title                      | string                                                        |                                       | optional  |
|  8  | inputPlaceholder           | string                                                        | 'آیتم‌ها را با Enter از هم جدا کنید.' | optional  |
|  9  | inputClassName             | string                                                        |                                       | optional  |
| 10  | addToCategoryOnClick       | (value: string) => boolean                                    |                                       | optional  |
| 11  | dropDownContainerClassName | string                                                        |                                       | optional  |
| 12  | tagsContainerClassName     | string                                                        |                                       | optional  |
| 13  | tagsClassName              | string                                                        |                                       | optional  |
| 14  | selectedTagClassName       | string                                                        |                                       | optional  |
| 15  | selectedTagCloseIconClass  | string                                                        |                                       | optional  |

## Simple Usage

```jsx
// In layout.tsx file in Nextjs 13.4 project added this
import 'tags-input-reactjs/styles.css';

// In _app.tsx file in Nextjs < 13.4 project added this
import 'tags-input-reactjs/styles.css';

// Add this in the component you want to use in Nextjs
import ReactTags from 'tags-input-reactjs';

// In App.jsx or App.tsx file in Vite React or create-react-app projects added this
import ReactTags from 'tags-input-reactjs';
import 'tags-input-reactjs/styles.css';
```

```jsx
import { useState } from 'react';
import ReactTags from 'tags-input-reactjs';

const App = () => {
    const [tags, setTags] = useState(['apple', 'orange', 'banana']);

    return (
        <div>
            <ReactTags mode="array-of-string" />
        </div>
    );
};
```

## Advanced Examples

```jsx
// in layout.tsx file in nextjs project added this
import 'tags-input-reactjs/styles.css';

// in App.jsx or App.tsx file in React project added this
import ReactTags from 'tags-input-reactjs';
import 'tags-input-reactjs/styles.css';

// in App.jsx or App.tsx file in Vite React project added this
import ReactTags from 'tags-input-reactjs';
import 'tags-input-reactjs/styles.css';
```

```jsx
import { useState } from 'react';
import ReactTags from 'tags-input-reactjs';

const App = () => {
    const [tags, setTags] = useState(['apple', 'orange', 'banana']);
    const [categoriesTags, setCategoriesTags] = useState(['apple', 'orange', 'banana', 'kiwi', 'grape']);

    return (
        <div>
            <ReactTags
                mode="advanced-multi-select"
                maxTags={5}
                defaultSelectedTags={tags}
                onChange={(tags) => setTags(tags)}
                categoriesTags={categoriesTags}
                title="تگ"
                addToCategoryOnClick={(value) => setCategoriesTags([...abc, value])}
            />
        </div>
    );
};
```

## License

Licensed under MIT
