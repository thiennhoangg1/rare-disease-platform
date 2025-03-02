"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Define props interface (survey is optional)
interface ChiefComplaintAIProps {
  survey?: { complaint: string; severity: string };
}

// Expanded disease data with symptom matrix
const DISEASE_DATA = {
  "Ehlers-Danlos Syndrome": {
    symptoms: ["joint pain", "fatigue", "easy bruising", "flexible joints", "skin stretchiness", "chronic pain"],
  },
  "POTS": {
    symptoms: ["dizziness", "fatigue", "rapid heartbeat", "lightheadedness", "exercise intolerance"],
  },
  "Addison's Disease": {
    symptoms: ["fatigue", "weight loss", "dark skin patches", "low blood pressure", "salt craving"],
  },
  "Fibromyalgia": {
    symptoms: ["joint pain", "fatigue", "sleep issues", "widespread pain", "brain fog"],
  },
};

// General screening questions
const GENERAL_QUESTIONS = [
  { text: "Do you have any fatigue or tiredness?", positive: "fatigue" },
  { text: "Are you experiencing any pain? Where?", positive: "pain" },
  { text: "Do you have dizziness or balance issues?", positive: "dizziness" },
];

// Broad follow-up questions
const FOLLOW_UP_QUESTIONS = [
  { text: "Do you bruise easily or notice unusual skin changes?", positive: ["easy bruising", "skin stretchiness", "dark skin patches"] },
  { text: "Do your joints feel unusually flexible or do you have chronic pain?", positive: ["flexible joints", "chronic pain", "joint pain"] },
  { text: "Do you feel dizzy or have a rapid heartbeat when standing?", positive: ["dizziness", "rapid heartbeat", "lightheadedness"] },
  { text: "Have you lost weight unexpectedly or crave salt?", positive: ["weight loss", "salt craving"] },
  { text: "Do you have trouble sleeping or feel foggy?", positive: ["sleep issues", "brain fog"] },
];

// Demographic questions
const DEMOGRAPHIC_QUESTIONS = [
  { text: "How old are you?", key: "age" },
  { text: "What’s your gender? (e.g., Male, Female, Other)", key: "gender" },
];

