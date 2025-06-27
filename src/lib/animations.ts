import { Variants } from "framer-motion"

// Common animation variants
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export const slideUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
}

export const slideDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export const slideInFromLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
}

export const slideInFromRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
}

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
}

export const scaleUp: Variants = {
  initial: { scale: 1 },
  animate: { scale: 1.05 },
  exit: { scale: 1 }
}

// Stagger animations for lists
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
}

// Book-specific animations
export const bookHover: Variants = {
  initial: { scale: 1, y: 0 },
  hover: { 
    scale: 1.05, 
    y: -5,
    transition: { duration: 0.2, ease: "easeOut" }
  }
}

export const bookCoverFlip: Variants = {
  initial: { rotateY: 0 },
  hover: { rotateY: 180 },
  exit: { rotateY: 0 }
}

// Button animations
export const buttonPress: Variants = {
  initial: { scale: 1 },
  tap: { scale: 0.95 }
}

export const buttonHover: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.02 }
}

// Card animations
export const cardHover: Variants = {
  initial: { 
    scale: 1, 
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" 
  },
  hover: { 
    scale: 1.02, 
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.2 }
  }
}

// Modal/drawer animations
export const modalOverlay: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export const modalContent: Variants = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 300 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    y: 20,
    transition: { duration: 0.15 }
  }
}

export const drawerContent: Variants = {
  initial: { y: "100%" },
  animate: { 
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 300 }
  },
  exit: { 
    y: "100%",
    transition: { duration: 0.2 }
  }
}

// Success/feedback animations
export const successPulse: Variants = {
  initial: { scale: 1 },
  animate: { 
    scale: [1, 1.1, 1],
    transition: { duration: 0.6, ease: "easeInOut" }
  }
}

export const shake: Variants = {
  initial: { x: 0 },
  animate: { 
    x: [-5, 5, -5, 5, 0],
    transition: { duration: 0.4 }
  }
}

// Loading animations
export const spinner: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
}

export const pulse: Variants = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Default transition settings
export const defaultTransition = {
  duration: 0.2,
  ease: "easeOut"
}

export const springTransition = {
  type: "spring",
  damping: 25,
  stiffness: 300
}

export const slowTransition = {
  duration: 0.5,
  ease: "easeInOut"
}

// Utility function to create custom animations
export const createFadeSlide = (direction: 'up' | 'down' | 'left' | 'right', distance = 20): Variants => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance }
      case 'down': return { y: -distance }
      case 'left': return { x: distance }
      case 'right': return { x: -distance }
    }
  }

  return {
    initial: { opacity: 0, ...getInitialPosition() },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, ...getInitialPosition() }
  }
} 