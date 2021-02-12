import React, {useState} from 'react';
import Planet from './Planet'
import { useQuery } from 'react-query';


//first arg has to be key which is in query key arr[0] in useQuery, then we accept any
const fetchPlanets = async (key) => {
    console.log(key.queryKey[2]);
    const page = key.queryKey[2]
    const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
    return res.json();
}

const Planets = () => {
    const [page, setPage] = useState(1)
    const {data, status} = useQuery(['planets','hello humans',page ], fetchPlanets);


    return (
        <div>
            <h2>Planets</h2>
            <button onClick={() => setPage(1)}>page 1</button>
            <button onClick={() => setPage(2)}>page 2</button>
            <button onClick={() => setPage(3)}>page 3</button>
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