import '../App.css'

function StepInfo({id, name, q1, q2, q3, rating, isComplete}) {
    return (
        <>
        <p className="direction-text">{name}</p>
        <ul>
            <li>{q1}</li>
            <li>{q2}</li>
            <li>{q3}</li>
            <li>{rating}</li>
        </ul>
        </>
    )
}

export default StepInfo