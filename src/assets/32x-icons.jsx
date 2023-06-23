const EyeIcon = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={32}
    height={32}
    fill='none'
    {...props}
  >
    <path
      stroke='currentColor'
      strokeWidth={3}
      d='M16 24.5c-5.895 0-10.8-3.625-12.429-8.5C5.201 11.125 10.105 7.5 16 7.5c5.895 0 10.8 3.625 12.429 8.5-1.63 4.875-6.534 8.5-12.429 8.5Z'
    />
    <circle cx={16} cy={16} r={5} fill='currentColor' />
  </svg>
);

const SlashedEyeIcon = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={32}
    height={32}
    fill='none'
    {...props}
  >
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M20.411 6.64A15.413 15.413 0 0 0 16 6C9.311 6 3.68 10.237 2 16c.627 2.15 1.803 4.087 3.379 5.671L7.5 19.55A10.511 10.511 0 0 1 5.167 16C6.736 12.005 10.914 9 16 9c.652 0 1.288.05 1.907.144l2.504-2.505ZM16.05 11A5 5 0 0 0 11 16.05L16.05 11Zm-.1 10L21 15.95V16a5 5 0 0 1-5.05 5Zm-1.856 1.856c.618.095 1.254.144 1.906.144 5.086 0 9.264-3.005 10.833-7a10.513 10.513 0 0 0-2.334-3.549l2.122-2.122C28.197 11.913 29.373 13.85 30 16c-1.68 5.763-7.311 10-14 10-1.538 0-3.02-.224-4.411-.64l2.505-2.504Z'
      clipRule='evenodd'
      opacity={0.4}
    />
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeWidth={3}
      d='m3.5 28.5 25-25'
    />
  </svg>
);

export { EyeIcon, SlashedEyeIcon };
