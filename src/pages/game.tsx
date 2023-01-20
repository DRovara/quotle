import Head from 'next/head'
import Image from 'next/image'
import { Inter, Solway } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useRef, useState } from 'react';
import Quote from './quote';
import Guess from './guess';
import Over from './over';

type GameProps = {
    hints: string[],
    solution: string,
    allBooks: string[],
};

export default function Game(props: GameProps) {
    const getCookie = (name: string) => {
        name = name + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return undefined;
    };

    const [firstRender, setFistRender] = useState(true);
    const [step, setStep] = useState(0);
    const [guesses, setGuesses] = useState(["", "", "", "", ""])
    const [won, setWon] = useState(false);
    const input = useRef<HTMLInputElement>(null);
    

    useEffect(() => {
        if(firstRender) {
            let newIndex = 0;
            while(getCookie("g" + newIndex.toString()) != undefined) {
                newIndex++;
            }
            let newGuesses = guesses.map((x) => x);
            for(let i = 0; i < newIndex; i++) {
                const cookie = getCookie("g" + i.toString())!;
                newGuesses[i] = cookie;
                if(cookie.toLowerCase() == props.solution.toLowerCase()) {
                    setWon(true);
                }
            }
            setGuesses(newGuesses);
            setStep(newIndex);

            setFistRender(false);
        }
    }, [firstRender, guesses, props.solution]);


    const setCookie = (name: string, value: string) => {
        const d = new Date();
        d.setHours(24, 0, 0, 0);
        let expires = "expires="+ d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    };

    const submitClick = () => {
        if(step == 5 || won)
            return;
        const val = input.current!.value;
        input.current!.value = "";
        const newGuesses = guesses.map((val) => val);
        newGuesses[step] = val
        setGuesses(newGuesses);
        setCookie("g" + step.toString(), val);
        if(val.toLowerCase() == props.solution.toLowerCase())
            setWon(true);
        setStep(step + 1);
    };
    
    return (
        <div className={styles.container}>
            <div className={styles.contents}>
                <div className={styles.quoteList}>
                    <Quote text={props.hints != undefined ? props.hints[0] : ""} order={0} current={step}/>
                    <Quote text={props.hints != undefined ? props.hints[1] : ""} order={1} current={step}/>
                    <Quote text={props.hints != undefined ? props.hints[2] : ""} order={2} current={step}/>
                    <Quote text={props.hints != undefined ? props.hints[3] : ""} order={3} current={step}/>
                    <Quote text={props.hints != undefined ? props.hints[4] : ""} order={4} current={step}/>
                </div>

                <div className={styles.inputArea}>
                    <input type="text" ref={input} placeholder="Enter a book title!" list="allbooks"/>
                    <datalist id="allbooks">
                    {
                        props.allBooks?.map((name, i) => (
                                <option value={name} key={i}>{name}</option>
                        ))
                    }
                    </datalist>
                    <button onClick={submitClick}>{"SUBMIT"}</button>
                </div>

                <div className={styles.guessList}>
                    <Guess text={guesses[0]} order={0} current={step} solution={props.solution}/>
                    <Guess text={guesses[1]} order={1} current={step} solution={props.solution}/>
                    <Guess text={guesses[2]} order={2} current={step} solution={props.solution}/>
                    <Guess text={guesses[3]} order={3} current={step} solution={props.solution}/>
                    <Guess text={guesses[4]} order={4} current={step} solution={props.solution}/>
                </div>
                <span className={styles.endInfo}>{(5 - step) + " guess" + (step != 4 ? "es " : " ") + "remaining!"}</span>
            </div>
            {
                step == 5 || won ? (
                    <Over solution={props.solution} step={step} won={won} />
                ) : (
                    <div></div>
                )
            }
        </div>
    )
}
