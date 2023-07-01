const ChartIcon = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    fill='none'
    {...props}
  >
    <rect
      width={18}
      height={18}
      x={3}
      y={3}
      stroke='currentColor'
      strokeWidth={2}
      rx={3}
    />
    <path
      fill='currentColor'
      d='M12.5 6a5.5 5.5 0 0 1 4.462 8.716L12.5 11.5V6Z'
      opacity={0.4}
    />
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M11 7.023a5.5 5.5 0 1 0 4.967 8.685L11.5 12.5v-.002l-.5-.357V7.023Z'
      clipRule='evenodd'
    />
  </svg>
);

const ServerIcon = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    fill='none'
    {...props}
  >
    <rect
      width={14}
      height={18}
      x={5}
      y={3}
      stroke='currentColor'
      strokeWidth={2}
      rx={1}
    />
    <path fill='currentColor' d='M8 6h8v2H8zM8 10h8v2H8z' opacity={0.4} />
    <circle cx={12} cy={16} r={2} fill='currentColor' />
  </svg>
);

const EarthIcon = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    fill='none'
    {...props}
  >
    <circle cx={12} cy={12} r={9} stroke='currentColor' strokeWidth={2} />
    <mask
      id='a'
      width={20}
      height={20}
      x={2}
      y={2}
      maskUnits='userSpaceOnUse'
      style={{
        maskType: 'alpha'
      }}
    >
      <circle cx={12} cy={12} r={10} fill='#D9D9D9' />
    </mask>
    <g fill='currentColor' mask='url(#a)'>
      <path
        d='M9.369 2.751 9.896.915a1.488 1.488 0 0 1 1.79-1.033l.822.205a2 2 0 0 0 1.508-.224l1.405-.839a2 2 0 0 0 .83-.971l.322-.8A2 2 0 0 1 18.428-4h.473a2 2 0 0 1 1.882 1.324l1.805 5.028a2 2 0 0 1-.42 2.04l-5.131 5.497a1.471 1.471 0 0 1-2.114.04l-.364-.363a1.998 1.998 0 0 0-.385-.3l-1.736-1.035a1.53 1.53 0 0 1-.746-1.314 1.53 1.53 0 0 0-.577-1.198l-1.07-.851a2 2 0 0 1-.676-2.117ZM6.374 9.913l-2.642.072a2 2 0 0 0-.887.235l-1.682.898a2 2 0 0 0-.6 3.037L3.651 17.9a2 2 0 0 0 .712.546l5.907 2.697a1.776 1.776 0 0 0 2.342-.854l.451-.948a1.172 1.172 0 0 0-1.156-1.671 1.172 1.172 0 0 1-1.216-.818l-1.04-3.322a2 2 0 0 0-.188-.423l-1.315-2.216a2 2 0 0 0-1.775-.978ZM13.35 13.78l.006-.03a1.855 1.855 0 0 1 1.314-1.38l.638-.178a2 2 0 0 1 1.348.1l.718.319a1.771 1.771 0 0 1-.72 3.389h-1.528a1.82 1.82 0 0 1-1.776-2.22Z'
        opacity={0.4}
      />
    </g>
  </svg>
);

const PeopleIcon = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    fill='none'
    {...props}
  >
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M12 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm2 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM5 17a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3H5v-3Zm-2 0a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v5H3v-5Z'
      clipRule='evenodd'
    />
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M14 10.874a4 4 0 1 0 0-7.748 4.002 4.002 0 0 1 0 7.748ZM20 22h2v-5a4 4 0 0 0-4-4h-2a4 4 0 0 1 4 4v5Z'
      clipRule='evenodd'
      opacity={0.4}
    />
  </svg>
);

const ConsoleIcon = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    fill='none'
    {...props}
  >
    <rect
      width={18}
      height={18}
      x={3}
      y={3}
      stroke='currentColor'
      strokeWidth={2}
      rx={3}
    />
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M8.405 12 6 9.254 7.496 8 11 12l-3.504 4L6 14.746 8.405 12Z'
      clipRule='evenodd'
    />
    <path fill='currentColor' d='M11 14h6v2h-6z' opacity={0.4} />
  </svg>
);

