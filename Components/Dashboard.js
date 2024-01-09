// components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { View, Text, Button, TextInput, FlatList } from 'react-native';
import CurrencyExchange from './CurrencyExchange';
import IpoDetail from './IpoDetail';

const Dashboard = ({ navigation }) => {
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [allStockSymbols, setAllStockSymbols] = useState([]);
  const [displayedStockSymbols, setDisplayedStockSymbols] = useState([]);
  const [filterByPrice, setFilterByPrice] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [widgets, setWidgets] = useState([
    { id: 1, type: 'Stocks' },
    { id: 2, type: 'News' },
    // Add more default widgets as needed
  ]);
  const [theme, setTheme] = useState('light'); // Default: light
  const [ipoData, setIpoData] = useState([]);
  const [currencyExchangeData, setCurrencyExchangeData] = useState([]);

  useEffect(() => {
    const IEX_CLOUD_API_KEY = 'pk_87a6ca04cd2d4e00b0b081d341197ea1';
    
    const ipoApiUrl = `https://api.iex.cloud/v1/stock/market/upcoming-ipos?token=${IEX_CLOUD_API_KEY}`;
    const exchangeApiUrl = `https://api.iex.cloud/v1/fx/latest?symbols=USDCAD,GBPUSD,USDJPY&token=${IEX_CLOUD_API_KEY}`;

    const fetchStockSymbols = async () => {
      try {
        const symbolsResponse = await axios.get(symbolsApiUrl);
        const symbols = symbolsResponse.data.map((symbolData) => symbolData.symbol);
        setAllStockSymbols(symbols);
        setDisplayedStockSymbols(symbols.slice(0, 20));
      } catch (error) {
        console.error('Error fetching stock symbols:', error);
      }
    };

    const fetchIpoData = async () => {
      try {
        const ipoResponse = await axios.get(ipoApiUrl);
        setIpoData(ipoResponse.data);
      } catch (error) {
        console.error('Error fetching IPO data:', error);
      }
    };

    const fetchCurrencyExchangeData = async () => {
      try {
        const exchangeResponse = await axios.get(exchangeApiUrl);
        console.log(exchangeResponse);
        setCurrencyExchangeData(exchangeResponse.data);
      } catch (error) {
        console.error('Error fetching currency exchange data:', error);
      }
    };

    fetchStockSymbols();
    fetchIpoData();
    fetchCurrencyExchangeData();
  }, []);

  // Rest of the Dashboard code (handleSymbolChange, handlePriceFilterChange, etc.)
  const renderCurrencyExchangeItem = ({ item }) => <CurrencyExchange exchangeData={item} />;


  return (
    <DndProvider backend={HTML5Backend}>
      <View style={{ flex: 1, padding: 20, backgroundColor: theme === 'light' ? '#fff' : '#333' }}>
        {/* ... existing code ... */}
        <FlatList
          data={displayedStockSymbols}
          renderItem={renderCurrencyExchangeItem}
          keyExtractor={(item) => item}
          style={{ marginTop: 10 }}
        />
        <h2>Currency Exchange</h2>
        <FlatList
          data={currencyExchangeData}
          renderItem={({ item }) => <CurrencyExchange exchangeData={item} />}
          keyExtractor={(item) => item.symbol}
          style={{ marginTop: 10 }}
        />
        <h2>Upcoming IPOs</h2>
        <FlatList
          data={ipoData}
          renderItem={({ item }) => <IpoDetail ipo={item} />}
          keyExtractor={(item) => item.symbol}
          style={{ marginTop: 10 }}
        />
      </View>
    </DndProvider>
  );
};

export default Dashboard;
