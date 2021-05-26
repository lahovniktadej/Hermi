import React from 'react';

import Delavci from "views/Delavci";
import Skrbniki from "views/Skrbniki";
import Vozila from "views/Vozila";

function Upravljanje() {
    return (
        <> 
            <Delavci />
            <Vozila />
            <Skrbniki />
        </>
    );
};

export default Upravljanje;