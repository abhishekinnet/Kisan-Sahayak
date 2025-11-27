"use client";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useChat, type Message } from "@/context/chat-provider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export function ChatPanel() {
    const { isChatOpen, setChatOpen, messages, addMessage, isAssistantReplying } = useChat();
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const content = inputRef.current?.value;
        if (content && content.trim()) {
            addMessage(content);
            inputRef.current.value = "";
        }
    };
    
    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <Sheet open={isChatOpen} onOpenChange={setChatOpen}>
            <SheetContent className="flex flex-col w-full sm:max-w-md p-0">
                <SheetHeader className="p-6 pb-4">
                    <SheetTitle className="flex items-center gap-2"><Bot /> AI Agronomy Assistant</SheetTitle>
                    <SheetDescription>
                        Ask me anything about your farm. I'm here to help!
                    </SheetDescription>
                </SheetHeader>
                <div className="flex-1 overflow-hidden" ref={scrollAreaRef}>
                    <ScrollArea className="h-full">
                        <div className="flex flex-col gap-4 p-6 pt-0">
                            {messages.map((message) => (
                                <ChatMessage key={message.id} message={message} />
                            ))}
                            {isAssistantReplying && <AssistantTypingIndicator />}
                        </div>
                    </ScrollArea>
                </div>
                <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t p-4 bg-background">
                    <Input 
                        ref={inputRef}
                        placeholder="Type your question..."
                        disabled={isAssistantReplying}
                        className="flex-1"
                    />
                    <Button type="submit" size="icon" disabled={isAssistantReplying}>
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
}

function ChatMessage({ message }: { message: Message }) {
    const isUser = message.role === 'user';
    return (
        <div className={cn("flex items-start gap-3", isUser ? "justify-end" : "justify-start")}>
            {!isUser && (
                <Avatar className="h-8 w-8 bg-secondary">
                    <AvatarFallback className="bg-transparent"><Bot className="h-5 w-5 text-primary" /></AvatarFallback>
                </Avatar>
            )}
            <div className={cn("max-w-xs rounded-lg p-3 text-sm break-words", isUser ? "bg-primary text-primary-foreground" : "bg-muted")}>
                {message.content}
            </div>
            {isUser && (
                <Avatar className="h-8 w-8">
                    <AvatarFallback><User className="h-4 w-4"/></AvatarFallback>
                </Avatar>
            )}
        </div>
    );
}

function AssistantTypingIndicator() {
    return (
        <div className="flex items-center gap-3 justify-start">
            <Avatar className="h-8 w-8 bg-secondary">
                <AvatarFallback className="bg-transparent"><Bot className="h-5 w-5 text-primary" /></AvatarFallback>
            </Avatar>
            <div className="max-w-xs rounded-lg p-3 bg-muted flex items-center">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
        </div>
    );
}
