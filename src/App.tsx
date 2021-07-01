import React from 'react';
import { Box, NativeBaseProvider } from 'native-base';

const App = () => (
  <NativeBaseProvider>
    <Box safeArea>Hello world</Box>
  </NativeBaseProvider>
);

export default App;
