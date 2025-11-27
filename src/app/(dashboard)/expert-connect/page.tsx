"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useChat } from "@/context/chat-provider";
import { Phone, Video, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function ExpertConnectPage() {
  const { setChatOpen } = useChat();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <header className="space-y-1.5">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Live Expert Connect</h1>
        <p className="text-muted-foreground">Get personalized help from an agricultural expert.</p>
      </header>
      <div className="flex items-center justify-center py-12">
        <Card className="w-full max-w-lg bg-card/70 backdrop-blur-sm">
            <CardHeader className="text-center">
                <CardTitle>Connect with an Expert</CardTitle>
                <CardDescription>
                    Choose your preferred method to start a conversation with one of our certified agronomists or the AI assistant.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-center justify-center gap-4 p-8">
                <Button size="lg" className="w-full sm:w-auto">
                    <Video className="mr-2 h-5 w-5" /> Video Call
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <Phone className="mr-2 h-5 w-5" /> Audio Call
                </Button>
                <Button size="lg" variant="secondary" className="w-full sm:w-auto" onClick={() => setChatOpen(true)}>
                    <MessageSquare className="mr-2 h-5 w-5" /> Chat with AI
                </Button>
            </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
