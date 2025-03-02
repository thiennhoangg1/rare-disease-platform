"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Define props interface (survey is optional)
interface ChiefComplaintAIProps {
  survey?: { complaint: string; severity: string };
}

// Comprehensive rare disease database (expanded from NORD, Orphanet, etc.)
const RARE_DISEASE_DATA = {
  "Ehlers-Danlos Syndrome": {
    symptoms: ["joint pain", "fatigue", "easy bruising", "flexible joints", "skin stretchiness", "chronic pain"],
    rarity: true, // Flag for rare disease
  },
  "Postural Orthostatic Tachycardia Syndrome (POTS)": {
    symptoms: ["dizziness", "fatigue", "rapid heartbeat", "lightheadedness", "exercise intolerance"],
    rarity: true,
  },
  "Addison's Disease": {
    symptoms: ["fatigue", "weight loss", "dark skin patches", "low blood pressure", "salt craving"],
    rarity: true,
  },
  "Fibromyalgia": {
    symptoms: ["joint pain", "fatigue", "sleep issues", "widespread pain", "brain fog"],
    rarity: true,
  },
  "Huntington's Disease": {
    symptoms: ["involuntary movements", "cognitive decline", "mood changes", "weight loss", "difficulty swallowing"],
    rarity: true,
  },
  "Cystic Fibrosis": {
    symptoms: ["chronic cough", "frequent lung infections", "poor growth", "salty skin", "digestive issues"],
    rarity: true,
  },
  "Sickle Cell Anemia": {
    symptoms: ["pain crises", "fatigue", "jaundice", "swelling in hands/feet", "frequent infections"],
    rarity: true, // Considered rare in some populations
  },
  "Amyotrophic Lateral Sclerosis (ALS)": {
    symptoms: ["muscle weakness", "difficulty speaking", "breathing problems", "twitching", "fatigue"],
    rarity: true,
  },
};

// Common symptom database
const COMMON_SYMPTOM_DATA = {
  "Common Cold": {
    symptoms: ["runny nose", "sneezing", "cough", "mild fatigue", "sore throat"],
    rarity: false,
  },
  "Seasonal Allergies": {
    symptoms: ["sneezing", "itchy eyes", "nasal congestion", "mild fatigue", "throat irritation"],
    rarity: false,
  },
  "Influenza": {
    symptoms: ["high fever", "body aches", "fatigue", "cough", "headache"],
    rarity: false,
  },
};

// Combined open-ended questions for demographics and symptoms
const DEMOGRAPHIC_QUESTIONS = [
  { text: "Hey! I’m here to help with your symptoms. How old are you? No worries if you’re unsure—just an approximate number like 15 or 20 works!", key: "age" },
  { text: "Thanks! Could you share your gender? (e.g., Male, Female, Other, or let me know if you’d prefer not to say)", key: "gender" },
];

const GENERAL_SYMPTOM_QUESTIONS = [
  { text: "Great, I’d love to hear how you’re feeling. Could you describe any tiredness or fatigue you might have? Feel free to share anything!", positive: "fatigue" },
  { text: "Got it. Are you feeling any pain? If so, where or how does it feel? I’m here to listen.", positive: "pain" },
  { text: "Thanks for sharing. Could you tell me about any dizziness or balance issues? I’m here to help.", positive: "dizziness" },
  { text: "Awesome. Have you noticed any fever, chills, or other changes? Share anything you’re comfortable with.", positive: "fever" },
  { text: "Cool, thanks. Could you describe any breathing issues, like coughing or shortness of breath? I’m glad you’re reaching out.", positive: "respiratory" },
];

