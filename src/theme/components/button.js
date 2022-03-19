const Button = {
  // 1. We can update the base styles
  baseStyle: {
    fontWeight: '600', // Normally, it is "semibold"
    bg: 'blue.500',
    color: 'white',
    _hover: {
      bg: 'blue.400',
    },
  },
  // 2. We can add a new button size or extend existing
  sizes: {
    xl: {
      h: '56px',
      fontSize: 'lg',
      px: '32px',
    },
  },
  // 3. We can add a new visual variant
  variants: {
    'with-shadow': {
      bg: 'blue5400',
      boxShadow: '0 0 2px 2px #efdfde',
    },
    // 4. We can override existing variants
    solid: {
      bg: 'blue.500',
      borderRadius: '2px',
      _hover: {
        bg: 'blue.700',
      },
      _active: {
        border: 'none',
      },
    },
  },
};

export default Button;
