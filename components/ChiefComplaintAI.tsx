// components/ChiefComplaintAI.tsx
'use client';
import React, { useState } from 'react';
import { SYMPTOMS } from '@/lib/symptoms';

interface ChiefComplaintAIProps {
  demographics: {
    age: number;
    gender: string;
  };
  survey: {
    // Define survey fields as needed
  };
}

function ChiefComplaintAI({ demographics, survey }: ChiefComplaintAIProps) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'system', content: 'How can I assist you today?' },
  ]);

  // Extract symptoms from user messages
  const extractSymptoms = (messages: { role: string; content: string }[]) => {
    const userMessages = messages
      .filter((msg) => msg.role === 'user')
      .map((msg) => msg.content.toLowerCase());
    return SYMPTOMS.filter((symptom) =>
      userMessages.some((msg) => msg.includes(symptom))
    );
  };

  // Redirect to home page with symptoms as query parameters
  const handleViewRelatedContent = () => {
    const symptoms = extractSymptoms(messages);
    const query = symptoms.length > 0 ? `?symptoms=${symptoms.join(',')}` : '';
    window.location.href = `/${query}`;
  };

  // Handle sending a message (simplified for demo)
  const handleSendMessage = (content: string) => {
    setMessages((prev) => [...prev, { role: 'user', content }]);
    // Simulate an AI response (replace with real logic if needed)
    setMessages((prev) => [
      ...prev,
      { role: 'system', content: `I noted: ${content}. Anything else?` },
    ]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Chat with AI</h1>
      <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '200px' }}>
        {messages.map((msg, index) => (
          <p key={index} style={{ margin: '5px 0' }}>
            <strong>{msg.role}:</strong> {msg.content}
          </p>
        ))}
      </div>
      <input
        type="text"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage(e.currentTarget.value);
            e.currentTarget.value = '';
          }
        }}
        placeholder="Type your symptoms..."
        style={{ marginTop: '10px', padding: '5px', width: '200px' }}
      />
      <button
        onClick={handleViewRelatedContent}
        style={{
          marginTop: '10px',
          padding: '8px 16px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        View Related Content
      </button>
    </div>
  );
}

export default ChiefComplaintAI;
