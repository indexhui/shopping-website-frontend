import { Flex, Heading, Grid, GridItem } from '@chakra-ui/react';

import useSpace from '../hooks/useSpace';
import CardProduct from './CardProduct';

const ProductList = props => {
  const { products } = props;
  const { space } = useSpace();
  return (
    <Flex w="100%" justify="center" bg="brown.400" py="50px">
      <Flex w={space} align="center" direction="column">
        <Heading py="32px">RECOMMENDED ITEMS</Heading>
        <Grid w="100%" wrap="wrap" templateColumns="repeat(4, 1fr)" gap={6}>
          {products.map(product => (
            <GridItem key={product.id} w="100%">
              <CardProduct key={product.id} product={product} />
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
};

export default ProductList;
