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

const HammerIcon = (props) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <rect x='-1.41421' width='12' height='7.00133' rx='1' transform='matrix(-0.707107 -0.707107 -0.707107 0.707107 20.5858 9.89941)' stroke='currentColor' stroke-width={2}/>
    <path
      opacity='0.4'
      d='M10 14L3 21'
      stroke='currentColor'
      stroke-width={2}
      stroke-linecap='round'
    />
    <path
      opacity='0.4'
      d='M18.5 3.5L20.5 5.5'
      stroke='currentColor'
      stroke-width={2}
      stroke-linecap='round'
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

const MemoryChipIcon = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    fill='none'
    {...props}
  >
    <path
      fill='currentColor'
      d='M3 14h11a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3Z'
      opacity={0.4}
    />
    <rect width={6} height={4} x={5} y={9} fill='currentColor' rx={1} />
    <rect width={6} height={4} x={13} y={9} fill='currentColor' rx={1} />
    <path
      fill='currentColor'
      d='M17 15a1 1 0 0 1 1-1h3v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2Z'
      opacity={0.4}
    />
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M4 8h16v1h2V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v1h2V8Zm0 3H2v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3h-2v3H4v-3Z'
      clipRule='evenodd'
    />
    <path
      fill='currentColor'
      d='M2 11a1 1 0 1 1 2 0H2ZM22 9a1 1 0 1 1-2 0h2Z'
    />
  </svg>
);

const HardDiskIcon = (props) => (
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
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M12 12a2 2 0 1 1 2-2h2a4 4 0 1 0-4 4v-2Z'
      clipRule='evenodd'
      opacity={0.4}
    />
    <path
      fill='currentColor'
      d='M13 13.9v-3.6a.1.1 0 0 1 .18-.06l2.7 3.6a.1.1 0 0 1-.08.16h-2.7a.1.1 0 0 1-.1-.1Z'
    />
    <rect width={8} height={2} x={8} y={16} fill='currentColor' rx={1} />
  </svg>
);

const TimerIcon = (props) => (
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
      d='M12 20a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm0 2a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z'
      clipRule='evenodd'
    />
    <g fill='currentColor' opacity={0.4}>
      <path d='M11 9a1 1 0 1 1 2 0v4a1 1 0 1 1-2 0V9Z' />
      <path d='M14 12a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2h2Z' />
    </g>
    <rect width={6} height={4} x={9} y={2} fill='currentColor' rx={1} />
    <rect
      width={4.685}
      height={2}
      x={18.608}
      y={2.756}
      fill='currentColor'
      rx={1}
      transform='rotate(45.408 18.608 2.756)'
    />
    <rect
      width={2}
      height={4}
      x={19.55}
      y={3.712}
      fill='currentColor'
      rx={1}
      transform='rotate(45.408 19.55 3.712)'
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

const PardonIcon = (props) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M19.2937 14.293C19.6842 13.9024 20.3173 13.9023 20.7079 14.2928C21.0984 14.6833 21.0985 15.3165 20.708 15.707L18.9142 17.5012L20.708 19.2954C21.0985 19.686 21.0985 20.3191 20.7079 20.7096C20.3173 21.1001 19.6842 21.1 19.2937 20.7095L17.5001 18.9156L15.7066 20.7095C15.3161 21.1 14.6829 21.1001 14.2924 20.7096C13.9018 20.3191 13.9017 19.686 14.2922 19.2954L16.086 17.5012L14.2922 15.707C13.9017 15.3165 13.9018 14.6833 14.2924 14.2928C14.6829 13.9023 15.3161 13.9024 15.7066 14.293L17.5001 16.0869L19.2937 14.293Z'
      fill='currentColor'
    />
    <path
      opacity='0.4'
      d='M10.5 13.5L3 21'
      stroke='currentColor'
      stroke-width={2}
      stroke-linecap='round'
    />
    <path
      opacity='0.4'
      d='M18.5 3.5L20.5 5.5'
      stroke='currentColor'
      stroke-width={2}
      stroke-linecap='round'
    />
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M21.842 11.9998C22.3547 11.2235 22.2693 10.1684 21.5858 9.48498L14.5147 2.41391C13.7337 1.63286 12.4674 1.63286 11.6863 2.41391L8.85788 5.24234C8.07683 6.02339 8.07683 7.28972 8.85788 8.07077L12.7869 11.9998H21.842Z'
      fill='currentColor'
    />
  </svg>
);

const SendAndReceiveIcon = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    fill='none'
    {...props}
  >
    <path d='M4 7L8 3L12 7' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'/>
    <path d='M8 16L8 3' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'/>
    <g opacity={0.4}>
      <path d='M12 17L16 21L20 17' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M16 8L16 21' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'/>
    </g>
  </svg>
);

const SendIcon = (props) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
    <rect opacity={0.4} x={6} y={6} width={8} height={2} fill='currentColor'/>
    <rect opacity={0.4} x={6} y={10} width={8} height={2} fill='currentColor'/>
    <circle opacity={0.4} cx={10} cy={16} r={2} fill='currentColor'/>
    <path fillRule='evenodd' clipRule='evenodd' d='M4 4H16V9H18V4C18 2.89543 17.1046 2 16 2H4C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22H14V20H4V4Z' fill='currentColor'/>
    <path d='M15 15L18 12L21 15' stroke='#3B86F8' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'/>
    <path d='M18 13V21' stroke='#3B86F8' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'/>
  </svg>
);

const ReceiveIcon = (props) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
    <rect opacity={0.4} x={7} y={6} width={8} height={2} fill='currentColor'/>
    <rect opacity={0.4} x={7} y={10} width={8} height={2} fill='currentColor'/>
    <circle opacity={0.4} cx={11} cy={16} r={2} fill='currentColor'/>
    <path fillRule='evenodd' clipRule='evenodd' d='M5 4H17V9H19V4C19 2.89543 18.1046 2 17 2H5C3.89543 2 3 2.89543 3 4V20C3 21.1046 3.89543 22 5 22H13V20H5V4Z' fill='black'/>
    <path d='M15 18L18 21L21 18' stroke='#389287' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'/>
    <path d='M18 20V12' stroke='#389287' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'/>
  </svg>
);

export {
  ChartIcon,
  ServerIcon,
  EarthIcon,
  PeopleIcon,
  HammerIcon,
  ConsoleIcon,
  TopBottomArrowIcon,
  CogIcon,
  ComputerChipIcon,
  MemoryChipIcon,
  HardDiskIcon,
  TimerIcon,
  KickIcon,
  BanIcon,
  PardonIcon,
  SendAndReceiveIcon,
  SendIcon,
  ReceiveIcon
};
