import { useState } from 'react';

export default function ConquerFear() {

    const [buttonText, setButtonText] = useState('CONQUER YOUR FEARS');

    const buttonClick = () => {
        setButtonText('Conquer Fear Button clicked');
    };

    
    return (
        <>
        <button onClick={buttonClick}>{buttonText}</button>
        </>

    );
}