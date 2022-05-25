//  3rd parties
import { motion, AnimatePresence } from 'framer-motion';
import { useContext, useState } from 'react';

//  styles
import styles from '../styles/AddCourseForm.module.scss';

//  animations
import { popupAnimation } from './FramerMotionAnimations';

//  types
import { Course2 } from './Types';

//  constants
import * as Constants from '../components/Constants';

//  components
import BackgroundBlock from '../components/BackgroundBlock';
import ErrorPopup from './ErrorPopup';
import Confirm from '../components/Confirm';

//  utils
import { getValidCodes } from './Utils';

//  contexts
import { AllContext } from '../App';

//  reducers
import { COURSES_ACTION, MOVED_COURSES_ACTION, TOGGLES_ACTION } from './Constants_ACTION';




const AddCourseForm = () => {
        
    const { dispatch_DataArrays, dispatch_Toggles } = useContext(AllContext);

    const [courseCat, setCourseCat] = useState('');
    const [courseCodesInputString, setCourseCodesInputString] = useState('');
    
    const [fall, setFall] = useState(false);
    const [winter, setWinter] = useState(false);
    const [summer, setSummer] = useState(false);

    const [mountError, setMountError] = useState(false);
    const [mountConfirm, setMountConfirm] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    let errorStatus: boolean = false;

    

    const toggleErrorMessage = () => {
        setMountError((prevState) => prevState ? false : true );
    }

    const toggleConfirmMessage = () => {
        setMountConfirm((prevState) => prevState ? false : true);
    }

    // @ts-ignore
    const handleChange = (e): void => {

        if (e.target.name === 'course-cat') {
            //  allow only letters, no numbers, no special chars
            const regexResultArray: RegExpMatchArray = e.target.value.match(/^[a-zA-Z]+$/g);

            if (regexResultArray) {
                const validatedCourseCatInput = regexResultArray.toString();
                setCourseCat(validatedCourseCatInput.toUpperCase());
            } else {
                setCourseCat('');
            }
            
        }

        if (e.target.name === 'course-code') {
            //  allow only numbers and comma
            const regexResultArray: RegExpMatchArray = e.target.value.match(/^[0-9,]+$/g);

            if (regexResultArray) {
                const validatedCourseCodeInput = regexResultArray.toString();
                setCourseCodesInputString(validatedCourseCodeInput);
            } else {
                setCourseCodesInputString('');
            }
        }
        
        if (e.target.name === 'winter' || e.target.htmlFor === 'winter') {
            setWinter(winter ? false : true);

            if (e.target.firstChild != null)
            e.target.firstChild.checked = (winter) ? false : true;
        }

        if (e.target.name === 'fall' || e.target.htmlFor === 'fall') {
            setFall(fall ? false : true);

            if (e.target.firstChild != null)
            e.target.firstChild.checked = (e.target.firstChild.checked) ? false : true;
        }

        if (e.target.name === 'summer' || e.target.htmlFor === 'summer') {
            setSummer(summer ? false : true);
            
            if (e.target.firstChild != null)
            e.target.firstChild.checked = (e.target.firstChild.checked) ? false : true;
        }
        
    }

    const handleAdd = (): void => {

        let errorCount: number = 0;

        const validCodes: string[] = getValidCodes(courseCodesInputString.split(','));

        if (courseCat.length < 4) {
            errorStatus = true;
            setErrorMessage('Invalid course category.');
            errorCount++;
        }

        if (validCodes.length === 0 && !errorStatus) {
            errorStatus = true;
            setErrorMessage('Invalid course code(s).');
            errorCount++;
        }

        if (!winter && !summer && !fall && !errorStatus) {
            errorStatus = true;
            setErrorMessage('Select at least one term.');
            errorCount++;
        }

        

        if (!errorStatus && errorCount === 0)

        for (const course of validCodes) {
            const newCourrse: Course2 = {
                name: `${courseCat}-${course}`,
                dropzoneid: '',
                mcindex: -1,
                terms: []
            }

            if (winter) newCourrse.terms.push('Winter');
            if (summer) newCourrse.terms.push('Summer');
            if (fall) newCourrse.terms.push('Fall');

            if (newCourrse.terms.length === 0) {
            }
            dispatch_DataArrays({ type: COURSES_ACTION.ADD, payload: newCourrse });

            // setCourses_Array((prevState) => [...prevState, newCourrse]);
        }

        if (errorCount === 3) {
            setErrorMessage('The form is empty. Nothing to add. Add some course info.');
        }

        if (errorStatus) {
            toggleErrorMessage();
        } else {
            dispatch_Toggles({ type: TOGGLES_ACTION.ADD_COURSE_FORM });
        }

        errorStatus = false;

        
        
    }

    const handleLoadSampleList = (): void => {
        toggleConfirmMessage();
    }



    const loadSampleList = (): void => {

        dispatch_DataArrays({ type: MOVED_COURSES_ACTION.RESET });
        dispatch_DataArrays({ type: COURSES_ACTION.LOAD_SAMPLE });     

        toggleConfirmMessage();
        setTimeout(() => {
            dispatch_Toggles({ type: TOGGLES_ACTION.ADD_COURSE_FORM });
        }, 100);
    }
    
    
        
    return (
        <>
            <AnimatePresence>
                {mountError && <ErrorPopup popupTitle={'Error'} toggleErrorMessage={toggleErrorMessage}>{errorMessage}</ErrorPopup>}
                {mountConfirm && <Confirm 
                                    popupTitle={'Confirm Overwrite'} 
                                    messageBody='Loading sample list will overwrite your current courses list. Do you wish to continue?'
                                    handleConfirm={loadSampleList}
                                    handleCancel={toggleConfirmMessage} />}
            </AnimatePresence>

            

            <motion.div 
                key='form-wrapper'
                className={`${styles['form-wrapper']} ${(mountError || mountConfirm) ? 'blurbg' : null}`}
                {...popupAnimation}
            >
            {(mountError || mountConfirm) && <BackgroundBlock />}

                <form>
                    <h3 className={styles['popup-window-title']}>Add Course</h3>
                    <div className={styles['form-grid']}>

                        <label htmlFor='course-cat'>Course category</label>
                        <input 
                            type="text" 
                            id={styles['course-cat']} 
                            name="course-cat" 
                            value={courseCat}
                            onChange={handleChange} 
                            placeholder="ie. COMP (this must be same to add multiple)" 
                            maxLength={Constants.COURSECAT_MAX_LENGTH}
                            />
                        
                        <label htmlFor='course-code'>Course code</label>
                        <input 
                            type="text" 
                            id={styles['course-code']} 
                            name="course-code"
                            value={courseCodesInputString}
                            onChange={handleChange} 
                            placeholder="ie. 2130 or 2130,2560,3400 to add multiple" />
                        

                        <label>Offered terms</label>
                        <div className={styles['terms-checkbox']}>
                            
                            <label htmlFor='winter' onClick={handleChange}>
                                <input 
                                    type="checkbox" 
                                    name="winter" 
                                    onChange={handleChange}
                                    id={styles.winnter} 
                                    />
                            Winter</label>
                            
                            <label htmlFor='summer' onClick={handleChange}>
                                <input 
                                    type="checkbox" 
                                    name="summer" 
                                    onChange={handleChange}
                                    id={styles.summer} 
                                    />
                            Summer</label>

                            <label htmlFor='fall' onClick={handleChange}>
                                <input 
                                type="checkbox" 
                                name="fall" 
                                onChange={handleChange}
                                id={styles.fall} 
                                />
                            Fall</label>

                        </div>
                        
                        
                        

                        <div className={styles['form-btns']}>
                            <input type="button" className={styles['form-btn']} value="Use Sample List" onClick={handleLoadSampleList} />


                        </div>
                        <div className={styles['form-btns']}>
                            <input type="button" className={styles['form-btn']} value="Add" onClick={handleAdd} />

                            <input type="button" className={styles['form-btn']} value="Cancel" onClick={() => dispatch_Toggles({ type: TOGGLES_ACTION.ADD_COURSE_FORM })} />

                        </div>
                    </div>
                </form>
            </motion.div>
            
            
        </>
    )};

export default AddCourseForm;