//  styles
import styles from '../styles/Reset.module.scss'
//  animations
import { popupAnimation } from './FramerMotionAnimations';
//  3rd party libs
import { motion } from 'framer-motion';

import { useContext } from 'react';
import { AllContext } from '../App';
import { TOGGLES_ACTION } from './Constants_ACTION';

// @ts-ignore
const Reset = ({ onConfirm }) => {

    const { dispatch_Toggles } = useContext(AllContext);
        
    return (
            <motion.div 
                key='reset-wrapper'
                className={styles['reset-wrapper']}
                {...popupAnimation}
            >
                <div className={styles['reset-confirmation']}>
                <h3 className={styles['popup-window-title']}>Reset</h3>
                <div className={styles['reset-grid']}>
                    
                    <p>{'Are you sure you want to reset the courses and study years?'}</p>

                    <div><input type="button" value="Yes" id={styles.yesButton} onClick={onConfirm} /></div>
                    <div><input type="button" value="Cancel" id="cancelButton" onClick={() => dispatch_Toggles({ type: TOGGLES_ACTION.RESET })} /></div>
                </div>
                </div>
            </motion.div>
    )};

export default Reset;