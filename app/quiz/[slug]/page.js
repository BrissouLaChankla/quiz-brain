"use client"
import { useState, useEffect } from "react"
import { shuffle, slugToNameCategory } from "@/utils/all";
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from 'next/navigation'
import { usePlayerStore } from "@/store/player";

export default function page({ params }) {
    const { increaseScore, setCategory, resetScore } = usePlayerStore()
    const router = useRouter()
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        (async () => {
            const res = await fetch(`https://quizzapi.jomoreschi.fr/api/v1/quiz?limit=10&category=${params.slug}`)
            const data = await res.json();

            data.quizzes.map(quiz => {
                return quiz.allAnswers = shuffle([...quiz.badAnswers, quiz.answer])
            });

            setQuestions(data.quizzes);
        })()
        setCategory(slugToNameCategory(params.slug))
        resetScore();
    }, [])

    useEffect(() => {
        // Send to end page when game is over
        if (currentIndex === questions.length && questions.length > 0) {
            router.push('/quiz/end')
        }
    }, [currentIndex]);


    const selectAnswer = (answer) => {
        setSelectedAnswer(answer)
    }

    const validateAnswer = () => {
        // Good Answer
        if (!questions[currentIndex].badAnswers.includes(selectedAnswer)) {
            // Increase global score
            increaseScore();
        }

        setCurrentIndex(prev => prev + 1);
        setSelectedAnswer("");
    }


    return (
        <div className="grid grid-cols-12 grow">
            <div className="col-span-12 lg:col-span-4 bg-center bg-cover bg-no-repeat bg-black  min-h-8" style={{ backgroundImage: `url('/illustrations/${params.slug}.webp')` }}>
            </div>
            <div className="col-span-12 lg:col-span-8 p-4 lg:px-24 flex flex-col justify-between">
                {
                    questions.length && currentIndex !== questions.length ?
                        <>
                            <div>
                                <div className="text-end text-primary text-xl font-medium my-3 lg:my-6">
                                    <span className="countdown font-bold"><span style={{ "--value": currentIndex + 1 }}></span>/{questions.length}</span>
                                </div>
                                <div className="text-center ">
                                    <div className="badge badge-primary badge-lg py-3 my-2 text-sm text-white capitalize">{slugToNameCategory(params.slug)}</div>
                                    <div className="lg:min-h-28 mt-3 grid">
                                        <AnimatePresence mode="wait">
                                            <motion.h1
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 20 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 260,
                                                    damping: 20,
                                                }}
                                                key={currentIndex}
                                                className="text-center lg:text-3xl mt-2 lg:mt-8">
                                                {questions[currentIndex].question}
                                            </motion.h1>
                                        </AnimatePresence>
                                    </div>
                                </div>

                                <div className="flex mt-8 gap-6 min-h-32 content-center flex-wrap justify-center max-w-3xl ">
                                    <Answers id={questions[currentIndex]._id} answers={questions[currentIndex].allAnswers} selectedAnswer={selectedAnswer} selectAnswer={selectAnswer} />
                                </div>
                            </div>
                            <div className="text-end my-8">
                                <div onClick={() => validateAnswer()} className={`btn px-8 text-lg text-white ${selectedAnswer ? "btn-primary" : "btn-disabled"}`}>Valider</div>
                            </div>
                        </>
                        :
                        <div className=" grid place-items-center h-full">
                            <span className="loading loading-spinner loading-md mb-20"></span>
                        </div>
                }

            </div>
        </div>

    )
}


const Answers = ({ answers, selectAnswer, selectedAnswer, id }) => {
    return (
        <>
            <AnimatePresence mode="wait" >
                {answers.map((answer, i) => (
                    <motion.div initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{
                            delay: 0.15 * i
                        }}
                        key={i + id}
                        className={`transition max-w-80 w-full px-3 py-6 rounded-lg  text-center cursor-pointer grid place-items-center ${selectedAnswer === answer ? "ring-primary ring-4" : "ring-gray-200  ring-2"}`} onClick={() => selectAnswer(answer)}>
                        <p>{answer}</p>
                    </motion.div>
                ))}
            </AnimatePresence>
        </>
    )
}