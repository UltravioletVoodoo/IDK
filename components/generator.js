import { useRef, useState } from "react";
import words from "../public/data/words.json";



export default function Generator(props) {
    const { setter } = props;
    const iconRef = useRef(null)


    function getHistoricData() {
        if (window.localStorage.getItem("historicIDK") !== null) {
            return JSON.parse(window.localStorage.getItem("historicIDK"))
        }
        return [];

    }

    function setHistoricData(newData) {
        let data = getHistoricData();
        if (data.length == 3) {
            data.pop(); // remove the last element
        }
        data.unshift(newData); // add the latest element
        window.localStorage.setItem("historicIDK", JSON.stringify(data));
    }


    function choice(collection){
        const index = Math.floor(Math.random() * collection.length);
        return collection[index];
    }

    function generate() {
        let data = getHistoricData();

        function isPresentInData(word) {
            for (let idk of data) {
                if (idk.includes(word)) return true;
            }
            return false;
        }
        
        function pickAdverb() {
            let adverbChoice = choice(words.adverbs);
            if (isPresentInData(adverbChoice))  return pickAdverb();
            return adverbChoice
        }
        
        function pickVerb() {
            let verbChoice = choice(words.verbs);
            if (isPresentInData(verbChoice))  return pickVerb();
            return verbChoice
        }

        function pickNoun() {
            let nounChoice = choice(words.nouns);
            if (isPresentInData(nounChoice))  return pickNoun();
            return nounChoice
        }

        const newData = `${pickAdverb()} ${pickVerb()} ${pickNoun()}`
        setHistoricData(newData);
        return newData;
    }

    function setGeneratedText() {
        rotateIcon()
        setter(generate())
    }

    function rotateIcon() {
        iconRef.current.classList.toggle("rotate");
    }

    return (
        <>
            <div className="generatorContainer">
                <div className="refreshIconContainer" onClick={setGeneratedText}>
                    <img className="refreshIcon" src="/refresh.svg" ref={iconRef}></img>
                    <p className="refreshText">Generate</p>
                </div>
            </div>
            <style jsx>{`
            .generatorContainer {
                position: relative;
                width: 100%;
            }
            .refreshIconContainer {
                position: relative;
                width: 500px;
                left: 50%;
                transform: translateX(-50%);
                opacity: 0.5;
                transition: 0.5s;
                cursor: pointer;
            }
            .refreshIconContainer:hover {
                opacity: 1;
            }
            .refreshIcon {
                width: 100%;
                transition: 1s;
            }
            .refreshText {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                margin: 0;
                font-size: 24px;
            }
            .rotate {
                transform: rotate(180deg);
            }
            `}</style>
        </>
    )
}