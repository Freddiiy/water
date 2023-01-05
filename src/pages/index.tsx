import type {NextPage} from "next";
import Head from "next/head";
import axios from "axios";
import {useEffect, useState} from "react";
import DatePicker from "react-datepicker"
import {HealthRes} from "./api/health";


const Home: NextPage = () => {
    const [status, setStatus] = useState("");
    const [healthText, setHealthtext] = useState("Updating health...");
    const [date, setDate] = useState<Date | null>(new Date())

    async function sendWater(date: Date) {
        const res = await axios.post(`/api/water`);
        if (res.status == 500) {
            setStatus("ERROR!!!!!");
        }
        if (res.status == 200) {
            setStatus("Success :)")
        }
        return await res.data;
    }

    useEffect(() => {
        const fetchHealth = async() => {
            const res = await axios.get<HealthRes>("/api/health");
            const data = await res.data;
            setHealthtext(data.responseText);
        }
        fetchHealth();
    }, [])

    return (
        <>
            <Head>
                <title>Robot stuff</title>
                <meta name="description" content="Generated by create-t3-app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className="mx-auto flex flex-col h-screen justify-center items-center">
                <h1 className={"text-4xl font-bold"}>Water my plants g</h1>
                <div className={"flex flex-row"}>
                    <DatePicker selected={date} onChange={(date) => setDate(date)} />
                </div>
                <div>
                    {date ? (
                        <button
                            className={"p-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold"}
                            onClick={() => sendWater(date)}>
                            Water
                        </button>
                    ) : null}
                    <p className={"text-2xl"}>{status}</p>
                </div>

                <div className={"flex flex-col p-5 items-center"}>
                    <h2 className={"text-2xl font-semibold"}>Health check:</h2>
                    <p className={`text-3xl font-bold ${healthText == "Healthy" ? "text-green-500" : "text-red-600"}`}>{healthText}</p>
                </div>
            </main>
        </>
    );
};

export default Home