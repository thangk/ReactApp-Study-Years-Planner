export type Year = {
    year: number,           // ie. 2022
    terms: Term[]
}

export type Term = {
    termname: string,     // ie. winter
    courses: Course2[]
}

export type Course = {
    coursecode: string,      // ie. COMP-2140
    courseterms: string[]
}

export type MovedCourse = {
    coursecode: string,      // ie. COMP-2140
    courseterms: string[],
    spotid: string          //  ie. 2022-Fall-0     first box in year 2022 Fall term
}


export type Course2 = {
    name: string,           //  COMP-2310
    dropzoneid: string,     //  2022-Fall-0
    // borderstyle: string,    //  border: 2px solid orange;
    // bgcolour: string,       //  background-color: orange;
    mcindex: number,        //  true if it's a "moved" course
    terms: string[],        //  Winter
}