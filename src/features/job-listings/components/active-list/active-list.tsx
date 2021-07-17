import React from 'react';
import { ListRenderItem, FlatList, RefreshControl } from 'react-native';
import { Box, Text } from 'native-base';

const ActiveList = () => {
  const renderItem: ListRenderItem<{ id: number; label: string }> = () => (
    <Box p={4} borderRadius={20} my={1} mx={4} bg="gray.100">
      <Text fontSize="sm" fontWeight="bold">
        Kitchen Helper
      </Text>
      <Text fontSize="sm">04:00 - 18:00</Text>
    </Box>
  );

  return (
    <FlatList
      data={[
        { id: 1, label: 'benson1' },
        { id: 2, label: 'benson2' },
        { id: 3, label: 'benson3' },
      ]}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} />}
    />
  );
};

export default ActiveList;