const RARE_FOLLOW_UP_QUESTIONS = [
  { text: "Thanks for that. Could you describe any unusual skin changes, like bruising, stretchiness, or dark patches? I’m here to help.", positive: ["easy bruising", "skin stretchiness", "dark skin patches"] },
  { text: "I hear you. Do you have any joint problems, like flexibility issues or chronic pain? I’m sorry you’re dealing with this.", positive: ["flexible joints", "chronic pain", "joint pain"] },
  { text: "Got it. Could you share if you feel dizzy or have a rapid heartbeat, especially when standing? I’m here for you.", positive: ["dizziness", "rapid heartbeat", "lightheadedness"] },
  { text: "Thanks. Have you noticed any weight loss or salt cravings? I’m here to explore this with you.", positive: ["weight loss", "salt craving"] },
  { text: "Cool. Could you describe any sleep issues, brain fog, or involuntary movements? I’m sorry you’re going through this.", positive: ["sleep issues", "brain fog", "involuntary movements"] },
];

const COMMON_FOLLOW_UP_QUESTIONS = [
  { text: "Thanks. Could you describe any runny nose, sneezing, or nasal congestion? I’m sorry you’re feeling off.", positive: ["runny nose", "sneezing", "nasal congestion"] },
  { text: "Got it. Are you experiencing itchy eyes or a sore throat? I’m here to assist.", positive: ["itchy eyes", "sore throat"] },
  { text: "Awesome. Could you share if you have a fever, body aches, or a headache? I’m here to support you.", positive: ["high fever", "body aches", "headache"] },
];

