import { Year, Term, Course2 } from "./Types";
import { BsFillTrashFill, BsFillCaretUpSquareFill, BsFillCaretDownSquareFill } from 'react-icons/bs'
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";

import DropzoneComponent from "./DropzoneComponent";
import styles from "../styles/YearsList.module.scss"


import { useContext, useEffect } from 'react'
import { AllContext } from "../App";
import CourseComponent from "./CourseComponent";
import { COURSES_ACTION, MOVED_COURSES_ACTION, YEARS_ACTION } from "./Constants_ACTION";
import { isYearAlreadyExist } from "./Utils";
import { AnimatePresence, motion } from "framer-motion";
import { popupAnimation, yearChangeAnimation } from "./FramerMotionAnimations";



const YearsList = () => {

    const { state_DataArrays, state_Toggles, dispatch_DataArrays } = useContext(AllContext);

    
    const handleDeleteYear = (targetYearIndex: number): void => {
    

        
        for (let i = 0; i < state_DataArrays.years_Array[targetYearIndex].terms.length; i++) {

            

            for (let j = 0; j < state_DataArrays.years_Array[targetYearIndex].terms[i].courses.length; j++) {

                
                if (state_DataArrays.years_Array[targetYearIndex].terms[i].courses[j] != null) {

                    // console.log(state_DataArrays.years_Array[targetYearIndex].terms[i].courses[j].mcindex);

                    const targetMcindex: number = state_DataArrays.years_Array[targetYearIndex].terms[i].courses[j].mcindex;

                    //  add course to og array
                    dispatch_DataArrays({ type: COURSES_ACTION.ADD, payload: state_DataArrays.years_Array[targetYearIndex].terms[i].courses[j] })
    
                    //  delete course from mc array
                    dispatch_DataArrays({ type: MOVED_COURSES_ACTION.DELETE, payload: targetMcindex })
                }
            }

            

        }


        // for (let i = 0; i < state_DataArrays.movedCourses_Array.length; i++) {
        //     const [year, term, index] = state_DataArrays.movedCourses_Array[i].dropzoneid.split('-');

        //     if (state_DataArrays.years_Array[targetIndex].year === Number(year)) {

        //         state_DataArrays.movedCourses_Array[i].ismoved = false;

        //         dispatch_DataArrays({ type: COURSES_ACTION.ADD, payload: state_DataArrays.movedCourses_Array[i] });

        //         const newMovedArray = [...state_DataArrays.movedCourses_Array].splice(i, 1);

        //         dispatch_DataArrays({ type: MOVED_COURSES_ACTION.SET, payload: newMovedArray });
        //     }
        // }

        dispatch_DataArrays({ type: YEARS_ACTION.DELETE, payload: targetYearIndex });
        
    }

    const handlePlusMinusYear = (targetIndex: number, action: string): void => {

        const tempArray: Year[] = state_DataArrays.years_Array.slice();

        let targetYear = tempArray[targetIndex].year;

        while (action === 'plus' && isYearAlreadyExist(targetYear, tempArray)) targetYear++;
        while (action === 'minus' && isYearAlreadyExist(targetYear, tempArray)) targetYear--;

        tempArray[targetIndex].year = targetYear;

        dispatch_DataArrays({ type: YEARS_ACTION.SET, payload: tempArray });
    }

    const handleUpDownYear = (targetIndex: number, action: string): void => {

        const tempArray: Year[] = state_DataArrays.years_Array.slice();

        if (action === 'up' && targetIndex > 0) {

            const tempItem: Year = tempArray[targetIndex];

            tempArray[targetIndex] = tempArray[targetIndex-1];

            tempArray[targetIndex-1] = tempItem;
        }

        if (action === 'down' && targetIndex < state_DataArrays.years_Array.length-1) {

            const tempItem: Year = tempArray[targetIndex];

            tempArray[targetIndex] = tempArray[targetIndex+1];

            tempArray[targetIndex+1] = tempItem;
        }

        dispatch_DataArrays({ type: YEARS_ACTION.SET, payload: tempArray });
    }

    useEffect(() => {

    }, [state_DataArrays.courses_Array]);
    

  return (
   

        <div className={styles['years-wrapper']}>

        <AnimatePresence>
        {state_DataArrays.years_Array.map((aYear: Year, year_index: number) => (


            <motion.div className={styles.ayear} key={`${aYear.year}`} {...popupAnimation}>

                {/* YEAR + INCREMENT + DECREMENT BOX - START */}
                <div>
                    <div className={styles['ayear-title-box']}>
                            <h3 className={styles['ayear-title']} key={`${aYear.year}-title`} {...yearChangeAnimation}>{aYear.year}</h3>
                        
                        <div className={`${styles['ayear-title-upsdowns']} ${state_Toggles.printState ? 'invisible' : null}`}>
                            <FaMinusSquare 
                                className={styles['plusminusButtons']}
                                onClick={() => handlePlusMinusYear(year_index, 'minus')} />
                            <FaPlusSquare 
                                className={styles['plusminusButtons']}
                                onClick={() => handlePlusMinusYear(year_index, 'plus')} />
                        </div>


                    </div>
                </div>
                {/* YEAR + INCREMENT + DECREMENT BOX - END */}
                


                {/* TERMS - START */}
                {aYear.terms.map((term: Term) => (


                    <div className={styles.term} key={term.termname}>

                        <div className={styles['term-name']}>{term.termname}</div>


                        {term.courses.map((course: Course2, empty_index: number) => (

                                <DropzoneComponent 
                                    key={empty_index}
                                    id={`${aYear.year}-${term.termname}-${empty_index}`}
                                    >
                                    
                                    {course ? 
                                        <CourseComponent 
                                        // key={course.name}
                                        id={empty_index}
                                        course={course} />

                                    : ''}
                                    
                                </DropzoneComponent>))
                        }
                        
                        
 
                    </div>))
                }
                {/* TERMS - END */}


                {/* YEARS EDIT BUTTONS - START */}
                <div className={`${styles['ayear-edit-buttons']}`}>
                    
                    <BsFillTrashFill 
                        className={`${styles['edit-buttons']} ${state_Toggles.printState ? 'invisible' : null}`} 
                        onClick={() => handleDeleteYear(year_index)}
                        />
                    <BsFillCaretUpSquareFill
                        className={`${styles['edit-buttons']} ${state_Toggles.printState ? 'invisible' : null}`} 
                        onClick={() => handleUpDownYear(year_index, 'up')} />
                    <BsFillCaretDownSquareFill 
                        className={`${styles['edit-buttons']} ${state_Toggles.printState ? 'invisible' : null}`} 
                        onClick={() => handleUpDownYear(year_index, 'down')} />
                </div>
                {/* YEARS EDIT BUTTONS - END */}


            </motion.div>


        ))}
        </AnimatePresence>
        </div>










  )
}

export default YearsList;
