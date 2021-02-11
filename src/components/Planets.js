import React from 'react';
import Planet from './Planet'
import { useQuery } from 'react-query';

const fetchPlanets = async () => {
    const res = await fetch('https://swapi.dev/api/planets/');
    return res.json();
}

const Planets = () => {
    const { data, status} = useQuery('planets', fetchPlanets,{
        staleTime: 2000, // for how long will be the data fresh before next refetch when we switch window for example
        cacheTime: 10,
        onSuccess: () => console.log('no problem'),
    });
    console.log(data);

    return (
        <div>
            <h2>Planets</h2>

            {/* <p>{status}</p> */}

            { status === 'loading' && (
                <div>Loading fetching data</div>
            )}


                {status === 'error' && (
                    <div>Error fetching data</div>
                )}
            {status === 'success' && (
                <div>
                    { data.results.map(planet => <Planet key={planet.name} planet={planet}/>)}
                </div>
            )}

        </div>
    )
}

export default Planets;