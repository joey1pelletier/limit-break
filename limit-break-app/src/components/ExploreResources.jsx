import { useState } from 'react';

export default function ExploreResources() {

    const [buttonText, setButtonText] = useState('EXPLORE RESOURCES');

    const buttonClick = () => {
        setButtonText('Explore Resources Button clicked');
    };

    
    return (
        <>
        <button onClick={buttonClick}>{buttonText}</button>
        </>

    );
}