import { useState } from 'react';

export default function FearsConquered() {

    const [buttonText, setButtonText] = useState('FEARS CONQUERED');

    const buttonClick = () => {
        setButtonText('Fears Conquered Button clicked');
    };

    
    return (
        <>
        <button onClick={buttonClick}>{buttonText}</button>
        </>

    );
}