const ChiefComplaintAI: React.FC<ChiefComplaintAIProps> = ({ survey }) => {
  const [messages, setMessages] = useState<string[]>([
    "Hey! I’m here to help with your symptoms. How old are you? No worries if you’re unsure—just an approximate number like 15 or 20 works!",
  ]);
  const [userInput, setUserInput] = useState("");
  const [step, setStep] = useState(0); // 0: Demographics, 1: General, 2: Follow-up/Rare, 3: Follow-up/Common, 4: Results
  const [demographics, setDemographics] = useState<{ age?: number; gender?: string }>({});
  const [collectedSymptoms, setCollectedSymptoms] = useState<string[]>(survey ? [survey.complaint.toLowerCase()] : []);
  const [diagnosis, setDiagnosis] = useState<{ name: string; type: string; confidence: number } | null>(null); // Added type (rare/common)
  const [currentQuestions, setCurrentQuestions] = useState(DEMOGRAPHIC_QUESTIONS);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [repeatCount, setRepeatCount] = useState(0); // Track repeats for validation
  const [isThinking, setIsThinking] = useState(false); // For simulating thinking

  const isValidResponse = (input: string, step: number) => {
    const lowerInput = input.toLowerCase().trim();
    if (step === 0) {
      if (currentQuestions[questionIndex].key === "age") {
        // Handle partial or similar responses (e.g., "hi", "about 30", "I’m 15 years old", "maybe 15", "15")
        if (lowerInput === "hi" || lowerInput === "hello" || lowerInput === "hey") {
          return false; // Prompt for age specifically
        }
        // Extract numbers or approximate age from natural language (e.g., "I’m 15," "maybe 15," "around 15," "15")
        const ageMatch = lowerInput.match(/\d+/);
        const approximateAge = lowerInput.match(/(young|teen|adult|old|around|maybe)\s*(\d{1,2})/i);
        return (
          !!ageMatch && !isNaN(parseInt(ageMatch[0])) && parseInt(ageMatch[0]) > 0 && parseInt(ageMatch[0]) < 150 || // Exact number
          !!approximateAge // Approximate age (e.g., "maybe 15," "around 15")
        );
      }
      // Handle gender very flexibly (e.g., "male," "female," "other," "I’m a guy," "boy," "not sure," "prefer not to say")
      return lowerInput.length > 0 && (
        lowerInput.includes("male") || lowerInput.includes("female") || lowerInput.includes("other") ||
        lowerInput.includes("man") || lowerInput.includes("woman") || lowerInput.includes("guy") ||
        lowerInput.includes("boy") || lowerInput.includes("girl") || // Added "boy" and "girl" as synonyms
        lowerInput.includes("not sure") || lowerInput.includes("prefer not to say")
      );
    }
    // Handle symptom responses very flexibly (e.g., "kinda," "maybe," "not really," "not sure," or symptom keywords, no yes/no)
    return (
      lowerInput.length > 0 && // Allow any non-empty response
      (lowerInput.includes("maybe") || lowerInput.includes("kinda") || lowerInput.includes("not really") || lowerInput.includes("not sure") ||
        collectedSymptoms.some(s => lowerInput.includes(s)) ||
        [...Object.values(RARE_DISEASE_DATA), ...Object.values(COMMON_SYMPTOM_DATA)].flatMap(data => data.symptoms).some(s => lowerInput.includes(s)))
    );
  };

  const handleUserResponse = () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, `You: ${userInput}`];
    setMessages(newMessages);
    const lowerInput = userInput.toLowerCase().trim();

    if (!isValidResponse(lowerInput, step) && repeatCount < 3) { // Allow three repeats for more patience
      if (step === 0) {
        if (lowerInput === "hi" || lowerInput === "hello" || lowerInput === "hey") {
          setMessages([...newMessages, `Bot: Hey, nice to meet you! Could you tell me how old you are? I’m here to help with your symptoms—no worries if you’re unsure, just an approximate number like 15 or 20 works!`]);
        } else {
          setMessages([...newMessages, `Bot: Hmm, I’m not sure I got that. Could you clarify what you mean about ${currentQuestions[questionIndex].text.split("?")[0]}? I’m here to help—just share whatever you’re comfortable with!`]);
        }
        setRepeatCount(repeatCount + 1);
        setUserInput("");
        return;
      }
      setMessages([...newMessages, `Bot: Hmm, I’m not sure I got that. Could you clarify what you mean about ${currentQuestions[questionIndex].text.split("?")[0]}? I’m here to help—just share whatever you’re comfortable with!`]);
      setRepeatCount(repeatCount + 1);
      setUserInput("");
      return;
    }

    setRepeatCount(0);

    if (step === 0) {
      // Collect demographics with follow-ups for partial or vague answers
      const currentQuestion = currentQuestions[questionIndex];
      let updatedDemographics = { ...demographics };

      if (currentQuestion.key === "age") {
        const ageMatch = lowerInput.match(/\d+/);
        const approximateAge = lowerInput.match(/(young|teen|adult|old|around|maybe)\s*(\d{1,2})/i);
        if (ageMatch) {
          const age = parseInt(ageMatch[0]);
          if (!isNaN(age) && age > 0 && age < 150) updatedDemographics.age = age;
        } else if (approximateAge) {
          const approxAge = parseInt(approximateAge[2]) || 25; // Default to 25 if no number
          updatedDemographics.age = approxAge;
          setMessages([...newMessages, `Bot: Got it, thanks! I’ll guess you’re around ${approxAge}. Sound right, or want to give a specific number? I’m here to help!`]);
        } else if (lowerInput.includes("not sure") || lowerInput.includes("don’t know")) {
          updatedDemographics.age = 25; // Default to 25 for "not sure"
          setMessages([...newMessages, `Bot: No problem if you’re unsure! I’ll assume you’re around 25 for now. Is that okay, or want to guess a number like 15 or 20? I’m here to help!`]);
        }
        // Check if age is already set to prevent looping on repeated valid inputs
        if (updatedDemographics.age && demographics.age === updatedDemographics.age) {
          setMessages([...newMessages, `Bot: I already have you at ${updatedDemographics.age}. Let’s move on—could you share your gender? (e.g., Male, Female, Other, or let me know if you’d prefer not to say)`]);
          setQuestionIndex(1);
          setUserInput("");
          return;
        } else if (updatedDemographics.age) {
          // After "hi, I'm 15" or similar, move directly to gender
          setMessages([...newMessages, `Bot: Thanks! Could you share your gender? (e.g., Male, Female, Other, or let me know if you’d prefer not to say)`]);
          setQuestionIndex(1);
          setUserInput("");
          return;
        }
      } else if (currentQuestion.key === "gender") {
        if (lowerInput.includes("male") || lowerInput.includes("man") || lowerInput.includes("guy") || lowerInput.includes("boy")) {
          updatedDemographics.gender = "Male";
        } else if (lowerInput.includes("female") || lowerInput.includes("woman") || lowerInput.includes("girl")) {
          updatedDemographics.gender = "Female";
        } else if (lowerInput.includes("other")) {
          updatedDemographics.gender = "Other";
        } else if (lowerInput.includes("not sure") || lowerInput.includes("prefer not to say")) {
          updatedDemographics.gender = "Not Specified";
          setMessages([...newMessages, `Bot: No worries! I’ll note your gender as not specified. If you want to share later, I’m here. Let’s talk symptoms—how are you feeling?`]);
        } else {
          setMessages([...newMessages, `Bot: Thanks for sharing! Not sure I caught that—could you say if you’re Male, Female, Other, or prefer not to say? I’m here to help!`]);
          setUserInput("");
          return;
        }
        // Check if gender is already set to prevent looping on repeated valid inputs
        if (updatedDemographics.gender && demographics.gender === updatedDemographics.gender) {
          setMessages([...newMessages, `Bot: I already have you as ${updatedDemographics.gender}. Let’s move on—how are you feeling? Could you describe any tiredness or fatigue you might have? Feel free to share anything!`]);
          setStep(1);
          setCurrentQuestions(GENERAL_SYMPTOM_QUESTIONS);
          setQuestionIndex(0);
          setUserInput("");
          return;
        }
      }

      setDemographics(updatedDemographics);

      // Check if both demographics are collected before proceeding, with a fallback for approximate/unsure responses
      if (updatedDemographics.age && updatedDemographics.gender) {
        setStep(1);
        setCurrentQuestions(GENERAL_SYMPTOM_QUESTIONS);
        setQuestionIndex(0);
        const greeting = survey
          ? `Bot: Thanks for that! I see you mentioned ${survey.severity} ${survey.complaint}. How are you feeling? Could you describe any tiredness or fatigue you might have? Feel free to share anything!`
          : `Bot: Thanks! How are you feeling? Could you describe any tiredness or fatigue you might have? Feel free to share anything!`;
        setMessages([...newMessages, greeting]);
      } else {
        // Prompt for the missing demographic with a concise, conversational follow-up
        if (!updatedDemographics.age) {
          setMessages([...newMessages, `Bot: Thanks! Could you share your gender? (e.g., Male, Female, Other, or let me know if you’d prefer not to say)`]);
          setQuestionIndex(1);
        } else if (!updatedDemographics.gender) {
          setMessages([...newMessages, `Bot: Thanks! How old are you? No worries if you’re unsure—just an approximate number like 15 or 20 works!`]);
          setQuestionIndex(0);
        }
        setUserInput("");
      }
    } else if (step === 1) {
      // General screening with follow-ups for partial or vague answers, no yes/no
      const currentQuestion = currentQuestions[questionIndex];
      let symptomAdded = false;
      if (lowerInput.includes("maybe") || lowerInput.includes("kinda") || lowerInput.includes("not really")) {
        if (Array.isArray(currentQuestion.positive)) {
          setCollectedSymptoms([...collectedSymptoms, ...currentQuestion.positive]);
          symptomAdded = true;
        } else {
          setCollectedSymptoms([...collectedSymptoms, currentQuestion.positive]);
          symptomAdded = true;
        }
        setMessages([...newMessages, `Bot: Ahh, I see, thanks! Could you say more about how ${currentQuestion.positive} feels or how bad it is? I’m here to help!`]);
      } else if (lowerInput.length > 0) {
        // Handle any non-empty response as potential symptom input
        const symptomMatch = [...Object.values(RARE_DISEASE_DATA), ...Object.values(COMMON_SYMPTOM_DATA)].flatMap(data => data.symptoms).find(s => lowerInput.includes(s));
        if (symptomMatch) {
          setCollectedSymptoms([...collectedSymptoms, symptomMatch]);
          symptomAdded = true;
          setMessages([...newMessages, `Bot: Got it, thanks! Could you describe how ${symptomMatch} feels or how severe it is? I’m here to listen.`]);
        } else if (lowerInput.includes("not sure")) {
          setMessages([...newMessages, `Bot: No problem if you’re unsure! Could you describe any ${currentQuestion.positive} you might feel, even if it’s mild? I’m here to help!`]);
          setUserInput("");
          return;
        } else {
          // Handle vague or descriptive responses (e.g., "tired," "like leg")
          const fatigueMatch = lowerInput.match(/(tired|fatigue|exhausted)\s*(a little|little|kind of|mild)/i);
          const painMatch = lowerInput.match(/(pain|ache|hurt)(s|ing)?\s*(in|on)?\s*(\w+)/i);
          if (fatigueMatch && currentQuestion.positive === "fatigue") {
            setCollectedSymptoms([...collectedSymptoms, "mild fatigue"]);
            symptomAdded = true;
            setMessages([...newMessages, `Bot: Ahh, I see, thanks for saying you’re feeling tired! Could you say how bad it is or if it’s ongoing? I’m here to help!`]);
          } else if (painMatch && currentQuestion.positive === "pain") {
            const painDescription = painMatch[0].toLowerCase();
            setCollectedSymptoms([...collectedSymptoms, painDescription]);
            symptomAdded = true;
            setMessages([...newMessages, `Bot: Got it, thanks for mentioning pain like ${painDescription.replace("pain", "").trim() || "that"}! Could you describe how bad it is or where it is? I’m here to listen.`]);
          } else if (currentQuestion.positive === "dizziness") {
            const dizzinessMatch = lowerInput.match(/(dizzy|dizziness|balance issues)/i);
            if (dizzinessMatch) {
              setCollectedSymptoms([...collectedSymptoms, "dizziness"]);
              symptomAdded = true;
              setMessages([...newMessages, `Bot: Thanks for mentioning dizziness! Could you say how bad it is or how often it happens? I’m sorry you’re feeling this way—I’m here to help!`]);
            } else {
              setMessages([...newMessages, `Bot: No worries if you’re unsure! Could you describe any dizziness or balance issues, even if they’re mild? I’m sorry you’re feeling this way—I’m here to help!`]);
              setUserInput("");
              return;
            }
          } else if (currentQuestion.positive === "fever") {
            const feverMatch = lowerInput.match(/(fever|chills)/i);
            if (feverMatch) {
              setCollectedSymptoms([...collectedSymptoms, feverMatch[0].toLowerCase()]);
              symptomAdded = true;
              setMessages([...newMessages, `Bot: Thanks for mentioning ${feverMatch[0].toLowerCase()}! Could you say how bad it is or how long it’s lasted? I’m here to support you!`]);
            } else {
              setMessages([...newMessages, `Bot: No problem if you’re unsure! Could you describe any fever, chills, or changes, even if they’re mild? I’m here to support you!`]);
              setUserInput("");
              return;
            }
          } else if (currentQuestion.positive === "respiratory") {
            const respiratoryMatch = lowerInput.match(/(cough|coughing|shortness of breath|breathing issues)/i);
            if (respiratoryMatch) {
              setCollectedSymptoms([...collectedSymptoms, respiratoryMatch[0].toLowerCase()]);
              symptomAdded = true;
              setMessages([...newMessages, `Bot: Thanks for mentioning ${respiratoryMatch[0].toLowerCase()}! Could you say how bad it is or how often it happens? I’m glad you’re reaching out—I’m here to help!`]);
            } else {
              setMessages([...newMessages, `Bot: No worries if you’re unsure! Could you describe any coughing, shortness of breath, or breathing issues, even if they’re mild? I’m glad you’re reaching out—I’m here to help!`]);
              setUserInput("");
              return;
            }
          }
        }
      }

      if (symptomAdded && questionIndex < currentQuestions.length - 1) {
        const nextQuestion = currentQuestions[questionIndex + 1];
        setMessages([...newMessages, `Bot: ${nextQuestion.text}`]);
        setQuestionIndex(questionIndex + 1);
      } else if (questionIndex === currentQuestions.length - 1) {
        setIsThinking(true);
        setTimeout(() => {
          // Simulate thinking for 2 seconds
          const isRareLikely = evaluateRarity();
          if (isRareLikely) {
            setStep(2);
            setCurrentQuestions(RARE_FOLLOW_UP_QUESTIONS);
            setQuestionIndex(0);
            setMessages([...newMessages, `Bot: Let me think… Thanks for sharing. I’m noticing symptoms that might suggest a rare condition. Could you describe any unusual skin changes, like bruising or stretchiness? I’m here to help!`]);
          } else {
            setStep(3);
            setCurrentQuestions(COMMON_FOLLOW_UP_QUESTIONS);
            setQuestionIndex(0);
            setMessages([...newMessages, `Bot: Let me think… Thanks for sharing. It seems your symptoms might be common. Could you describe any runny nose, sneezing, or congestion? I’m sorry you’re feeling off—I’m here to help!`]);
          }
          setIsThinking(false);
        }, 2000); // Simulate 2-second thinking delay
      } else if (questionIndex < currentQuestions.length - 1) {
        const nextQuestion = currentQuestions[questionIndex + 1];
        setMessages([...newMessages, `Bot: ${nextQuestion.text}`]);
        setQuestionIndex(questionIndex + 1);
      }
    } else if (step === 2) {
      // Rare disease follow-up with very flexible, open-ended responses
      const currentQuestion = currentQuestions[questionIndex];
      if (lowerInput.includes("maybe") || lowerInput.includes("kinda") || lowerInput.includes("not really")) {
        setCollectedSymptoms([...collectedSymptoms, ...currentQuestion.positive]);
        setMessages([...newMessages, `Bot: Ahh, I see, thanks! Could you describe how ${currentQuestion.positive.join(", ")} feels or how bad it is, even if it’s mild? I’m here to help!`]);
      } else if (lowerInput.length > 0) {
        // Handle any non-empty response as potential symptom input
        const symptomMatch = currentQuestion.positive.find(p => lowerInput.includes(p));
        if (symptomMatch) {
          setCollectedSymptoms([...collectedSymptoms, symptomMatch]);
          setMessages([...newMessages, `Bot: Got it, thanks! Could you say how bad ${symptomMatch} is or if it’s ongoing, even if it’s mild? I’m here to help!`]);
        } else if (lowerInput.includes("not sure")) {
          setMessages([...newMessages, `Bot: No worries if you’re unsure! Could you describe any ${currentQuestion.positive.join(", ")} you might have, even if it’s mild? I’m here to help!`]);
          setUserInput("");
          return;
        } else {
          // Handle vague or descriptive responses (e.g., "bruise a lot," "skin feels weird")
          const skinMatch = lowerInput.match(/(bruise|bruising|skin)\s*(easily|stretchy|dark)/i);
          const jointMatch = lowerInput.match(/(joint|joints)\s*(flexible|pain|chronic)/i);
          if (skinMatch && currentQuestion.positive.includes("easy bruising")) {
            setCollectedSymptoms([...collectedSymptoms, "easy bruising"]);
            setMessages([...newMessages, `Bot: Thanks for saying you bruise easily or notice skin changes! Could you say how often or bad it is, even if it’s mild? I’m here to help!`]);
          } else if (jointMatch && currentQuestion.positive.includes("flexible joints")) {
            setCollectedSymptoms([...collectedSymptoms, "flexible joints"]);
            setMessages([...newMessages, `Bot: Got it, thanks for mentioning joint issues! Could you say how bad or frequent they are, even if it’s mild? I’m sorry you’re dealing with this—I’m here to help!`]);
          } else {
            setMessages([...newMessages, `Bot: Thanks for sharing! Not sure I caught that—could you describe any ${currentQuestion.positive.join(", ")}, even if it’s mild? I’m here to help!`]);
            setUserInput("");
            return;
          }
        }
      }

      if (questionIndex < currentQuestions.length - 1) {
        const nextQuestion = currentQuestions[questionIndex + 1];
        setMessages([...newMessages, `Bot: ${nextQuestion.text}`]);
        setQuestionIndex(questionIndex + 1);
      } else {
        setIsThinking(true);
        setTimeout(() => {
          const finalDiagnosis = evaluateConditions(true); // Rare diseases only
          setDiagnosis(finalDiagnosis);
          setMessages([
            ...newMessages,
            `Bot: Let me think… Based on what you’ve shared (age: ${demographics.age}, gender: ${demographics.gender}), I’m sorry you’re feeling this way. It might be a rare condition like ${finalDiagnosis.name} (${finalDiagnosis.confidence.toFixed(1)}% confidence). Please see a doctor for confirmation—I’m here if you need more help!`,
          ]);
          setIsThinking(false);
        }, 2000); // Simulate 2-second thinking delay
      }
    } else if (step === 3) {
      // Common symptom follow-up with very flexible, open-ended responses
      const currentQuestion = currentQuestions[questionIndex];
      if (lowerInput.includes("maybe") || lowerInput.includes("kinda") || lowerInput.includes("not really")) {
        setCollectedSymptoms([...collectedSymptoms, ...currentQuestion.positive]);
        setMessages([...newMessages, `Bot: Ahh, I see, thanks! Could you describe how ${currentQuestion.positive.join(", ")} feels or how bad it is, even if it’s mild? I’m sorry you’re feeling off—I’m here to help!`]);
      } else if (lowerInput.length > 0) {
        // Handle any non-empty response as potential symptom input
        const symptomMatch = currentQuestion.positive.find(p => lowerInput.includes(p));
        if (symptomMatch) {
          setCollectedSymptoms([...collectedSymptoms, symptomMatch]);
          setMessages([...newMessages, `Bot: Got it, thanks! Could you say how bad ${symptomMatch} is or if it’s ongoing, even if it’s mild? I’m here to help!`]);
        } else if (lowerInput.includes("not sure")) {
          setMessages([...newMessages, `Bot: No worries if you’re unsure! Could you describe any ${currentQuestion.positive.join(", ")} you might have, even if it’s mild? I’m sorry you’re feeling off—I’m here to help!`]);
          setUserInput("");
          return;
        } else {
          // Handle vague or descriptive responses (e.g., "runny nose a lot," "sneezing sometimes")
          const nasalMatch = lowerInput.match(/(runny nose|sneezing|nasal congestion)\s*(a lot|sometimes|mild)/i);
          const eyeThroatMatch = lowerInput.match(/(itchy eyes|sore throat)\s*(mild|bad)/i);
          const feverMatch = lowerInput.match(/(fever|chills|body aches|headache)\s*(high|mild)/i);
          if (nasalMatch && currentQuestion.positive.includes("runny nose")) {
            setCollectedSymptoms([...collectedSymptoms, "runny nose"]);
            setMessages([...newMessages, `Bot: Thanks for saying you have a runny nose! Could you say how bad it is or how often it happens, even if it’s mild? I’m sorry you’re feeling off—I’m here to help!`]);
          } else if (eyeThroatMatch && currentQuestion.positive.includes("itchy eyes")) {
            setCollectedSymptoms([...collectedSymptoms, "itchy eyes"]);
            setMessages([...newMessages, `Bot: Got it, thanks for mentioning itchy eyes! Could you say how bad it is or how often it happens, even if it’s mild? I’m here to assist—I’m sorry you’re feeling off!`]);
          } else if (feverMatch && currentQuestion.positive.includes("high fever")) {
            setCollectedSymptoms([...collectedSymptoms, "high fever"]);
            setMessages([...newMessages, `Bot: Thanks for mentioning a fever! Could you say how bad it is or how long it’s lasted, even if it’s mild? I’m here to support you—I’m sorry you’re feeling off!`]);
          } else {
            setMessages([...newMessages, `Bot: Thanks for sharing! Not sure I caught that—could you describe any ${currentQuestion.positive.join(", ")}, even if it’s mild? I’m sorry you’re feeling off—I’m here to help!`]);
            setUserInput("");
            return;
          }
        }
      }

      if (questionIndex < currentQuestions.length - 1) {
        const nextQuestion = currentQuestions[questionIndex + 1];
        setMessages([...newMessages, `Bot: ${nextQuestion.text}`]);
        setQuestionIndex(questionIndex + 1);
      } else {
        setIsThinking(true);
        setTimeout(() => {
          const finalDiagnosis = evaluateConditions(false); // Common conditions only
          setDiagnosis(finalDiagnosis);
          setMessages([
            ...newMessages,
            `Bot: Let me think… Thanks for sharing. It seems your symptoms might be a common condition like ${finalDiagnosis.name}. I’m sorry you’re feeling off—please see a doctor for confirmation. I’m here if you need more help!`,
          ]);
          setIsThinking(false);
        }, 2000); // Simulate 2-second thinking delay
      }
    }

    setUserInput("");
  };

  const evaluateRarity = () => {
    // Check if symptoms strongly suggest rare diseases (e.g., uncommon symptoms like "flexible joints" or "salt craving")
    const rareIndicators = ["flexible joints", "skin stretchiness", "dark skin patches", "salt craving", "involuntary movements"];
    return collectedSymptoms.some(symptom => rareIndicators.some(indicator => symptom.includes(indicator)));
  };

  const evaluateConditions = (isRare: boolean) => {
    const dataSet = isRare ? RARE_DISEASE_DATA : COMMON_SYMPTOM_DATA;
    const allSymptoms = Object.values(dataSet).flatMap(data => data.symptoms);
    const uniqueSymptoms = [...new Set(allSymptoms)];

    const scores = Object.entries(dataSet).map(([name, data]) => {
      const matchedSymptoms = collectedSymptoms.filter(symptom =>
        data.symptoms.some(s => symptom.includes(s))
      );
      const confidence = (matchedSymptoms.length / data.symptoms.length) * 100 || 0;
      return { name, type: data.rarity ? "Rare Disease" : "Common Condition", confidence };
    });

    return scores.sort((a, b) => b.confidence - a.confidence)[0] || { name: "Unknown", type: isRare ? "Rare Disease" : "Common Condition", confidence: 0 };
  };

  // Handle hydration warning for Grammarly or other extensions
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-gr-ext-installed") {
          console.warn("Grammarly extension detected, potentially causing hydration issues. Please disable it for accurate rendering.");
        }
      });
    });
    observer.observe(document.body, { attributes: true });
    return () => observer.disconnect();
  }, []);

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
          {isThinking && <p className="text-gray-500">Bot: Let me think…</p>}
        </div>
        {!diagnosis && !isThinking && (
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
        {diagnosis && (
          <div className="mt-4">
            <p><strong>Diagnosis:</strong> {diagnosis.name} ({diagnosis.type}, {diagnosis.confidence.toFixed(1)}% confidence)</p>
            <p>Collected symptoms: {collectedSymptoms.join(", ")}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Disclaimer</AlertTitle>
          <AlertDescription>
            This isn’t a final diagnosis. Please see a doctor for confirmation. I’m here to help if you need more support!
          </AlertDescription>
        </Alert>
      </CardFooter>
    </Card>
  );
};

export default ChiefComplaintAI;