
import { addCourseAt, deleteCourseAt, deleteItemAt } from './Utils'
import samplelist from '../data/samplelist.json'
import { COURSES_ACTION, MOVED_COURSES_ACTION, YEARS_ACTION } from './Constants_ACTION';



export const reducer_DataArrays = (state: { courses_Array: any; movedCourses_Array: any; years_Array: any; }, action: { type: any; payload: any; }) => {

    switch (action.type) {
        case COURSES_ACTION.ADD:
            return { ...state, courses_Array: [...state.courses_Array, action.payload]};

        //  get index value for the delete item
        case COURSES_ACTION.DELETE:
            return { ...state, courses_Array: deleteItemAt(state.courses_Array, action.payload) };
            
        case COURSES_ACTION.RESET:
            return { ...state, courses_Array: [] };

        case COURSES_ACTION.SET:
            return { ...state, courses_Array: action.payload };

        case COURSES_ACTION.LOAD_SAMPLE:            
            return { ...state, courses_Array: samplelist};



        case MOVED_COURSES_ACTION.ADD:
            return { ...state, movedCourses_Array: [...state.movedCourses_Array, action.payload]};

        case MOVED_COURSES_ACTION.DELETE:
            return { ...state, movedCourses_Array: deleteItemAt(state.movedCourses_Array, action.payload) };
            
        case MOVED_COURSES_ACTION.RESET:
            return { ...state, movedCourses_Array: [] };
        
        case MOVED_COURSES_ACTION.SET:
            return { ...state, movedCourses_Array: action.payload };

            
                
        case YEARS_ACTION.ADD:
            return { ...state, years_Array: [action.payload, ...state.years_Array]};

        case YEARS_ACTION.ADD_COURSE:
            return { ...state, years_Array: addCourseAt(state.years_Array, action.payload) };      //   payload is newCourse Course2 type

        case YEARS_ACTION.DELETE:
            return { ...state, years_Array: deleteItemAt(state.years_Array, action.payload) };      //  payload is years_Array index

        case YEARS_ACTION.DELETE_COURSE:
            return { ...state, years_Array: deleteCourseAt(state.years_Array, action.payload) };    // payload is dropzoneid

        case YEARS_ACTION.RESET:
            return { ...state, years_Array: [] };

        case YEARS_ACTION.SET:
            return { ...state, years_Array: action.payload };
  

        default: return state;
    }
}