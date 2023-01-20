import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react';

type OverProps = {
    solution: string,
    step: number,
    won: boolean,
};

export default function Over(props: OverProps) {
    const message = props.won ? "Correct!" : "The correct answer was:" ;
    const [closed, setClosed] = useState(false);

    const close = () => setClosed(true);

    const text = "✍️" + "🟥".repeat(props.step - 1) + (props.won ? "🟩" : "🟥") +  "\nDaily Quotle!";

    const copyToClipboard = (str: string) => {
        var el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        var selected =            
            document.getSelection()!.rangeCount > 0        
            ? document.getSelection()!.getRangeAt(0)     
            : false;
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        if (selected) {                                 
            document.getSelection()!.removeAllRanges();
            document.getSelection()!.addRange(selected);
        }
    };

    const share = () => {
        copyToClipboard(text);
        navigator.clipboard.writeText(text);
        alert("Results copied to clipboard!");
    }

    return (
        <div className={closed ? styles.gameOverClosed : styles.gameOver}>
            <button className={styles.closeButton} onClick={close}>{"x"}</button>
            <div className={styles.gameOverMessage}>
                {message}
            </div>
            <div className={styles.gameOverAnswer}>
                {props.solution}
            </div>
            <button className={styles.shareButton} onClick={share}>SHARE</button>
        </div>
    );
}
