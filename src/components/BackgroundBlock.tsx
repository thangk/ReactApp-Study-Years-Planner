import styles from '../styles/BackgroundBlock.module.scss'
import { motion } from 'framer-motion';
import { backgroundBlockAnimation } from './FramerMotionAnimations';

const BackgroundBlock = () => {

    return (
            <motion.div 
                key='bg-block'
                {...backgroundBlockAnimation}
                className={styles['bg-block']}
            >
            </motion.div>
    )};

export default BackgroundBlock;