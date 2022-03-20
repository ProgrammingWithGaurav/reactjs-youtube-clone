import React, {useState} from 'react';
import context from './Context';

const State = (props) => {
    const [input, setInput] = useState('');
    const [query, setQuery] = useState('');
    const [user, setUser] = useState(null);

    return (
        <context.Provider value={{input, setInput, query, setQuery, user, setUser}}>
            {props.children}
        </context.Provider>
    )
}

export default State