import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react';

type QuoteProps = {
    text: string,
    order: number,
    current: number,
};

export default function Quote(props: QuoteProps) {
    const text = props.current >= props.order ? props.text : "";
    return (
        <div className={props.current >= props.order ? styles.quoteVisible : styles.quoteHidden} style={{"order": props.order}}>
            {text}
        </div>
    );
}
