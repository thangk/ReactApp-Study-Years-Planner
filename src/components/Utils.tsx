//  types
import { Year, Term, Course2 } from './Types';
//  constants
import * as Constants from './Constants'





//  single line functions

//  delete an element from array based on input index
export const deleteItemAt = (source: any, targetIndex: number):any => [...source].filter((item, index) => index !== targetIndex);

//  delete a course from a years array based on the dropzoneid
export const addCourseAt = (source: Year[], payload: any): Year[] => {

    const copySource: Year[] = [...source];

    const { targetDropzonID, addCourse } = payload;

    const [targetYear, targetTerm, targetIndex] = targetDropzonID.split('-');

    for (let i = 0; i < copySource.length; i++) {
        if (copySource[i].year === Number(targetYear))
            for (let j = 0; j < copySource[i].terms.length; j++)
                if (copySource[i].terms[j].termname === targetTerm) {
                    //@ts-ignore
                    copySource[i].terms[j].courses[targetIndex] = addCourse;
                }
    }

    return copySource;
}

//  delete a course from a years array based on the dropzoneid
export const deleteCourseAt = (source: Year[], targetDropzonID: string): Year[] => {

    const copySource: Year[] = [...source];

    const [targetYear, targetTerm, targetIndex] = targetDropzonID.split('-');

    for (let i = 0; i < copySource.length; i++) {
        if (copySource[i].year === Number(targetYear))
        
            for (let j = 0; j < copySource[i].terms.length; j++)
                if (copySource[i].terms[j].termname === targetTerm) {

                    //@ts-ignore
                    copySource[i].terms[j].courses.fill(null, targetIndex, targetIndex+1);
                }
    }

    return copySource;
}

//  make sure the course code is a valid code
export const getValidCodes = (courseCodes: string[]): string[] => courseCodes.filter((code) => code.length === 4);


export const getCourseIndexInArray = (courseArray: Course2[], courseName: string): number | null => {

    for (let i = 0; i < courseArray.length; i++ ) {
        if (courseArray[i].name === courseName) {
            return i;
        }
    }
    return null;
}


export const kaplog = (logIdentifier: boolean, logMessage: string) => (logIdentifier) ? console.log(logMessage) : null;


//  returns a string from Constants.courseColours array in Constants module
// export const get_CourseColour = (courseName: string): string => Constants.courseColours[courseName] ? Constants.courseColours[courseName] : Constants.courseColours['default'];






//  multi-line functions

// check if the newly generated year already exist in the array
export const isYearAlreadyExist = (testYear: number, years_Array: Year[]): boolean =>  {

    for (const aYear of years_Array) {
        if (aYear.year === testYear) {
            return true;
        }
    }
    return false;
}

//  generate a CSS style string
export const get_BorderStyle = (courseName: string): string => {

    const courseCategory: string = courseName.substring(0, 4);
    
    // @ts-ignore
    const courseBackgroundColour: string = Constants.courseColours[courseCategory] ? Constants.courseColours[courseCategory] : Constants.courseColours['default'];
    const courseBorderWidth: string = Constants.COURSE_BORDER_WIDTH;
    const courseBorderType: string = Constants.COURSE_BORDER_TYPE;
    const courseBorderColour: string = courseBackgroundColour;

    const courseBorder: string = `${courseBorderWidth} ${courseBorderType} ${courseBorderColour}`;

    return courseBorder;
}

//  generate a CSS style string (HEX code)
export const get_BgColour = (courseName: string): string => {

    const courseCategory: string = courseName.substring(0, 4);

    // @ts-ignore
    const courseBackgroundColour: string = Constants.courseColours[courseCategory] ? Constants.courseColours[courseCategory] : Constants.courseColours['default'];

    return courseBackgroundColour;
}

//  generate a new year
export const generateYear = (years_Array: Year[]): Year => {

    // generate a new year to add to the years array
    let currentYear: number = new Date().getFullYear();

    while (isYearAlreadyExist(currentYear, years_Array)) currentYear++;

    // create a new Year object
    const aNewYear: Year = {
        year: currentYear,
        terms: []
    }


    // eslint-disable-next-line array-callback-return
    Constants.termNames.map((term) => {

        //  create empty courses
        const newCourses_Array: Course2[] = [];

        newCourses_Array.length = Constants.MAX_COURSES_PER_TERM;

        // @ts-ignore
        newCourses_Array.fill(null, 0, Constants.MAX_COURSES_PER_TERM);

        //  create a new Term object
        const aNewTerm: Term = {
            termname: term,
            courses: newCourses_Array
        }
        aNewYear.terms.push(aNewTerm);
    })

    return aNewYear;
}