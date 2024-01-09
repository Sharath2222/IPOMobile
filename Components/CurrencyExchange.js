// components/CurrencyExchange.js
import React from 'react';
import { View, Text } from 'react-native';

const CurrencyExchange = ({ exchangeData }) => {
  return (
    <View style={{ marginBottom: 10, padding: 10, borderColor: 'gray', borderWidth: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
        {exchangeData.symbol}: {exchangeData.rate}
      </Text>
    </View>
  );
};

export default CurrencyExchange;
