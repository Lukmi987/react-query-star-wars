import React from 'react';

const Person = ( {...person} ) => {
    console.log('my person', person);
    return(
    <div className="card">
        <h3>{person.name}</h3>
        <p>Birth year {person.birth_year}</p>
    </div>
    );
}

export default Person;