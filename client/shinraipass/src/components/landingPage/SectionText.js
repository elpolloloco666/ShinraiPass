import React from 'react';
import { motion } from 'framer-motion';
import { textAnimation } from '@/utils/framerTransitions';

import { Staatliches } from 'next/font/google';

const staatliches = Staatliches({
    subsets:['latin'],
    weight:['400']
})


const SectionText = ({text,styles}) => {
  return (
    <div>
        {
            Array.from(text).map((letter,i)=> (
                <motion.span key={letter+i} className={`${styles} ${staatliches.className}`}
                    viewport={{ once: true }} variants={textAnimation(i*0.2,'down',0)} initial='hidden' whileInView='visible'
                >
                    {letter}
                </motion.span>
            ))
        }
              
    </div>
  )
}

export default SectionText;