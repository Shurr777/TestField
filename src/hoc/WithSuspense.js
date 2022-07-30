import React from 'react';

export const WithSuspense = (Component) => {
    return (props) => {
       return <React.Suspense fallback = {<>Loading...</>}>
           <Component {...props}/>
       </React.Suspense>
    }
};

