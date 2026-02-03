import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatWidget = ({ apiBaseUrl = 'http://localhost:8000' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', content: 'Hello! How can I help you today?' },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('question', input);

            const response = await axios.post(`${apiBaseUrl}/chat`, formData);

            const botMessage = { role: 'bot', content: response.data.answer };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage = {
                role: 'bot',
                content: 'Sorry, I am having trouble connecting to my brain. Please try again later.'
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chatbot-widget-container" style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 9999,
            fontFamily: 'sans-serif'
        }}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        style={{
                            width: '350px',
                            height: '500px',
                            backgroundColor: '#fff',
                            borderRadius: '12px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            marginBottom: '15px'
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            backgroundColor: '#2563eb',
                            color: '#fff',
                            padding: '16px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Bot size={24} />
                                <span style={{ fontWeight: '600' }}>AI Assistant</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div style={{
                            flex: 1,
                            padding: '16px',
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px'
                        }}>
                            {messages.map((msg, i) => (
                                <div key={i} style={{
                                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                    maxWidth: '80%',
                                    padding: '10px 14px',
                                    borderRadius: '12px',
                                    backgroundColor: msg.role === 'user' ? '#2563eb' : '#f3f4f6',
                                    color: msg.role === 'user' ? '#fff' : '#1f2937',
                                    fontSize: '14px',
                                    lineHeight: '1.4'
                                }}>
                                    {msg.content}
                                </div>
                            ))}
                            {isLoading && (
                                <div style={{ alignSelf: 'flex-start', padding: '10px 14px', borderRadius: '12px', backgroundColor: '#f3f4f6', color: '#6b7280', fontSize: '14px' }}>
                                    Thinking...
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '8px' }}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type a message..."
                                style={{
                                    flex: 1,
                                    padding: '8px 12px',
                                    borderRadius: '6px',
                                    border: '1px solid #d1d5db',
                                    outline: 'none',
                                    fontSize: '14px'
                                }}
                            />
                            <button
                                onClick={handleSend}
                                disabled={isLoading}
                                style={{
                                    backgroundColor: '#2563eb',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '8px',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bubble Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '30px',
                    backgroundColor: '#2563eb',
                    color: '#fff',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 'auto'
                }}
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </button>
        </div>
    );
};

export default ChatWidget;
