export const presenceAnim = (variants, state) => {
  return {
    initial: "initial",
    animate: state ? "animate" : "initial",
    variants,
  };
};

export const anim = (variants) => {
  return {
    initial: "initial",
    animate: "animate",
    exit: "exit",
    variants,
  };
};

const easeOutExpo = [0.16, 1, 0.3, 1]

export const TitlePresence = {
  initial: {
    clipPath: "inset(0% 0% 100% 0%)",
    y: "100%",
  },
  animate: ({id, duration}) => ({
    clipPath: "inset(0% 0% -20% 0%)",
    y: "0%",
    transition: {
      duration,
      ease: easeOutExpo,
      delay: (id + 1) * 0.1,
    },
    transitionEnd: {
      clipPath: "none",
      y: "auto",
    }
  }),
  exit: {
    clipPath: "inset(0% 0% 100% 0%)",
    y: "100%",
  },
}