import styles from '../styles/DropzoneComponent.module.scss'
import { DragEvent, useContext } from 'react';
import { AllContext } from '../App';
import { COURSES_ACTION, MOVED_COURSES_ACTION, YEARS_ACTION, SETS_ACTION } from './Constants_ACTION';
import { Course2 } from './Types';
import { isDropzoneEmpty, kaplog } from './Utils';
import { ConsolelogToggle } from './ConsoleLogDebugToggles';

// @ts-ignore
const DropzoneComponent = ({ children, id}) => {

    const { state_DataArrays, state_Sets, dispatch_DataArrays, dispatch_Sets } = useContext(AllContext);

    
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {

        (e.currentTarget as HTMLElement).classList.remove(`${styles.hovered}`);


        //  move source actions
        kaplog(ConsolelogToggle.DropzoneComponent_handleDrop,
            `handleDrrop() ran.
            \tsource info:
            state_Sets.inYearsList: ${state_Sets.inYearsList}
            state_Sets.draggedItemIndex: ${state_Sets.draggedItemIndex}`)

        //  move destination actions
        kaplog(ConsolelogToggle.DropzoneComponent_handleDrop,
            `\t\t\tdestination info:
            state_Sets.dropzone: ${state_Sets.dropzone}`)


        const copyCourses_Array: Course2[] = [...state_DataArrays.courses_Array];
        const copyMovedCourses_Array: Course2[] = [...state_DataArrays.movedCourses_Array];

        
        // kaplog(true, 
        //     `isDropzoneEmpty: ${isDropzoneEmpty(state_DataArrays.years_Array, state_Sets.dropzone)}`);


        //  if item is in Courses List
        if (!state_Sets.inYearsList && isDropzoneEmpty(state_DataArrays.years_Array, state_Sets.dropzone)) {
        // if (!state_Sets.inYearsList) {

            //  add dropzoneid
            copyCourses_Array[state_Sets.draggedItemIndex].dropzoneid = state_Sets.dropzone;

            //  add mcindex
            copyCourses_Array[state_Sets.draggedItemIndex].mcindex = copyMovedCourses_Array.length;

            //  add course to moved courses array
            dispatch_DataArrays({ type: MOVED_COURSES_ACTION.ADD, payload: copyCourses_Array[state_Sets.draggedItemIndex] });

            //  add course to years array
            const thePayload = {
                targetDropzonID: state_Sets.dropzone,
                addCourse: state_DataArrays.courses_Array[state_Sets.draggedItemIndex]
            }
            dispatch_DataArrays({ type: YEARS_ACTION.ADD_COURSE, payload: thePayload });

            //  delete course from courses array
            dispatch_DataArrays({ type: COURSES_ACTION.DELETE, payload: state_Sets.draggedItemIndex })


        }


        

        //  if item is in the Moved Courses List
        if (state_Sets.inYearsList && isDropzoneEmpty(state_DataArrays.years_Array, state_Sets.dropzone)) {
        // if (state_Sets.inYearsList ) {

            const oldDropzoneID: string = copyMovedCourses_Array[state_Sets.draggedItemIndex].dropzoneid;

            //  update the dropzoneid
            copyMovedCourses_Array[state_Sets.draggedItemIndex].dropzoneid = state_Sets.dropzone;

            //  copy course to new location
            const thePayload = {
                targetDropzonID: state_Sets.dropzone,
                addCourse: copyMovedCourses_Array[state_Sets.draggedItemIndex]
            }
            dispatch_DataArrays({ type: YEARS_ACTION.ADD_COURSE, payload: thePayload });

            
            //  delete course in old location
            dispatch_DataArrays({ type: YEARS_ACTION.DELETE_COURSE, payload: oldDropzoneID });
        }

        

    }
    
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
                
        dispatch_Sets({ type: SETS_ACTION.DROPZONE, payload: (e.currentTarget as HTMLElement).id });    // id is dropzoneid

        kaplog(ConsolelogToggle.DropzoneComponent_handleDragOver,
            `hovering on dropzone: ${state_Sets.dropzone}\ndII: ${state_Sets.draggedItemIndex}`)
    }
    
    const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        (e.currentTarget as HTMLElement).classList.add(`${styles.hovered}`);    
    }
    
    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        (e.currentTarget as HTMLElement).classList.remove(`${styles.hovered}`);
    }


        
    return (
            <div 
                className={styles.dropzone} 
                id={id}     // dropzoneid
                draggable={false}
                
                onDragEnter={(e) => handleDragEnter(e)}
                onDragOver={(e) => handleDragOver(e)}
                onDragLeave={(e) => handleDragLeave(e)}
                onDrop={(e) => handleDrop(e)}
            >

            {children}      {/* CourseComponent goes here */}
                            
            </div>
    )};

export default DropzoneComponent;