import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  '@keyframes blink': {
    '0%': {
      opacity: '.2',
    },
    '20%': {
      opacity: '1',
    },
    '100%': {
      opacity: '.2',
    },
  },
  animation: {
    display: 'inline',
    '& span': {
      animationName: '$blink',
      animationDuration: '1.4s',
      animationIterationCount: 'infinite',
      animationFillMode: 'both',
    },
    '& span:nth-child(2)': {
      animationDelay: '.2s',
    },
    '& span:nth-child(3)': {
      animationDelay: '.4s',
    },
  },
});

const AnimatedDots = () => {
  const styles = useStyles();

  return (
    <p className={styles.animation}>
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </p>
  );
};

export default AnimatedDots;
