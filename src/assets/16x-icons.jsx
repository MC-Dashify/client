const ArrowRightAndLeftIcon = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    {...props}
  >
    <path
      stroke='currentcolor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M3 6h10l-3-3M13 10H3l3 3'
    />
  </svg>
);

const XIcon = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={16}
    height={16}
    fill='none'
    {...props}
  >
    <g
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
    >
      <path d='m3 3 10 10M13 3 3 13' />
    </g>
  </svg>
);

const PlusIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
    <path d="M3 8H13" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 3L8 13" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export { ArrowRightAndLeftIcon, XIcon, PlusIcon };
