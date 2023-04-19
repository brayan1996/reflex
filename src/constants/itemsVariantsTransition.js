export const itemVariantsLogin = {
    open: {
      opacity: 0,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { 
      opacity: 1, 
      x: -20,
      transition: { duration: 0.4 } 
    }
  };
export const itemVariantsRegister = {
    open: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { 
      opacity: 0, 
      x: 20, 
      transition: { duration: 0.4 } 
    }
  };