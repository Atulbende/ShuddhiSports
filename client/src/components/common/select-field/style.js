export const colourStyles = {
    menuList: styles => ({
      ...styles,
      background: 'var(--bg-color)!important;',
      color:'var(--color)!important;',
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      background: isFocused
        ? 'var(--input-focus)!important;'
        : isSelected
          ? 'var(--input-focus)!important;'
          : undefined,
      color: isFocused
          ? 'var(--input-focus-color)!important;'
          : isSelected
            ? 'var(--input-focus-color)!important;'
            : undefined,
            cursor:' pointer;',
      zIndex: 1,
    }),
    menu: base => ({
      ...base,
      zIndex: 100,
    }),
  }