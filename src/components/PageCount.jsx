import React, { useEffect, useState } from "react";

export default function PageCount({pages}) {

    return (
        <div className='ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium'><p>{pages}</p></div>
    );
}
