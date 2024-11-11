"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo/Logo";
import s from "./HomePage.module.scss";
import { SplitText } from "@cyriacbr/react-split-text";
import { motion, useAnimation } from "framer-motion";
import { anim, presenceAnim, TitlePresence } from "@/helpers/anim";
import Image from "next/image";
import { LoaderContext } from "@/providers/LoaderProvider/LoaderProvider";

export default function HomePage() {
  const backgroundRef = useRef();
  const controls = useAnimation();

  const { loaderFinished, setLoaderFinished } = useContext(LoaderContext);

  useEffect(() => {
    const sequence = async () => {
      await controls.set({ scale: 0.5, clipPath: "inset(100% 30% 5%)" });
      await controls.start({
        clipPath: "inset(5% 30% 5%)",
        transition: { duration: 1.5, delay: 0.5, ease: [0.83, 0, 0.17, 1] },
      });

      await controls.start({
        clipPath: "inset(0% 0% 0%)",
        scale: 1,
        transition: {
          duration: 1.2,
          delay: 0.5,
          ease: [0.83, 0, 0.17, 1],
          onUpdate: (progress) => {
            if (progress >= 0.6) {
              setLoaderFinished(true);
            }
          },
        },
      });
    };

    sequence();
  }, [controls, backgroundRef]);
  return (
    <div className={s.home}>
      <motion.div
        className={s.background}
        ref={backgroundRef}
        animate={controls}
      >
        <Image src="/images/BG.webp" fill alt="" />
      </motion.div>

      <div className={s.top}>
        <div className={s.left}>
          <div className={s.paragraph_wrapper}>
            <div className={`shadow ${s.title}`}>
              <Paragraph text="About:" />
            </div>
            <Paragraph text="365 ideas that made the world" index={1} />
          </div>
          <div className={s.paragraph_wrapper}>
            <div className={`shadow ${s.title}`}>
              <Paragraph text="description:" />
            </div>
            <Paragraph
              text="A project where we want to tell you about the 365 most important ideas that created the world"
              index={1}
            />
            <div className="bold">
              <Paragraph text="we live in" index={3} />
            </div>
          </div>
        </div>
        <Logo
          {...presenceAnim(TitlePresence, loaderFinished)}
          custom={{ id: 1, duration: 1.2 }}
          className={s.logo}
        />
      </div>
      <div className={s.title_wrapper}>
        <div className={s.title_top}>
          <h1>
            <b>
              <Paragraph text="A journey of a" index={1} />
            </b>
          </h1>

          {loaderFinished && (
            <div className={s.arrow_wrapper}>
              <div className={s.arrow}>
                <svg
                  className={s.bg}
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="48.5"
                    stroke="#0AAFD8"
                    strokeWidth="3"
                  />
                </svg>

                <svg
                  className={s.icon}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 18L19 12L13 6M17 12H5.5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 className={s.arrow_title}>
                <Paragraph text="Learn more about the marathon" index={4} />
              </h2>
            </div>
          )}
        </div>
        <h1>
          <Paragraph text="thousand miles begins" index={2} />
          <Paragraph text="with a single step." index={3} />
        </h1>
      </div>
    </div>
  );
}

const Paragraph = ({ text, index = 0, duration = 1 }) => {
  const [isAnimationEnded, setIsAnimationEnded] = useState(false);

  const { loaderFinished } = useContext(LoaderContext);

  return (
    <>
      {!isAnimationEnded ? (
        <SplitText
          LineWrapper={({ lineIndex, children }) => (
            <motion.p
              {...presenceAnim(TitlePresence, loaderFinished)}
              custom={{ id: lineIndex + index, duration }}
              className="wrapper"
              onAnimationComplete={() => setIsAnimationEnded(true)}
            >
              {children}
            </motion.p>
          )}
        >
          {text}
        </SplitText>
      ) : (
        <p>{text}</p>
      )}
    </>
  );
};
