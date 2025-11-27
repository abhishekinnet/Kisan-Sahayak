"use client";

import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChat } from "@/context/chat-provider";

export function ChatTrigger() {
    const { setChatOpen, isChatOpen } = useChat();

    return (
        <Button 
            size="icon" 
            className="fixed bottom-6 right-6 z-40 h-16 w-16 rounded-full shadow-lg"
            onClick={() => setChatOpen(!isChatOpen)}
            aria-label="Toggle Chat"
        >
            <MessageSquare className="h-8 w-8" />
        </Button>
    );
}
