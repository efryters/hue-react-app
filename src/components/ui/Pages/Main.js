import React from 'react';


function Main() {

    return(
        <div>Home
            {Array(200).fill("This is some text").map(el => {
                return (
                    <p>{el}</p>
                );
            })}
        </div>
    );
};

export default Main;