//  styles
import styles from '../styles/Main.module.scss';
//  utils
import { isYearAlreadyExist, generateYear } from '../components/Utils';
//  types
import { Year } from '../components/Types';
//  constants
import * as Constant from '../components/Constants';

// 3rd party libraries
import { useEffect, useContext, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
//  components
import BackgroundBlock from '../components/BackgroundBlock';
import YearsList from '../components/YearsList';
import Help from '../components/Help';
import AddCourseForm from '../components/AddCourseForm';
import About from '../components/About';
import Reset from '../components/Reset';
import CoursesList from '../components/CoursesList';

//  contexts
import { AllContext } from '../App';

import { TOGGLES_ACTION, COURSES_ACTION, MOVED_COURSES_ACTION, YEARS_ACTION } from '../components/Constants_ACTION';






const Main = () => {

    const { state_DataArrays, state_Toggles, state_Sets, dispatch_DataArrays, dispatch_Toggles } = useContext(AllContext);
    
    const performReset = (): void => {
        dispatch_DataArrays({ type: COURSES_ACTION.RESET });
        dispatch_DataArrays({ type: MOVED_COURSES_ACTION.RESET });
        dispatch_DataArrays({ type: YEARS_ACTION.RESET });
        dispatch_Toggles({ type: TOGGLES_ACTION.RESET });
        // localStorage.setItem('resetPerformed', 'true');
    }

    
    const togglePrint = () => {

        dispatch_Toggles({ type: TOGGLES_ACTION.PRINT_STATE });
        
        setTimeout(() => {
            window.print();

            dispatch_Toggles({ type: TOGGLES_ACTION.PRINT_STATE });
        }, 0);

    }


    //  Year related actions
    const handleAddYear = (): void => {
        const aNewYear: Year = generateYear(state_DataArrays.years_Array);
        
        dispatch_DataArrays({ type: YEARS_ACTION.ADD , payload: aNewYear });
    }



    

    


    useEffect(() => {

        dispatch_Toggles({ type: TOGGLES_ACTION.BGBLURBLOCK });

        // save all data to localStorage
        localStorage.setItem('courses_Array', JSON.stringify(state_DataArrays.courses_Array));
        localStorage.setItem('movedCourses_Array', JSON.stringify(state_DataArrays.movedCourses_Array));
        localStorage.setItem('years_Array', JSON.stringify(state_DataArrays.years_Array));
        
    }, [
        state_Toggles.mountAddCourseForm, 
        state_Toggles.mountHelp, 
        state_Toggles.mountAbout, 
        state_Toggles.mountReset, 
        state_Toggles.printState,

        state_DataArrays.courses_Array, 
        state_DataArrays.movedCourses_Array, 
        state_DataArrays.years_Array,

        state_Sets.draggedItemIndex
    ]);

    
    

    return (
        <>

        <AnimatePresence>
            {state_Toggles.mountAddCourseForm && <AddCourseForm />}
            {state_Toggles.mountHelp && <Help />}
            {state_Toggles.mountAbout && <About />}
            {state_Toggles.mountReset && <Reset onConfirm={() => performReset()} />}
        </AnimatePresence>
        

        
        {/* blur the content wrapper area */}
        <div className={`${styles.top} ${state_Toggles.blurblockState ? 'blurbg' : null}`}>

        {/* block the background to prevent clicking on background items */}
        {state_Toggles.blurblockState && <BackgroundBlock />}

        {/* blur the logo area */}
            <div className={`${styles['logo']} ${state_Toggles.blurblockState ? 'blurbg' : null}`} >
                <h1>{Constant.AppName}</h1>
            </div>

            <div className={styles.version}>
                <h6>{Constant.AppVersion}</h6>
            </div>

            

            <div className={styles['content-wrapper']}>

                <div className={`${styles.sticky} ${state_Toggles.printState ? 'moveMarginUp' : null}`}>

                    <div className={styles['buttons-menu']} >
                        <button
                            onClick={() => handleAddYear()}>Add Year</button>
                        <button 
                            onClick={() => dispatch_Toggles({ type: TOGGLES_ACTION.ADD_COURSE_FORM })}>Add Course</button>
                        <button 
                            onClick={() => togglePrint()}>Print</button>
                        <button 
                            onClick={() => dispatch_Toggles({ type: TOGGLES_ACTION.HELP })}>Help</button>
                        <button 
                            onClick={() => dispatch_Toggles({ type: TOGGLES_ACTION.ABOUT })} 
                            className={styles.rightButton}>About</button>
                        <button 
                            // onClick={() => toggleSettings()} 
                            className={`${styles.rightButton} invisible`}>Settings</button>
                        <button 
                            onClick={() => dispatch_Toggles({ type: TOGGLES_ACTION.RESET })} 
                            className={styles.rightButton}>Reset All</button>
                    </div>

                    <CoursesList />
                </div>



                <div className={styles['years-wrapper']} id={`print-area`}>
                    <YearsList />
                </div>

            </div>

        </div>
        
        
        
        
        
        
        
        
        
        
        
        </>
    )
}

export default Main;