import React from 'react';
import { useQuery } from 'react-query';
import Person from './Person';

const fetchPeople = async () => {
    const res = await fetch('https://swapi.dev/api/people/');
    return res.json();
}

const People = () => {
    //query variables can be passed to useQuery hook which can then be accepted into our function to fetch the data so
    //pass a var to an endpoint for example
    const { data, status} = useQuery('planets', fetchPeople);
    console.log(data);

    return (
        <div>
            <h2>People</h2>

            {/* <p>{status}</p> */}

            { status === 'loading' && (
                <div>Loading fetching data</div>
            )}

                {status === 'error' && (
                    <div>Error fetching data</div>
                )}
            {status === 'success' && (
                <div>
                    { data.results.map(person => <Person key={person.name} {...person}/>)}
                </div>
            )}

        </div>
    )
}

export default People;