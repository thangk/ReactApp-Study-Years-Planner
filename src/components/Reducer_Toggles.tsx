import { TOGGLES_ACTION } from "./Constants_ACTION";



export const reducer_Toggles = (state: { mountAbout: any; mountAddCourseForm: any; mountHelp: any; printState: any; mountReset: any; itemInYearsList: any }, action: { type: any; payload: any; }) => {

    switch (action.type) {
        case TOGGLES_ACTION.ABOUT:
            return { ...state, mountAbout: !state.mountAbout };

        case TOGGLES_ACTION.ADD_COURSE_FORM:
            return { ...state, mountAddCourseForm: !state.mountAddCourseForm };

        case TOGGLES_ACTION.HELP:
            return { ...state, mountHelp: !state.mountHelp };

        case TOGGLES_ACTION.PRINT_STATE:
            return { ...state, printState: !state.printState };

        case TOGGLES_ACTION.RESET:
            return { ...state, mountReset: !state.mountReset };
            
        case TOGGLES_ACTION.BGBLURBLOCK:
            return { ...state,
                blurblockState: (
                    state.mountAddCourseForm  || 
                    state.mountHelp           || 
                    state.mountAbout          ||
                    state.mountReset
                    ) ? true : false };

        default: return state;
    }
}

