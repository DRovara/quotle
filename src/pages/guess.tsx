import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react';

type GuessProps = {
    text: string,
    order: number,
    current: number,
    solution: string,
};

export default function Guess(props: GuessProps) {
    const text = props.text != "" ? props.text : "SKIPPED";
    const correct = props.solution?.toLowerCase() == props.text?.toLowerCase();
    return (
        <div className={props.current > props.order ? styles.guessVisible : styles.guessHidden} style={{"order": props.order}}>
            <div className={correct ? styles.boxCorrect : styles.boxIncorrect}></div>{text}
        </div>
    );
}