const TopBottomArrowIcon = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    fill='none'
    {...props}
  >
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='m4 7 4-4 4 4M8 16V3M12 17l4 4 4-4M16 8v13'
    />
  </svg>
);

const CogIcon = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    fill='none'
    {...props}
  >
    <path
      fill='currentColor'
      d='M10 3.5A1.5 1.5 0 0 1 11.5 2h1A1.5 1.5 0 0 1 14 3.5V6h-4V3.5ZM14 20.5a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5V18h4v2.5ZM18.361 6.018a1.5 1.5 0 0 1 2.05.55l.5.865a1.5 1.5 0 0 1-.55 2.05l-2.165 1.25-2-3.465 2.165-1.25ZM5.639 17.982a1.5 1.5 0 0 1-2.05-.549l-.5-.866a1.5 1.5 0 0 1 .55-2.049l2.165-1.25 2 3.464-2.165 1.25ZM20.361 14.518a1.5 1.5 0 0 1 .55 2.05l-.5.865a1.5 1.5 0 0 1-2.05.55l-2.165-1.25 2-3.465 2.165 1.25ZM3.639 9.482a1.5 1.5 0 0 1-.55-2.049l.5-.866a1.5 1.5 0 0 1 2.05-.549l2.165 1.25-2 3.464-2.165-1.25Z'
    />
    <circle cx={12} cy={12} r={5.75} stroke='currentColor' strokeWidth={2.5} />
  </svg>
);

const ComputerChipIcon = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    fill='none'
    {...props}
  >
    <rect
      x={6}
      y={6}
      width={12}
      height={12}
      rx={1}
      stroke='currentColor'
      strokeWidth={2}
    />
    <rect x={8} y={3} width={3} height={4} rx={1} fill='currentColor' />
    <rect x={8} y={17} width={3} height={4} rx={1} fill='currentColor' />
    <rect x={13} y={3} width={3} height={4} rx={1} fill='currentColor' />
    <rect x={13} y={17} width={3} height={4} rx={1} fill='currentColor' />
    <rect
      x={21}
      y={8}
      width={3}
      height={4}
      rx={1}
      transform='rotate(90 21 8)'
      fill='currentColor'
    />
    <rect
      x={7}
      y={8}
      width={3}
      height={4}
      rx={1}
      transform='rotate(90 7 8)'
      fill='currentColor'
    />
    <rect
      x={21}
      y={13}
      width={3}
      height={4}
      rx={1}
      transform='rotate(90 21 13)'
      fill='currentColor'
    />
    <rect
      x={7}
      y={13}
      width={3}
      height={4}
      rx={1}
      transform='rotate(90 7 13)'
      fill='currentColor'
    />
    <rect
      opacity={0.4}
      x={9}
      y={9}
      width={6}
      height={6}
      rx={1}
      fill='currentColor'
    />
  </svg>
);

const KickIcon = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    fill='none'
    {...props}
  >
    <circle
      cx={10}
      cy={7}
      r={3}
      stroke='currentColor'
      strokeWidth={2}
      opacity={0.6}
    />
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M12 15H7a2 2 0 0 0-2 2v3h7v2H3v-5a4 4 0 0 1 4-4h5v2Z'
      clipRule='evenodd'
      opacity={0.6}
    />
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='m20 15-5 5m0-5 5 5'
    />
  </svg>
);

const BanIcon = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    fill='none'
    {...props}
  >
    <circle cx={12} cy={12} r={8} stroke='currentColor' strokeWidth={2} />
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='m7 7 10 10'
      opacity={0.6}
    />
  </svg>
);

export {
  ChartIcon,
  ServerIcon,
  EarthIcon,
  PeopleIcon,
  ConsoleIcon,
  TopBottomArrowIcon,
  CogIcon,
  ComputerChipIcon,
  KickIcon,
  BanIcon
};
