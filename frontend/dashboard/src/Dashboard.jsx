import React, { useState } from 'react';
import axios from 'axios';
import { Upload, Link as LinkIcon, Settings, MessageSquare, Copy, Check, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = ({ apiBaseUrl = 'http://localhost:8000' }) => {
    const [activeTab, setActiveTab] = useState('data');
    const [url, setUrl] = useState('');
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [copied, setCopied] = useState(false);

    // Bot Config
    const [botName, setBotName] = useState('AI Assistant');
    const [greeting, setGreeting] = useState('Hello! How can I help you today?');
    const [primaryColor, setPrimaryColor] = useState('#2563eb');

    const handleUrlIngest = async () => {
        if (!url) return;
        setStatus({ type: 'info', message: 'Ingesting URL...' });
        try {
            const formData = new FormData();
            formData.append('url', url);
            await axios.post(`${apiBaseUrl}/ingest/url`, formData);
            setStatus({ type: 'success', message: 'URL ingested successfully!' });
            setUrl('');
        } catch (err) {
            setStatus({ type: 'error', message: 'Failed to ingest URL.' });
        }
    };

    const handleFileUpload = async () => {
        if (!file) return;
        setStatus({ type: 'info', message: 'Uploading file...' });
        try {
            const formData = new FormData();
            formData.append('file', file);
            await axios.post(`${apiBaseUrl}/ingest/pdf`, formData);
            setStatus({ type: 'success', message: 'File uploaded and indexed!' });
            setFile(null);
        } catch (err) {
            setStatus({ type: 'error', message: 'Failed to upload file.' });
        }
    };

    const copySnippet = () => {
        const snippet = `<script src="http://your-domain.com/widget.js"></script>`;
        navigator.clipboard.writeText(snippet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex' }}>
            {/* Sidebar */}
            <div style={{ width: '260px', backgroundColor: '#1e293b', color: '#fff', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
                    <ShieldCheck size={32} color="#38bdf8" />
                    <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Chatbot Admin</h1>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button
                        onClick={() => setActiveTab('data')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: 'none',
                            background: activeTab === 'data' ? '#334155' : 'transparent', color: '#fff',
                            borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontSize: '15px'
                        }}
                    >
                        <Upload size={18} /> Knowledge Base
                    </button>
                    <button
                        onClick={() => setActiveTab('config')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: 'none',
                            background: activeTab === 'config' ? '#334155' : 'transparent', color: '#fff',
                            borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontSize: '15px'
                        }}
                    >
                        <Settings size={18} /> Bot Config
                    </button>
                    <button
                        onClick={() => setActiveTab('embed')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: 'none',
                            background: activeTab === 'embed' ? '#334155' : 'transparent', color: '#fff',
                            borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontSize: '15px'
                        }}
                    >
                        <LinkIcon size={18} /> Integration
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                <header style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b' }}>
                        {activeTab === 'data' && 'Knowledge Base'}
                        {activeTab === 'config' && 'Customize Chatbot'}
                        {activeTab === 'embed' && 'Embed Script'}
                    </h2>
                    <p style={{ color: '#64748b', marginTop: '4px' }}>
                        {activeTab === 'data' && 'Add sources of information for your AI assistant.'}
                        {activeTab === 'config' && 'Modify how your chatbot looks and behaves.'}
                        {activeTab === 'embed' && 'Copy the script tag to add the bot to your website.'}
                    </p>
                </header>

                {status.message && (
                    <div style={{
                        padding: '12px 16px', borderRadius: '8px', marginBottom: '24px',
                        backgroundColor: status.type === 'error' ? '#fef2f2' : status.type === 'success' ? '#f0fdf4' : '#eff6ff',
                        color: status.type === 'error' ? '#991b1b' : status.type === 'success' ? '#166534' : '#1e40af',
                        border: `1px solid ${status.type === 'error' ? '#fee2e2' : status.type === 'success' ? '#dcfce7' : '#dbeafe'}`
                    }}>
                        {status.message}
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
                    <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>

                        {activeTab === 'data' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                                <section>
                                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Upload Document (PDF)</h3>
                                    <div style={{
                                        border: '2px dashed #e2e8f0', borderRadius: '12px', padding: '40px',
                                        textAlign: 'center', backgroundColor: '#f8fafc'
                                    }}>
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            onChange={(e) => setFile(e.target.files[0])}
                                            style={{ display: 'none' }}
                                            id="file-upload"
                                        />
                                        <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                                            <Upload size={48} color="#94a3b8" style={{ marginBottom: '16px' }} />
                                            <p style={{ fontWeight: '500', color: '#475569' }}>
                                                {file ? file.name : 'Click to select a PDF file'}
                                            </p>
                                            <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Maximum size 10MB</p>
                                        </label>
                                    </div>
                                    <button
                                        onClick={handleFileUpload}
                                        disabled={!file}
                                        style={{
                                            marginTop: '16px', padding: '10px 24px', backgroundColor: '#2563eb',
                                            color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600',
                                            cursor: file ? 'pointer' : 'not-allowed', opacity: file ? 1 : 0.6
                                        }}
                                    >
                                        Ingest Document
                                    </button>
                                </section>

                                <section>
                                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Fetch from URL</h3>
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <input
                                            type="text"
                                            placeholder="https://example.com/faq"
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                            style={{
                                                flex: 1, padding: '12px', border: '1px solid #e2e8f0',
                                                borderRadius: '8px', outline: 'none'
                                            }}
                                        />
                                        <button
                                            onClick={handleUrlIngest}
                                            style={{
                                                padding: '12px 24px', backgroundColor: '#2563eb', color: '#fff',
                                                border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer'
                                            }}
                                        >
                                            Fetch Content
                                        </button>
                                    </div>
                                </section>
                            </div>
                        )}

                        {activeTab === 'config' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Bot Name</label>
                                    <input
                                        type="text"
                                        value={botName}
                                        onChange={(e) => setBotName(e.target.value)}
                                        style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Greeting Message</label>
                                    <textarea
                                        value={greeting}
                                        onChange={(e) => setGreeting(e.target.value)}
                                        rows={3}
                                        style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Primary Color</label>
                                    <input
                                        type="color"
                                        value={primaryColor}
                                        onChange={(e) => setPrimaryColor(e.target.value)}
                                        style={{ height: '40px', width: '80px', border: 'none', background: 'none', cursor: 'pointer' }}
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'embed' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <p style={{ fontSize: '15px' }}>Paste this script tag before the closing <code>&lt;/body&gt;</code> tag of your website.</p>
                                <div style={{
                                    backgroundColor: '#0f172a', color: '#38bdf8', padding: '20px',
                                    borderRadius: '8px', position: 'relative', fontSize: '14px', fontFamily: 'monospace'
                                }}>
                                    <code>
                                        &lt;script src="http://localhost:8000/widget.js"&gt;&lt;/script&gt;
                                    </code>
                                    <button
                                        onClick={copySnippet}
                                        style={{
                                            position: 'absolute', top: '10px', right: '10px', background: 'none',
                                            border: 'none', color: '#fff', cursor: 'pointer'
                                        }}
                                    >
                                        {copied ? <Check size={18} color="#4ade80" /> : <Copy size={18} />}
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Preview Panel */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#64748b' }}>Live Preview</h3>
                        <div style={{
                            height: '500px', backgroundColor: '#e2e8f0', borderRadius: '12px',
                            position: 'relative', overflow: 'hidden', border: '1px solid #cbd5e1'
                        }}>
                            {/* Fake Website Mockup */}
                            <div style={{ padding: '20px' }}>
                                <div style={{ width: '100px', height: '12px', backgroundColor: '#94a3b8', borderRadius: '6px', marginBottom: '12px' }} />
                                <div style={{ width: '150px', height: '24px', backgroundColor: '#cbd5e1', borderRadius: '12px', marginBottom: '20px' }} />
                                <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', marginBottom: '8px' }} />
                                <div style={{ width: '90%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px' }} />
                            </div>

                            {/* Bot Preview */}
                            <div style={{
                                position: 'absolute', bottom: '20px', right: '20px',
                                backgroundColor: primaryColor, width: '48px', height: '48px',
                                borderRadius: '24px', display: 'flex', alignItems: 'center',
                                justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }}>
                                <MessageSquare color="#fff" size={24} />
                            </div>

                            {/* Opened State Mockup */}
                            {activeTab === 'config' && (
                                <div style={{
                                    position: 'absolute', bottom: '80px', right: '20px', width: '280px',
                                    backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                                    display: 'flex', flexDirection: 'column', overflow: 'hidden'
                                }}>
                                    <div style={{ backgroundColor: primaryColor, color: '#fff', padding: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '20px', height: '20px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifySelf: 'center' }}>
                                            <div style={{ width: '10px', height: '10px', borderRadius: '5px', backgroundColor: '#fff', margin: 'auto' }} />
                                        </div>
                                        <span style={{ fontSize: '14px', fontWeight: '600' }}>{botName}</span>
                                    </div>
                                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <div style={{ backgroundColor: '#f1f5f9', padding: '10px', borderRadius: '8px', fontSize: '13px', alignSelf: 'flex-start' }}>
                                            {greeting}
                                        </div>
                                        <div style={{ backgroundColor: primaryColor, color: '#fff', padding: '10px', borderRadius: '8px', fontSize: '13px', alignSelf: 'flex-end', opacity: 0.8 }}>
                                            How can I help you?
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
