import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Sparkles } from 'lucide-react';

const questions = [
  {
    question: "What is the primary function of fats and oils in the body?",
    choices: ["Energy Source", "Waste Product", "None of the above"],
    correctAnswer: "Energy Source"
  },
  {
    question: "Which vitamins require fats for absorption?",
    choices: ["A, D, E, K", "B, C", "None of the above"],
    correctAnswer: "A, D, E, K"
  },
  {
    question: "What type of fats are essential for brain function?",
    choices: ["Omega-3 fatty acids", "Trans fats", "Saturated fats"],
    correctAnswer: "Omega-3 fatty acids"
  },
  {
    question: "Which fats should be limited in the diet?",
    choices: ["Saturated fats", "Unsaturated fats", "Omega-3 fatty acids"],
    correctAnswer: "Saturated fats"
  },
  {
    question: "What role do fats play in hormone production?",
    choices: ["Precursors for steroid hormones", "Destroy hormones", "None of the above"],
    correctAnswer: "Precursors for steroid hormones"
  }
];

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswer = () => {
    const correct = selectedAnswer === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer('');
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer('');
    setShowResult(false);
    setIsCorrect(null);
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Fats and Oils Quiz</CardTitle>
          <Progress value={progress} className="w-full" />
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl mb-4">{questions[currentQuestionIndex].question}</h2>
                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                  {questions[currentQuestionIndex].choices.map((choice, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value={choice} id={`choice-${index}`} />
                      <Label htmlFor={`choice-${index}`}>{choice}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
                <p className="text-xl mb-4">You scored {(score / questions.length) * 100}%</p>
                {score === questions.length && (
                  <div className="mb-4">
                    <p className="text-lg font-semibold">Congratulations! Here's your reward:</p>
                    <p className="text-xl font-bold mt-2">Recharge Card: 1234-5678-9101</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-center">
          {!showResult ? (
            <Button
              onClick={handleAnswer}
              disabled={!selectedAnswer}
              className="w-full max-w-xs"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
            </Button>
          ) : (
            <Button onClick={resetQuiz} className="w-full max-w-xs">
              Restart Quiz
            </Button>
          )}
        </CardFooter>
      </Card>
      <AnimatePresence>
        {isCorrect !== null && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full text-white font-bold ${
              isCorrect ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {isCorrect ? (
              <div className="flex items-center">
                <Sparkles className="mr-2" />
                Correct!
              </div>
            ) : (
              'Incorrect'
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
