"use client";

import { multilingualAgronomyAssistance, type MultilingualAgronomyAssistanceOutput } from "@/ai/flows/multilingual-agronomy-assistance";
import type { ReactNode } from "react";
import { createContext, useContext, useMemo, useState } from "react";
import { useLanguage } from "./language-provider";

export type Message = {
    id: string;
    content: string;
    role: "user" | "assistant";
};

type ChatContextType = {
    messages: Message[];
    addMessage: (content: string) => Promise<void>;
    isAssistantReplying: boolean;
    isChatOpen: boolean;
    setChatOpen: (isOpen: boolean) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const initialMessages: Message[] = [
    {
        id: '1',
        content: "Hello! I am your Kisan Sahayak assistant. How can I help you with your farm today? You can ask me about crop diseases, fertilizer, weather, or anything else.",
        role: 'assistant'
    }
];

export function ChatProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [isChatOpen, setChatOpen] = useState(false);
    const [isAssistantReplying, setAssistantReplying] = useState(false);
    const { language } = useLanguage();

    const addMessage = async (content: string) => {
        setAssistantReplying(true);
        const newMessage: Message = {
            id: String(Date.now()),
            content,
            role: 'user'
        };
        setMessages(prev => [...prev, newMessage]);

        try {
            const result: MultilingualAgronomyAssistanceOutput = await multilingualAgronomyAssistance({
                query: content,
                preferredLanguage: language
            });

            const assistantMessage: Message = {
                id: String(Date.now() + 1),
                content: result.advice,
                role: 'assistant'
            };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Error getting response from AI assistant", error);
            const errorMessage: Message = {
                id: String(Date.now() + 1),
                content: "Sorry, I encountered an error. Please try again.",
                role: 'assistant'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setAssistantReplying(false);
        }
    };

    const value = useMemo(() => ({
        messages,
        addMessage,
        isAssistantReplying,
        isChatOpen,
        setChatOpen,
    }), [messages, isAssistantReplying, isChatOpen]);

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
}
