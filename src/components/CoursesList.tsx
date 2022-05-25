import { useContext } from 'react';
import styles from '../styles/CoursesList.module.scss'
import { Course2 } from './Types';
import CourseComponent from './CourseComponent'
import { AllContext } from '../App';
import { AnimatePresence, motion } from 'framer-motion';
import { popupAnimation } from './FramerMotionAnimations';


const CoursesList = () => {
        
    const { state_DataArrays } = useContext(AllContext);

    return (
        <>
            <AnimatePresence>
            <motion.div className={styles.dashboard} key={styles.dashboard} {...popupAnimation}>
                    <div>
                        <h2 className={styles['courses-list-status']}>
                            {(state_DataArrays.courses_Array.length === 0 ) ? 'Add courses to start . . .' : `My Courses (${state_DataArrays.courses_Array.length})` }
                        </h2>

                        {/* <button 
                            className="exitDelete invisible" 
                            // onClick={() => toggleDeleteMode('end')}
                        >Exit Delete Mode</button> */}

                    </div>


                    <div className={styles['courses-list']}>

                            {state_DataArrays.courses_Array.map((course: Course2, courses_Array_id: number) => {
                                return (
                                    // @ts-ignore
                                    <CourseComponent 
                                        key={course.name} 
                                        id={courses_Array_id}
                                        course={course}
                                    >
                                        
                                    </CourseComponent>
                                )
                            })}
                        

                    </div>
            </motion.div>
            </AnimatePresence>
        </>
    )};

export default CoursesList;