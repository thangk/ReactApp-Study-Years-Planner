import { Course2, Year } from './Types'

// @ts-ignore
const initialize_Courses_Array = (): Course2[] => JSON.parse(localStorage.getItem('courses_Array')) || [];
// @ts-ignore
const initialize_MovedCourses_Array = (): Course2[] => JSON.parse(localStorage.getItem('movedCourses_Array')) || [];
// @ts-ignore
const initialize_Years_Array = (): Year[] => JSON.parse(localStorage.getItem('years_Array')) || [];

export const iniStates_DataArrays = {
    courses_Array: initialize_Courses_Array(),
    movedCourses_Array: initialize_MovedCourses_Array(),
    years_Array: initialize_Years_Array()
}

export const iniStates_Toggles = {
    mountHelp : false,
    mountAddCourseForm: false,
    mountAbout: false,
    mountReset: false,
    printState: false,
    blurblockState: false,
    itemInYearsList: false
}

export const iniStates_Sets = {
    dropzone: '',
    draggedItemIndex: null,
    inYearsList: false
}