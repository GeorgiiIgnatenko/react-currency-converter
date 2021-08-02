import React, {FC, useEffect, useState} from "react";

import {List, Spin} from "antd";

import "./style.scss";

import {MainConverter} from "../../Components/mainConverter";

const fetchCurrencies = async () => {
    const url: string = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.min.json";
    return await fetch(url)
        .then(response => response.json())
        .then(data => data)
        .catch(err => err);
}

export const MainPage: FC = () => {

    const [data, setData] = useState({resCode: "INIT", resData: [], isLoading: true, i: 0});

    useEffect(() => {
        fetchCurrencies().then(res => {
            setTimeout(() => {
                if (typeof res.usd !== "undefined") {
                    let newArr = [];

                    for (let el in res.usd) {
                        newArr.push(`USD to ${el.toUpperCase()} : ${res.usd[el]}`);
                    }

                    // @ts-ignore
                    setData({...data,resCode: "OK", resData: newArr, isLoading: false});
                } else {
                    setData({...data,resCode: "ERR", resData: [], isLoading: true});
                }
            },500);
        })
    }, []);

    console.log(data);

    return (
        <div className="mainPage">
            <MainConverter/>
            {data.isLoading ?  <Spin className="mainPage_spin" size='large' tip="Loading..."/> : <>
                <List
                    size="large"
                    bordered
                    dataSource={data.resData}
                    renderItem={item => <List.Item key={data.i++}>{item}</List.Item>}
                    className="mainPage_list"
                />
            </>}
        </div>
    )
};