const ChiefComplaintAI: React.FC<ChiefComplaintAIProps> = ({ survey }) => {
  const [messages, setMessages] = useState<string[]>(["Hi! Let’s get started. How old are you?"]);
  const [userInput, setUserInput] = useState("");
  const [step, setStep] = useState(0); // 0: Demographics, 1: General, 2: Follow-up
  const [demographics, setDemographics] = useState<{ age?: number; gender?: string }>({});
  const [collectedSymptoms, setCollectedSymptoms] = useState<string[]>(survey ? [survey.complaint.toLowerCase()] : []);
  const [diagnosis, setDiagnosis] = useState<{ name: string; confidence: number } | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState(DEMOGRAPHIC_QUESTIONS);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [repeatCount, setRepeatCount] = useState(0); // Track repeats for validation

  const isValidResponse = (input: string, step: number) => {
    const lowerInput = input.toLowerCase();
    if (step === 0) {
      if (currentQuestions[questionIndex].key === "age") {
        return !isNaN(parseInt(lowerInput)); // Valid if it’s a number
      }
      return lowerInput.length > 0; // Gender just needs some input
    }
    // For symptom questions, check for "yes," "no," or symptom keywords
    return (
      lowerInput.includes("yes") ||
      lowerInput.includes("no") ||
      collectedSymptoms.some(s => lowerInput.includes(s)) ||
      DISEASE_DATA["Ehlers-Danlos Syndrome"].symptoms.some(s => lowerInput.includes(s)) || // Check all symptoms as a fallback
      DISEASE_DATA["POTS"].symptoms.some(s => lowerInput.includes(s)) ||
      DISEASE_DATA["Addison's Disease"].symptoms.some(s => lowerInput.includes(s)) ||
      DISEASE_DATA["Fibromyalgia"].symptoms.some(s => lowerInput.includes(s))
    );
  };

  const handleUserResponse = () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, `You: ${userInput}`];
    setMessages(newMessages);
    const lowerInput = userInput.toLowerCase();

    if (!isValidResponse(lowerInput, step) && repeatCount < 1) {
      // Repeat question if response isn’t solid
      setMessages([...newMessages, `Bot: I didn’t quite get that. ${currentQuestions[questionIndex].text} (Please answer clearly, e.g., Yes/No or specific details)`]);
      setRepeatCount(repeatCount + 1);
      setUserInput("");
      return;
    }

    // Reset repeat count after a valid response
    setRepeatCount(0);

    if (step === 0) {
      // Collect demographics
      const currentQuestion = currentQuestions[questionIndex];
      if (currentQuestion.key === "age") {
        const age = parseInt(userInput);
        if (!isNaN(age)) setDemographics({ ...demographics, age });
      } else if (currentQuestion.key === "gender") {
        setDemographics({ ...demographics, gender: userInput });
      }

      if (questionIndex < currentQuestions.length - 1) {
        const nextQuestion = currentQuestions[questionIndex + 1];
        setMessages([...newMessages, `Bot: ${nextQuestion.text}`]);
        setQuestionIndex(questionIndex + 1);
      } else {
        setStep(1);
        setCurrentQuestions(GENERAL_QUESTIONS);
        setQuestionIndex(0);
        const greeting = survey
          ? `Thanks! I see you mentioned ${survey.severity} ${survey.complaint}.`
          : "Thanks! Let’s talk about your symptoms.";
        setMessages([...newMessages, `Bot: ${greeting} Do you have any fatigue or tiredness?`]);
      }
    } else if (step === 1) {
      // General screening
      const currentQuestion = currentQuestions[questionIndex];
      if (lowerInput.includes("yes") || lowerInput.includes(currentQuestion.positive)) {
        setCollectedSymptoms([...collectedSymptoms, currentQuestion.positive]);
      } else if (currentQuestion.positive === "pain" && !lowerInput.includes("no")) {
        setCollectedSymptoms([...collectedSymptoms, lowerInput]); // e.g., "joint pain"
      }

      if (questionIndex < currentQuestions.length - 1) {
        const nextQuestion = currentQuestions[questionIndex + 1];
        setMessages([...newMessages, `Bot: ${nextQuestion.text}`]);
        setQuestionIndex(questionIndex + 1);
      } else {
        setStep(2);
        setCurrentQuestions(FOLLOW_UP_QUESTIONS);
        setQuestionIndex(0);
        setMessages([...newMessages, `Bot: ${FOLLOW_UP_QUESTIONS[0].text}`]);
      }
    } else if (step === 2) {
      // Follow-up questions
      const currentQuestion = currentQuestions[questionIndex];
      if (lowerInput.includes("yes")) {
        setCollectedSymptoms([...collectedSymptoms, ...currentQuestion.positive]);
      }

      if (questionIndex < currentQuestions.length - 1) {
        const nextQuestion = currentQuestions[questionIndex + 1];
        setMessages([...newMessages, `Bot: ${nextQuestion.text}`]);
        setQuestionIndex(questionIndex + 1);
      } else {
        const finalDiagnosis = evaluateConditions();
        setDiagnosis(finalDiagnosis);
        setMessages([
          ...newMessages,
          `Bot: Based on your answers (age: ${demographics.age}, gender: ${demographics.gender}), a possible condition could be ${finalDiagnosis.name} (${finalDiagnosis.confidence.toFixed(1)}% confidence).`,
        ]);
      }
    }

    setUserInput("");
  };

  const evaluateConditions = () => {
    const allSymptoms = Object.values(DISEASE_DATA).flatMap(data => data.symptoms);
    const uniqueSymptoms = [...new Set(allSymptoms)];

    const scores = Object.entries(DISEASE_DATA).map(([name, data]) => {
      const matchedSymptoms = collectedSymptoms.filter(symptom =>
        data.symptoms.some(s => symptom.includes(s))
      );
      const confidence = (matchedSymptoms.length / data.symptoms.length) * 100;
      return { name, confidence };
    });

    return scores.sort((a, b) => b.confidence - a.confidence)[0];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chief Complaint AI Chatbot</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {messages.map((msg, idx) => (
            <p key={idx} className={msg.startsWith("You:") ? "text-blue-600" : "text-gray-800"}>
              {msg}
            </p>
          ))}
        </div>
        {!diagnosis && (
          <div className="mt-4 flex gap-2">
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your response..."
              onKeyPress={(e) => e.key === "Enter" && handleUserResponse()}
            />
            <Button onClick={handleUserResponse}>Send</Button>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Disclaimer</AlertTitle>
          <AlertDescription>
            This is not a definitive medical diagnosis. Please consult a healthcare professional for further evaluation and confirmation.
          </AlertDescription>
        </Alert>
      </CardFooter>
    </Card>
  );
};

export default ChiefComplaintAI;
