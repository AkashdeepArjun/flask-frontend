import React from 'react';

export default function Searchbar({search_query,setQuery,suggestions}) {

    return (

            <div   className="relative w-full max-w-md">
            
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">


                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>                         

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>


                </div>

                <input type="text" id="search" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." value={search_query} onChange={(e) => setQuery(e.target.value)} />

                {search_query && (<button onClick={() => setQuery('')}>Clear</button>)}

                {suggestions && suggestions.length > 0 &&  search_query && (
                    <div className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg flex flex-col">
                        {suggestions.map((suggestion) => (
                            <a key={suggestion.id} href={`/products/${suggestion.id}`} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer" onClick={() => setQuery(suggestion.name)}>
                                {suggestion.name}
                            </a>
                        ))}
                    </div>
                )}

            </div>


    )





}