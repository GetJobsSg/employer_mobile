import React from 'react';
import { Box } from 'native-base';
import { CommonLayout } from 'src/constants/layout';
import { FooterProps } from './footer.props';

const Footer = (props: FooterProps) => {
  const { children } = props;
  return (
    <Box
      borderTopWidth={1}
      borderTopColor="gray.100"
      bg="white"
      safeAreaBottom
      px={CommonLayout.containerX}
      py={2}
      pt={3}
    >
      {children}
    </Box>
  );
};

export default Footer;
