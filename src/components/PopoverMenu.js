import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverArrow,
  Flex,
} from '@chakra-ui/react';

const PopoverMenu = props => {
  return (
    <Popover isLazy trigger="hover" openDelay={0}>
      <PopoverTrigger>{props.children}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <Flex direction="column" py="10px">
          {props.option}
        </Flex>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverMenu;
