import type {NextPage} from "next";
import Head from "next/head";
import axios from "axios";
import {useEffect, useState} from "react";
import {HealthRes} from "./api/health";
import {MoistData} from "./api/fetch-moist";
import NumberButton from "../components/NumberButton";
import NumberInput from "../components/NumberInput";
import ActionButton from "../components/ActionButton";
import SectionContainer from "../components/SectionContainer";
import SectionRow from "../components/SectionRow";
import SectionTitle from "../components/SectionTitle";


const Home: NextPage = () => {
    const [waterSuccess, setWaterSuccess] = useState(false);
    const [waterError, setWaterError] = useState(false);
    const [thresholdSuccess, setThresholdSuccess] = useState(false);
    const [thresholdError, setThresholdError] = useState(false);


    const [healthText, setHealthtext] = useState("Checking...");
    const [moist, setMoist] = useState<MoistData[]>([]);
    const [moistText, setMoistText] = useState("Fetching moist...");
    const [waterTimeInMs, setWaterTimeInMs] = useState<number>(1000);
    const [threshold, setThreshold] = useState<number>(40);

    const isHealthy = healthText === "Healthy";


    const filterMoist = (arr: MoistData[]) => {
        return arr.slice(-60);
    }

    async function sendWater() {
        const res = await axios.post(`/api/water`, {
            waterTimeInMs: waterTimeInMs,
        });

        if (res.status == 500) {
            setWaterSuccess(false);
            setWaterError(true);
        }
        if (res.status == 200) {
            setWaterSuccess(true);
            setWaterError(false);
        }
        resetAlert()
        return await res.data;
    }

    async function sendThreshold() {
        const res = await axios.post(`/api/threshold`, {
            threshold: threshold,
        });

        if (res.status == 500) {
            setThresholdSuccess(false);
            setThresholdError(true);
        }
        if (res.status == 200) {
            setThresholdSuccess(true);
            setThresholdError(false);
        }
        resetAlert();
        return await res.data;
    }

    useEffect(() => {

        const fetchHealth = async () => {
            const res = await axios.get<HealthRes>("/api/health");
            const data = await res.data;
            setHealthtext(data.responseText);
        }

        const fetchMoist = async () => {
            const res = await axios.get<MoistData[]>("/api/fetch-moist");
            const data = await res.data;
            data.forEach((i) => {
                i.createdAt = new Date(i.createdAt);
            });
            setMoistText("");
            setMoist(data);
        }
        fetchHealth();
        fetchMoist();
        const interval = setInterval(() => {
            fetchHealth();
            fetchMoist()
        }, 5000);
        return () => clearInterval(interval);
    }, [])

    async function resetAlert() {
        await setTimeout(() => {
            setThresholdSuccess(false);
            setThresholdError(false);
            setWaterSuccess(false);
            setWaterError(false);
        }, 3000)
    }

    return (
        <>
            <Head>
                <title>Robot stuff</title>
                <meta name="description" content="Robot project"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className="mx-auto flex flex-col min-h-screen items-center py-10 bg-neutral-900 text-white">
                <span className={"relative"}>
                    <h1 className={"text-4xl font-bold"}>Water my plants</h1>
                </span>
                <div className={"grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 pt-10 md:pt-20"}>
                    <SectionContainer success={waterSuccess} error={waterError}>
                        <SectionTitle>Water</SectionTitle>
                        <SectionRow><p className={"text-lg font-semibold"}>Time in ms</p></SectionRow>
                        <SectionRow>
                            <NumberButton onClick={() => setWaterTimeInMs(waterTimeInMs - 1)}>-</NumberButton>
                            <NumberInput
                                type={"number"}
                                value={waterTimeInMs}
                                onChange={(e) => setWaterTimeInMs(Number(e.target.value))}
                                className={"appearance-none"}
                            />
                            <NumberButton onClick={() => setWaterTimeInMs(waterTimeInMs + 1)}>+</NumberButton>
                        </SectionRow>
                        <ActionButton
                            onClick={() => sendWater()}>
                            Water
                        </ActionButton>
                        <p className={"text-2xl"}>{waterSuccess}</p>
                    </SectionContainer>

                    <SectionContainer success={thresholdSuccess} error={thresholdError}>
                        <SectionTitle>Threshold</SectionTitle>
                        <SectionRow>
                            <p className={"text-lg font-semibold"}>Set new auto threshold</p>
                        </SectionRow>
                        <SectionRow>
                            <NumberButton onClick={() => setThreshold(threshold - 1)}>-</NumberButton>
                            <NumberInput
                                type={"number"}
                                value={threshold}
                                onChange={(e) => setThreshold(Number(e.target.value))}/>
                            <NumberButton onClick={() => setThreshold(threshold + 1)}>+</NumberButton>
                        </SectionRow>
                        <ActionButton
                            className={"p-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold"}
                            onClick={() => sendThreshold()}>
                            Update
                        </ActionButton>
                        <p className={"text-2xl"}>{thresholdSuccess}</p>
                    </SectionContainer>
                    <SectionContainer success={isHealthy} error={!isHealthy}>
                        <SectionTitle>Health check:</SectionTitle>
                        <SectionRow>
                            <div className={"flex flex-col items-center"}>
                                <p className={`text-3xl font-bold ${isHealthy ? "text-green-500" : "text-red-600"}`}>{healthText}</p>
                            </div>
                        </SectionRow>
                    </SectionContainer>

                    <SectionContainer>
                        <SectionTitle>Results</SectionTitle>
                            <div className={"w-full flex justify-between items-center py-0.5 px-3 border-b text-xs"}>
                                <p>Moist</p>
                                <p>Date & Time</p>
                            </div>
                        <div className={"h-96 w-full overflow-y-auto"}>
                            {moist ? (filterMoist(moist).reverse().map((m) => (
                                <div key={m.createdAt.toString()}
                                     className={"w-full flex justify-between items-center py-0.5 px-3 hover:bg-neutral-700 border-b border-neutral-700"}>
                                    <p className={"text-xl cursor-default"}>{m.value}</p>
                                    <p className={"text-sm cursor-default"}>{m.createdAt.toLocaleString("da-dk")}</p>
                                </div>
                            ))) : <p>{moistText}</p>}
                        </div>
                    </SectionContainer>
                </div>
            </main>
        </>
    );
};

export default Home