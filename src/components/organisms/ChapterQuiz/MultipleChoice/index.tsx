import React, { useState } from "react";

// Components
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import MultipleChoiceAnswer from "./MultipleChoiceAnswer";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { AnimatePresence, easeOut, motion } from "motion/react";

// Utils
import { shuffleArray } from "../../../../utils/array";

// Types
import { MultipleChoiceType } from "..";

/**
 * A multiple choice component
 * @param params
 * @returns
 */
const MultipleChoice: React.FC<{
  index: number;
  multipleChoice: MultipleChoiceType;
}> = ({ index, multipleChoice }) => {
  // Reshuffle the answer options and cache it
  const [cachedMultipleChoice, setCachedMultipleChoice] =
    useState<MultipleChoiceType>(() => ({
      ...multipleChoice,
      options: shuffleArray(multipleChoice.options),
    }));
  const totalCorrectAnswers = multipleChoice.options.reduce((acc, option) => {
    return option.correct ? acc + 1 : acc;
  }, 0);
  const [_, setCorrectlyAnswered] = useState<number>(0);
  const addAnswer = (index: number, correct: boolean) => {
    setCorrectlyAnswered((prevCorrectlyAnswered) => {
      const currentCount = correct
        ? prevCorrectlyAnswered + 1
        : prevCorrectlyAnswered;
      setCachedMultipleChoice((prevMultipleChoice) => {
        const newOptions = prevMultipleChoice.options.map((option, idx) => {
          // If the answer is incorrect, show the correct answer
          if (!correct && idx === index) {
            return {
              ...option,
              correctnessText: "Try again later.",
            };
          }
          // If the answer is correct, show answer count
          if (idx === index) {
            return {
              ...option,
              correctnessText:
                totalCorrectAnswers > 1
                  ? `${currentCount} of ${totalCorrectAnswers} correct answers.`
                  : "Correct!",
            };
          }
          return option;
        });
        return {
          ...prevMultipleChoice,
          options: newOptions,
        };
      });
      return currentCount;
    });
  };

  return (
    <Disclosure
      as="div"
      className="assesment-multiple-choice"
      // defaultOpen={true}
      key={`${cachedMultipleChoice.question.replace(" ", "")}${index}`}
    >
      {({ open }) => (
        <>
          <DisclosureButton className="group flex items-center gap-2 bg-surface-2 w-full justify-between">
            <MultipleChoiceQuestion question={cachedMultipleChoice.question} />
            {/* {cachedMultipleChoice.question} */}
            <div>
              <ChevronDownIcon
                className={`size-8 mx-4 group-data-hover:fill-white/50 transition-all ${open && "rotate-180"}`}
                style={{ color: "var(--text1)" }}
              />
            </div>
          </DisclosureButton>

          <div className="overflow-hidden py-2">
            <AnimatePresence>
              {open && (
                <DisclosurePanel static as={React.Fragment}>
                  <motion.div
                    initial={{ opacity: 0, y: -24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.2, ease: easeOut }}
                    className="origin-top"
                  >
                    {cachedMultipleChoice.options.map((option, optIdx) => (
                      <MultipleChoiceAnswer
                        key={optIdx}
                        index={optIdx}
                        optionText={option.text}
                        correct={option.correct}
                        explanationText={option.explanation}
                        correctnessText={option.correctnessText as string}
                        addAnswer={addAnswer}
                      />
                    ))}
                  </motion.div>
                </DisclosurePanel>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default MultipleChoice;
