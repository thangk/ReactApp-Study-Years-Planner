import styles from '../styles/ErrorPopup.module.scss'
import { motion } from 'framer-motion';
import { errorAnimation } from './FramerMotionAnimations';

// @ts-ignore
const ErrorPopup = ({ children, toggleErrorMessage, popupTitle }) => {
        
        
        
    return (
        <>
            <motion.div 
                className={styles['error-wrapper']}
                key='error-wrapper'
                {...errorAnimation}
            >
                <div className={styles['error-message']}>
                    <h3 className={styles['popup-window-title']}>{popupTitle}</h3>
                    <div className={styles['error-grid']}>
                        <p>{children}</p>
                        <input type="button" value="OK" onClick={() => toggleErrorMessage()} />
                    </div>
                </div>
            </motion.div>
            
            
        </>
    )};

export default ErrorPopup;