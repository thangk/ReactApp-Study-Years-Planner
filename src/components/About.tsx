import styles from '../styles/About.module.scss';
import { motion } from 'framer-motion';
import { popupAnimation } from './FramerMotionAnimations';

import { useContext } from 'react';
import { AllContext } from '../App';
import { TOGGLES_ACTION } from './Constants_ACTION';

const About = () => {

    const { dispatch_Toggles } = useContext(AllContext);

    return (
            <motion.div 
            
                className={styles['about-wrapper']}
                
                key='about-wrapper'
                {...popupAnimation}
            >
                <div className={styles['about-information']}>
                <h3 className={styles['popup-window-title']}>About</h3>
                <div className={styles['about-grid']}>
                    
                    <p>{`Welcome to my "Study Years Planner" utility web app.`}</p>

                    <p>{`My name is Kap Thang. I'm currently an honours Computer Science student at the University of Windsor (ON, Canada) -- specializing in software engineering. I am passionate about creating practical and useful applications for mobile, desktop and the web.`}</p>

                    <p>{`I came up with the idea to create this web app which will help students visualize how they can plan for the courses they need to take throughout their journey at the university. If you're a visual person like myself, then I hope you would find this tool useful.`}</p>

                    <p>{`I plan to add many more useful features in the near future. So check back once in a while. Enjoy!`}</p>

                    <p>{`For any queries you may have regarding this tool, you may reach me at`} <strong>thangk@uwindsor.ca</strong></p>

                    <label>Regards,<br />Kap</label>

                    <input type="button" value="OK" onClick={() => dispatch_Toggles({ type: TOGGLES_ACTION.ABOUT })} />
                </div>
                </div>
            </motion.div>

    )};

export default About;