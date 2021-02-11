import React, {useState} from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Navbar from "./components/Navbar";
import Planets from "./components/Planets";
import People from "./components/People";

function App() {
    const queryClient = new QueryClient();
    const [page, setPage] = useState('planets');
  return (
      <QueryClientProvider client={queryClient}>
          <>
              <ReactQueryDevtools initialIsOpen />
    <div className="App">
        <h1>Star Wars Info</h1>
      <Navbar setPage={setPage} />
      <div className="content">
          { page === 'planets' ? <Planets /> : <People /> }
      </div>

    </div>
          </>
      </QueryClientProvider>
  );
}

export default App;
