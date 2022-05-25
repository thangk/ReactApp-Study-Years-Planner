// import styles from '../styles/CourseComponent.module.scss'

//  types
import { Course2 } from '../components/Types';
import { getCourseIndexInArray, get_BgColour, get_BorderStyle, kaplog } from './Utils';

import { useContext } from 'react';
import { AllContext } from '../App';
import { COURSES_ACTION, MOVED_COURSES_ACTION, SETS_ACTION, YEARS_ACTION } from './Constants_ACTION';
import { motion } from 'framer-motion';
import { popupAnimation } from './FramerMotionAnimations';
import { ConsolelogToggle } from './ConsoleLogDebugToggles';






// @ts-ignore
const CourseComponent = ({ id, course }) => {

    const { state_DataArrays, dispatch_Sets, dispatch_DataArrays } = useContext(AllContext);


    // @ts-ignore
    const handleRightClick = (e): void => {
        e.preventDefault();

        kaplog(ConsolelogToggle.CourseComponent_handleRightClick,
            `handleRightClick() ran.`)

        const copyCourses_Array: Course2[] = [...state_DataArrays.courses_Array];
        const copyMovedCourses_Array: Course2[] = [...state_DataArrays.movedCourses_Array];

        const courseArray_index: number | null = getCourseIndexInArray(copyCourses_Array, (e.currentTarget as HTMLElement).innerText);

        const movedCourseArray_index: number | null = getCourseIndexInArray(copyMovedCourses_Array, (e.currentTarget as HTMLElement).innerText);

        kaplog(ConsolelogToggle.CourseComponent_handleRightClick,
            `\tcourseArray_index: ${courseArray_index}\t| movedCourseArray_index: ${movedCourseArray_index}`)
        
      

        //  if found in OG array
        if (courseArray_index !== null) {
            dispatch_DataArrays({ type: COURSES_ACTION.DELETE, payload: courseArray_index });

            kaplog(ConsolelogToggle.CourseComponent_handleRightClick,
                `\t(if) coursesArray_index ran. Performed the followings:
                type: COURSES_ACTION.DELETE\tpayload: ${courseArray_index}`)
        }


        //  if found in MOVED array
        if (movedCourseArray_index !== null) {

            //  delete from years array
            dispatch_DataArrays({ type: YEARS_ACTION.DELETE_COURSE, payload: copyMovedCourses_Array[movedCourseArray_index].dropzoneid })

            kaplog(ConsolelogToggle.CourseComponent_handleRightClick,
                `\ttype: YEARS_ACTION.DELETE_COURSE\tpayload: ${copyMovedCourses_Array[movedCourseArray_index].dropzoneid}`)


            //  reset back the dropzoneid and mcindex
            copyMovedCourses_Array[movedCourseArray_index].dropzoneid = '';
            copyMovedCourses_Array[movedCourseArray_index].mcindex = -1;

            //  move to OG array
            dispatch_DataArrays({ type: COURSES_ACTION.ADD, payload: copyMovedCourses_Array[movedCourseArray_index] });

            kaplog(ConsolelogToggle.CourseComponent_handleRightClick,
                `\t(if) movedCoursesArray_index ran. Performed the followings:
                type: COURSES_ACTION.ADD\tpayload: ${copyMovedCourses_Array[movedCourseArray_index]}`)
            

            //  delete from moved array
            dispatch_DataArrays({ type: MOVED_COURSES_ACTION.DELETE, payload: movedCourseArray_index });

            kaplog(ConsolelogToggle.CourseComponent_handleRightClick,
                `\ttype: MOVED_COURSES_ACTION.DELETE\tpayload: ${movedCourseArray_index}`)
            

            
                        
        }
    }

    

    
    const handleDragStart = (e: MouseEvent | TouchEvent | PointerEvent): void => {
        
        kaplog(ConsolelogToggle.CourseComponent_handleDragStart, 
        `handleDragStart() ran.
        \te's innerText: ${(e.currentTarget as HTMLElement).innerText}`)

        const copyCourses_Array: Course2[] = [...state_DataArrays.courses_Array];
        const copyMovedCourses_Array: Course2[] = [...state_DataArrays.movedCourses_Array];

        const courseArray_index: number | null = getCourseIndexInArray(copyCourses_Array, (e.currentTarget as HTMLElement).innerText);

        const movedCourseArray_index: number | null = getCourseIndexInArray(copyMovedCourses_Array, (e.currentTarget as HTMLElement).innerText);

        
        
        

        //  if found in OG array
        if (courseArray_index !== null) {
            dispatch_Sets({ type: SETS_ACTION.IN_YEARS_LIST, payload: false });
            dispatch_Sets({ type: SETS_ACTION.DRAGGED_ITEM_INDEX, payload: courseArray_index });

            // ###########  implement fade out here when terms don't match dragged item
        }


        //  if found in MOVED array
        if (movedCourseArray_index !== null) {
            dispatch_Sets({ type: SETS_ACTION.IN_YEARS_LIST, payload: true });
            dispatch_Sets({ type: SETS_ACTION.DRAGGED_ITEM_INDEX, payload: movedCourseArray_index });

        }
        
    }

    

    
    
        
    
    return (
        
            <motion.div 
                {...popupAnimation}
                key={course.name}
                className='course' 
                id={id}
                draggable='true' 
                style={{border: `${get_BorderStyle(course.name)}`, backgroundColor: `${get_BgColour(course.name)}`}}

                onContextMenu={handleRightClick}
                onDragStart={handleDragStart}
            >

                {/* @ts-ignore */}
                {course.name}
            </motion.div>
           
    )};

export default CourseComponent;
