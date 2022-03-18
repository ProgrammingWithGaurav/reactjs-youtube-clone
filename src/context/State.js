import React, {useState} from 'react';
import context from './Context';

const State = (props) => {
    const [input, setInput] = useState('');
    const [query, setQuery] = useState('');
    
    return (
        <context.Provider value={{input, setInput, query, setQuery}}>
            {props.children}
        </context.Provider>
    )
}

export default State