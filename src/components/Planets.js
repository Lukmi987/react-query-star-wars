import React, {useState} from 'react';
import Planet from './Planet'
import { usePaginatedQuery, useQuery } from 'react-query';


//first arg has to be key which is in query key arr[0] in useQuery, then we accept any
const fetchPlanets = async (page = 0) => {
    console.log(page);

    const res = await fetch(`https://swapi.dev/api/planets?page=${page}`);
    return res.json();
}

const Planets = () => {
    const [page, setPage] = useState(0)
    const {data, status, isPreviousData} = useQuery(['planets', page ], () => fetchPlanets(page), { keepPreviousData: true});
   //  const { resolvedData, latestData,status } = usePaginatedQuery(['planets',page], fetchPlanets);


    return (
        <div>
            <h2>Planets</h2>
            { status === 'loading' && (
                <div>Loading fetching data</div>
            )}

                {status === 'error' && (
                    <div>Error fetching data</div>
                )}
            {status === 'success' && (
                <>
                    <span>Current Page: {page + 1}</span>
                    <button
                           onClick={() => setPage(old => Math.max(old - 1,0))}
                           disabled={page === 0}
                    >Previous page</button>

                    <button
                         onClick={() => {
                             if(!isPreviousData && data.hasMore) {
                                 setPage(old => old + 1);
                             }
                         }}
                          disabled={isPreviousData || !data.hasMore}
                    >Next Page</button>

                <div>
                    { data.results.map(planet => <Planet key={planet.name} planet={planet}/>)}
                </div>
                </>
            )}

        </div>
    )
}

export default Planets;