import styles from '../styles/Confirm.module.scss'
import { motion } from 'framer-motion';
import { popupAnimation } from './FramerMotionAnimations';


// @ts-ignore
const Confirm = ({ popupTitle, messageBody, handleConfirm, handleCancel}) => {
        
        
        
    return (
        <motion.div 
                key='confirm-wrapper'
                className={styles['confirm-wrapper']}
                {...popupAnimation}
            >
                <div className={styles['confirm-confirmation']}>
                <h3 className={styles['popup-window-title']}>{popupTitle}</h3>
                <div className={styles['confirm-grid']}>
                    
                    <p>{messageBody}</p>

                    <div><input type="button" value="Yes" id={styles.yesButton} onClick={handleConfirm} /></div>
                    <div><input type="button" value="Cancel" id="cancelButton" onClick={handleCancel} /></div>
                </div>
                </div>
        </motion.div>
    )};

export default Confirm;