import styles from '../styles/Help.module.scss'
import { motion } from 'framer-motion'

import { popupAnimation } from '../components/FramerMotionAnimations';

import { useContext } from 'react';
import { AllContext } from '../App';
import { TOGGLES_ACTION } from './Constants_ACTION';

const Help = () => {

    const { dispatch_Toggles } = useContext(AllContext);
        
    return (
            <motion.div 
                key='help-wrapper'
                {...popupAnimation}
                className={styles['help-wrapper']}
            >
                <div className={styles['help-information']}>
                <h3 className={styles['popup-window-title']}>How to Use</h3>
                <div className={styles['help-grid']}>

                <label>Step 1:<br />Add courses</label>
                <p>{`Course catergory field has 9 characters limit. Every input is autocaptitalized for your convenience. If you're bulk adding courses, make sure they're all of the same program courses. You can click on "Use Sample List" for quick demo-ing.`}</p>

                <label>Step 2:<br />Add study years</label>
                <p>{`When adding the years, the first year will be set to current year. You can adjust them later using the up and down buttons beside it. Deleting a year will send its courses back into the courses list and you don't have to re-add them.`}</p>

                <label>Step 3:<br />Drag and drop courses</label>
                <p>{`When dragging a course, only the terms where the course is offered will be available for dropping into. These terms are set when you add the course via "Add Course" button. If you made a mistaken with setting its terms, you'll have to re-add the course with the correct terms.`}</p>

                <label>Removing courses</label>
                <p>{`Right click on courses to unassign to terms or right click while they're in courses list to delete them from the list.`}</p>

                <input type="button" value="OK" onClick={() => dispatch_Toggles({ type: TOGGLES_ACTION.HELP })} />
                </div>
                </div>
            </motion.div>
    )};

export default Help;