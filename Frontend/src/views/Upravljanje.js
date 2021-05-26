import React from 'react';

import Delavci from "views/Delavci";
import Skrbniki from "views/Skrbniki";
import Vozila from "views/Vozila";

function Upravljanje() {
    return (
        <> 
            <Delavci />
            <hr className="my-3" />

            <Vozila />
            <hr className="my-3"  />

            <Skrbniki />
        </>
    );
};

export default Upravljanje;