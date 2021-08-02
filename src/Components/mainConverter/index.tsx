import React, {FC, useState} from "react";

import { Card, Input, Select, Button } from 'antd';
import {SwapOutlined} from '@ant-design/icons';

import "./style.scss";

import {getRate} from "../../Utils/getRate";

const { Option } = Select;



export const MainConverter:FC = () => {

    const [state, setState] = useState({inpValue: 250, inpCurrency: 'USD - United States dollar', outCurrency: 'EUR - Euro', outValue: 0, currenciesList: ["AED - Emirates Dirham", "AFN - Afghan afghani", "ALL - Albanian lek", "AMD - Armenian dram","ANG - Dutch guilder","AOA - Angolan kwanza","ARS - Argentine peso","AUD - Australian dollar","AWG - Aruban florin","AZN - Azerbaijani manat","BAM - Bosnian Convertible Mark","BBD - Bajan dollar","BCH - Bitcoin Cash","BDT - Bangladeshi taka","BGN - Bulgarian lev","BHD - Bahraini dinar","BIF - Burundian Franc","BMD - Bermudan dollar","BND - Brunei dollar","BOB - Bolivian boliviano","BRL - Brazilian real","BSD - Bahamian dollar","BTC - Bitcoin","BTN - Bhutan currency","BWP - Botswanan Pula","BYR - Belarusian ruble","BZD - Belize dollar","CAD - Canadian dollar","CDF - Congolese franc","CHF - Swiss franc","CLF - Chilean Unit of Account (UF)","CLP - Chilean peso","CNH - Chinese Yuan (offshore)","CNY - Chinese Yuan","COP - Colombian peso","CRC - Costa Rican Colón","CUP - Cuban Peso","CVE - Cape Verdean escudo","CZK - Czech koruna","DJF - Djiboutian franc","DKK - Danish krone","DOP - Dominican peso","DZD - Algerian dinar","EGP - Egyptian pound","ETB - Ethiopian birr","ETH - Ether","EUR - Euro","FJD - Fijian dollar","GBP - Pound sterling","GEL - Georgian lari","GHS - Ghanaian cedi","GMD - Gambian dalasi","GNF - Guinean franc","GQE - Central African CFA franc","GTQ - Guatemalan quetzal","GYD - Guyanaese Dollar","HKD - Hong Kong dollar","HNL - Honduran lempira","HRK - Croatian kuna","HTG - Haitian gourde","HUF - Hungarian forint","IDR - Indonesian rupiah","ILS - Israeli New Shekel","INR - Indian rupee","IQD - Iraqi dinar","IRR - Iranian rial","ISK - Icelandic króna","JMD - Jamaican dollar","JOD - Jordanian dinar","JPY - Japanese yen","KES - Kenyan shilling","KGS - Kyrgystani Som","KHR - Cambodian riel","KMF - Comorian franc","KPW - North Korean won","KRW - South Korean won","KWD - Kuwaiti dinar","KYD - Cayman Islands dollar","KZT - Kazakhstani tenge","LAK - Laotian Kip","LBP - Lebanese pound","LKR - Sri Lankan rupee","LRD - Liberian dollar","LSL - Lesotho loti","LTC - Litecoin","LYD - Libyan dinar","MAD - Moroccan dirham","MDL - Moldovan leu","MGA - Malagasy ariary","MKD - Macedonian denar","MMK - Myanmar Kyat","MNT - Mongolian tugrik","MOP - Macanese pataca","MRU - Mauritanian Ouguiya (1973–2017)","MUR - Mauritian rupee","MVR - Maldivian rufiyaa","MWK - Malawian kwacha","MXN - Mexican peso","MYR - Malaysian ringgit","MZM - Mozambican metical","MZN - Mozambican Metical","NAD - Namibian dollar","NGN - Nigerian naira","NIO - Nicaraguan córdoba","NOK - Norwegian krone","NPR - Nepalese rupee","NZD - New Zealand dollar","OMR - Omani rial","PAB - Panamanian balboa","PEN - Sol","PGK - Papua New Guinean kina","PHP - Philippine peso","PKR - Pakistani rupee","PLN - Poland złoty","PYG - Paraguayan guarani","QAR - Qatari Rial","RON - Romanian leu","RSD - Serbian dinar","RUB - Russian ruble","RWF - Rwandan Franc","SAR - Saudi riyal","SBD - Solomon Islands dollar","SCR - Seychellois rupee","SDG - Sudanese pound","SEK - Swedish krona","SGD - Singapore dollar","SHP - Saint Helena pound","SLL - Sierra Leonean leone","SOS - Somali shilling","SRD - Surinamese dollar","SVC - Salvadoran Colón","SYP - Syrian pound","SZL - Swazi lilangeni","THB - Thai baht","TJS - Tajikistani somoni","TMT - Turkmenistani manat","TND - Tunisian dinar","TOP - Tongan Paʻanga","TRY - Turkish lira","TTD - Trinidad & Tobago Dollar","TWD - New Taiwan dollar","TZS - Tanzanian shilling","UAH - Ukrainian hryvnia","UGX - Ugandan shilling","USD - United States dollar","UYU - Uruguayan peso","UZS - Uzbekistani som","VEF - Sovereign Bolivar","VND - Vietnamese dong","VUV - Vanuatu vatu","XAF - Central African CFA franc","XCD - East Caribbean dollar","XOF - West African CFA franc","XPF - CFP franc","YER - Yemeni rial","ZAR - South African rand","ZMW - Zambian Kwacha"]});

    function onChangeInput(e: any) {
        setState({...state, inpValue:e.target.value})
    }

    function onChangeSel1(value:string) {
        setState({...state,inpCurrency: value});
    }

    function onClickSwap() {
        const s1 = state.inpCurrency;
        const s2 = state.outCurrency;
        setState({...state,inpCurrency: s2,outCurrency: s1});

    }

    function onChangeSel2(value:string) {
        setState({...state,outCurrency: value})
    }

    function submit() {
        getRate(state).then(res => {
            let rate: any = Object.values(res)[1];

            setState({...state, outValue: state.inpValue * rate});
            console.log(state);
        });
    }

    return (
      <>
          <Card className='mainConverter'>
              <Input onChange={onChangeInput} value={state.inpValue} placeholder="Amount" className='mainConverter_Input'/>
              <Select
                  placeholder='Currency'
                  showSearch
                  className='mainConverter_Select'
                  optionFilterProp="children"
                  onChange={onChangeSel1}
                  value={state.inpCurrency}
                  defaultValue='USD - United States dollar'
                  filterOption={(input, option) =>
                      option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
              >
                  {state.currenciesList.map(el => <Option key={el} value={el}>{el}</Option>)}
              </Select>
              <button onClick={onClickSwap} className='mainConverter_Swap'><SwapOutlined /></button>
              <Select
                  id='secSel'
                  placeholder='Currency'
                  showSearch
                  value={state.outCurrency}
                  className='mainConverter_Select'
                  optionFilterProp="children"
                  onChange={onChangeSel2}
                  defaultValue='EUR - Euro'
                  filterOption={(input, option) =>
                      option!.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
              >
                  {state.currenciesList.map(el => <Option key={el} value={el}>{el}</Option>)}
              </Select>
              <Input disabled value={state.outValue} className='mainConverter_Output'/>
              <Button onClick={submit} className='mainConverter_Btn' type="primary">Convert!</Button>
          </Card>
      </>
    );
}