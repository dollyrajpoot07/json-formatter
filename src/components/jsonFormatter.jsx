'use client';
import React, { useState } from 'react';
import styles from './jsonFormatter.module.css'

export default function JsonFormatter() {
    const [thisJson, setThisJson] = useState('');
    const [error, setError] = useState('');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    const formatJson = () => {
        try {
            const parsed = JSON.parse(thisJson);
            const formatted = JSON.stringify(parsed, null, 2);
            setOutput(formatted);
            setError('');
        } catch {
            setError('Invalid JSON');
            setOutput('');
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div>
            <h2>Json Formatter</h2>
            <textarea
                className={styles.textarea}
                type='text'
                placeholder="Enter you Raw Json here"
                value={thisJson}
                rows={10}
                cols={60}
                onChange={(e) => setThisJson(e.target.value)}
            />
            <div className={styles.buttonRow}>
                <button className={styles.formatButton} onClick={formatJson}>
                    Format JSON
                </button>
                {output && (
                    <button className={styles.copyButton} onClick={copyToClipboard}>
                        {copied ? 'Copied!' : 'Copy Output'}
                    </button>
                )}
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <pre className={styles.output}>{output}</pre>
        </div>
    )
}