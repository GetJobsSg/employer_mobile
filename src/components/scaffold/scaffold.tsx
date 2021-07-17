import React from 'react';
import { Box } from 'native-base';
import { node } from 'prop-types';

const Scaffold: React.FC = (props) => {
  const { children } = props;
  return (
    <Box safeArea bg="white" position="relative" h="100%" w="100%" {...props}>
      {children}
    </Box>
  );
};

Scaffold.propTypes = {
  children: node.isRequired,
};

export default Scaffold;
