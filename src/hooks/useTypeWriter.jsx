

import { useState, useEffect } from 'react';

export default function useTypewriter(words, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) {
    const [text, setText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex];


        const determineTypingSpeed = () => {
            if (isDeleting) return deletingSpeed;
            if (!isDeleting && text === currentWord) return pauseTime;
            return typingSpeed;
        };

        const timer = setTimeout(() => {
            if (!isDeleting && text === currentWord) {

                setIsDeleting(true);
            } else if (isDeleting && text === '') {

                setIsDeleting(false);
                setWordIndex((prev) => (prev + 1) % words.length);
            } else {

                const nextText = isDeleting
                    ? currentWord.substring(0, text.length - 1)
                    : currentWord.substring(0, text.length + 1);
                setText(nextText);
            }
        }, determineTypingSpeed());

        return () => clearTimeout(timer);
    }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

    return text;
}