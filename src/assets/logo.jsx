/**
 * @param {object} props
 * @param {('black'|'white'|'transparent')} props.background
 * @param {('black'|'white'|'currentColor')} props.foreground
 */
const Logo = ({
  background = 'transparent',
  foreground = 'currentColor',
  ...props
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={20}
      height={20}
      fill='none'
      {...props}
    >
      <rect width={20} height={20} fill={background} rx={4} />
      <path
        fill={foreground}
        fillRule='evenodd'
        d='M15.707 4.293a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1-1.414-1.414l10-10a1 1 0 0 1 1.414 0Z'
        clipRule='evenodd'
      />
      <path
        fill={foreground}
        fillRule='evenodd'
        d='M3 10a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Z'
        clipRule='evenodd'
        opacity={0.4}
      />
      <circle cx={6.5} cy={5.5} r={1.5} fill={foreground} />
      <circle
        cx={13.5}
        cy={14.5}
        r={1.5}
        fill={foreground}
        transform='rotate(180 13.5 14.5)'
      />
    </svg>
  );
};

const Logo80 = ({
  background = 'transparent',
  foreground = 'currentColor',
  ...props
}) => {
  return (
    <svg
      width='80'
      height='80'
      viewBox='0 0 80 80'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='80' height='80' rx='16' fill={background} />
      <path
        d='M20 60L60 20'
        stroke={foreground}
        strokeWidth='8'
        strokeLinecap='round'
      />
      <path
        opacity='0.4'
        d='M16 40L64 40'
        stroke={foreground}
        strokeWidth='8'
        strokeLinecap='round'
      />
      <circle cx='26' cy='22' r='6' fill={foreground} />
      <circle
        cx='54'
        cy='58'
        r='6'
        transform='rotate(180 54 58)'
        fill={foreground}
      />
    </svg>
  );
};

const LogoText = ({ color = 'currentColor', ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={72}
    height={20}
    fill='none'
    {...props}
  >
    <path
      fill={color}
      d='M1.416 15.049v-2.842h3.633c.833 0 1.527-.143 2.08-.43.553-.286.97-.739 1.25-1.357.286-.619.43-1.432.43-2.441 0-1.01-.144-1.827-.43-2.452-.287-.625-.71-1.077-1.27-1.357-.553-.28-1.25-.42-2.09-.42H1.358V.908h3.819c1.432 0 2.672.28 3.72.84a5.707 5.707 0 0 1 2.413 2.441c.56 1.068.84 2.331.84 3.79 0 1.458-.28 2.718-.84 3.779a5.779 5.779 0 0 1-2.413 2.441c-1.048.567-2.288.85-3.72.85h-3.76Zm1.904 0H0V.909h3.32v14.14ZM17.488 15.205c-.8 0-1.523-.208-2.168-.625-.638-.423-1.146-1.042-1.523-1.855-.371-.82-.557-1.813-.557-2.979 0-1.191.192-2.197.576-3.017.384-.82.896-1.43 1.534-1.827a3.948 3.948 0 0 1 2.129-.595c.5 0 .944.081 1.328.244.39.163.71.374.957.635a3.366 3.366 0 0 1 .703 1.074h.078V4.443h3.29V15.05h-3.251v-1.71h-.117l-.059.118a3.112 3.112 0 0 1-.635.889c-.26.254-.582.462-.966.625a3.475 3.475 0 0 1-1.319.234Zm1.114-2.578a1.7 1.7 0 0 0 1.084-.361c.305-.241.537-.576.693-1.006.163-.43.247-.938.254-1.524-.007-.586-.091-1.093-.254-1.523-.156-.43-.388-.759-.694-.986-.299-.228-.66-.342-1.083-.342a1.69 1.69 0 0 0-1.075.351c-.3.228-.53.557-.693.987-.156.43-.234.934-.234 1.513 0 .586.081 1.094.244 1.524.162.43.39.765.683 1.006.3.24.658.361 1.075.361ZM31.878 7.725a1.177 1.177 0 0 0-.508-.84c-.293-.209-.657-.313-1.093-.313-.274 0-.521.04-.743.117a1.24 1.24 0 0 0-.517.313.637.637 0 0 0-.186.478c-.006.215.085.404.274.567.189.156.501.277.937.361l2.022.39c1.054.203 1.836.541 2.343 1.016.515.47.775 1.088.782 1.856 0 .71-.209 1.335-.625 1.875-.41.54-.987.96-1.729 1.26-.736.293-1.579.44-2.53.44-.989 0-1.848-.14-2.577-.42-.723-.28-1.293-.678-1.71-1.192-.41-.521-.654-1.136-.732-1.846h3.291c.065.378.251.667.557.87.306.195.703.289 1.191.283a2.5 2.5 0 0 0 .801-.098c.228-.072.404-.176.527-.313a.718.718 0 0 0 .196-.498c-.007-.24-.117-.436-.332-.586-.215-.156-.55-.283-1.006-.38l-1.816-.342c-1.036-.19-1.82-.54-2.354-1.055-.527-.52-.788-1.182-.781-1.982 0-.697.185-1.3.556-1.807.378-.514.918-.905 1.622-1.172.703-.267 1.53-.4 2.48-.4.938 0 1.755.14 2.451.42.697.273 1.237.667 1.621 1.181.39.515.606 1.12.645 1.817h-3.057ZM39.94 15.049h-3.291V.909h3.183v5.458h.108c.247-.65.644-1.155 1.191-1.513.547-.365 1.211-.547 1.992-.547.743 0 1.39.166 1.944.498.56.325.99.787 1.289 1.386.306.6.459 1.296.459 2.09v6.768h-3.291V8.916c0-.397-.069-.739-.205-1.025a1.441 1.441 0 0 0-.606-.655c-.26-.156-.573-.234-.937-.234-.365 0-.684.081-.957.244a1.638 1.638 0 0 0-.645.684c-.156.293-.234.641-.234 1.045v6.074ZM48.695 4.443h3.29V15.05h-3.29V4.443Zm1.64-1.27a1.753 1.753 0 0 1-1.484-.79 1.424 1.424 0 0 1-.234-.791c0-.287.078-.55.234-.791.163-.248.371-.443.625-.586.26-.143.547-.215.86-.215a1.735 1.735 0 0 1 1.474.8c.156.242.234.505.234.792 0 .286-.078.55-.234.79-.156.242-.364.434-.625.577-.26.143-.544.215-.85.215ZM59.862 6.865h-6.777V4.443h6.777v2.422ZM54.54 3.857c0-.787.146-1.451.44-1.992.299-.54.715-.944 1.25-1.21.54-.274 1.18-.41 1.923-.41.371 0 .706.015 1.006.048.3.033.599.081.898.146v2.432c-.3-.02-.54-.042-.722-.068a.808.808 0 0 1-.108.01.32.32 0 0 0-.078-.01c-.436.006-.765.1-.986.283-.221.176-.332.456-.332.84v11.123H54.54V3.857ZM63.168 19.033c-.8-.013-1.35-.032-1.65-.058v-2.5c.286.02.719.032 1.298.039.209 0 .388-.02.537-.059a.775.775 0 0 0 .391-.215c.117-.104.221-.267.313-.488l.136-.332-3.779-10.977h3.438l2.011 7.608h.118l2.021-7.608h3.467l-4.014 11.641c-.325.938-.827 1.66-1.504 2.168-.677.514-1.605.775-2.783.781Z'
    />
    <path
      fill={color}
      d='M0 17.75c0-.69.56-1.25 1.25-1.25H59V19H1.25C.56 19 0 18.44 0 17.75Z'
      opacity={0.2}
    />
  </svg>
);

const FullLogo = ({
  logoBackground = '#343434',
  logoForeground = 'white',
  color = 'currentColor',
  ...props
}) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' {...props}>
    <path
      fill={logoBackground}
      d='M0 8a8 8 0 0 1 8-8h24a8 8 0 0 1 8 8v24a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8Z'
    />
    <path
      fill={logoForeground}
      fillRule='evenodd'
      d='M31.414 8.586a2 2 0 0 1 0 2.828l-20 20a2 2 0 1 1-2.828-2.828l20-20a2 2 0 0 1 2.828 0Z'
      clipRule='evenodd'
    />
    <path
      fill={logoForeground}
      fillRule='evenodd'
      d='M6 20a2 2 0 0 1 2-2h24a2 2 0 1 1 0 4H8a2 2 0 0 1-2-2Z'
      clipRule='evenodd'
      opacity={0.4}
    />
    <path
      fill={logoForeground}
      d='M16 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM24 29a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z'
    />
    <path
      fill={color}
      d='M60.32 34.025v-5.688h7.243c1.662 0 3.044-.286 4.148-.86 1.103-.573 1.934-1.479 2.492-2.716.571-1.238.857-2.867.857-4.887 0-2.02-.286-3.655-.857-4.906-.571-1.25-1.415-2.156-2.531-2.717-1.104-.56-2.493-.84-4.167-.84h-7.302V5.723h7.613c2.856 0 5.33.56 7.42 1.68 2.09 1.122 3.692 2.75 4.809 4.887 1.116 2.137 1.674 4.665 1.674 7.584 0 2.919-.558 5.44-1.674 7.564-1.117 2.124-2.72 3.753-4.81 4.887-2.09 1.133-4.563 1.7-7.419 1.7H60.32Zm3.797 0h-6.62V5.723h6.62v28.302ZM92.367 34.338c-1.597 0-3.038-.417-4.323-1.25-1.272-.848-2.285-2.086-3.038-3.715-.74-1.641-1.11-3.629-1.11-5.961 0-2.385.383-4.398 1.15-6.04.765-1.642 1.784-2.86 3.056-3.655 1.272-.795 2.687-1.192 4.245-1.192 1 0 1.883.163 2.648.489.78.325 1.415.749 1.909 1.27a6.736 6.736 0 0 1 1.402 2.15h.155V12.8h6.562v21.226h-6.484v-3.42h-.233l-.117.234a6.235 6.235 0 0 1-1.266 1.779c-.52.508-1.162.925-1.928 1.25-.766.314-1.642.47-2.628.47Zm2.22-5.16c.83 0 1.55-.241 2.16-.723.611-.482 1.072-1.153 1.383-2.013.325-.86.494-1.877.507-3.05-.013-1.172-.182-2.189-.507-3.049-.311-.86-.772-1.518-1.382-1.974-.597-.456-1.318-.684-2.162-.684-.83 0-1.544.235-2.141.704-.598.456-1.058 1.114-1.383 1.974-.311.86-.467 1.87-.467 3.03 0 1.172.162 2.188.487 3.049.324.86.778 1.53 1.363 2.013.597.482 1.31.723 2.142.723ZM121.059 19.366a2.355 2.355 0 0 0-1.013-1.681c-.584-.417-1.311-.625-2.18-.625-.546 0-1.039.078-1.48.234-.429.143-.773.352-1.032.626-.26.273-.383.592-.37.957-.013.43.169.808.545 1.134.376.313 1 .554 1.869.723l4.031.782c2.103.404 3.661 1.082 4.673 2.033 1.026.938 1.545 2.176 1.558 3.713 0 1.42-.415 2.672-1.246 3.753-.818 1.082-1.967 1.922-3.447 2.522-1.467.586-3.148.88-5.043.88-1.973 0-3.687-.28-5.141-.841-1.441-.56-2.576-1.355-3.407-2.385-.818-1.042-1.305-2.274-1.461-3.694h6.562c.13.756.5 1.336 1.11 1.74.61.39 1.402.58 2.376.566.61.013 1.142-.052 1.597-.195.454-.143.805-.352 1.051-.625.26-.287.39-.62.39-.997-.013-.483-.234-.873-.662-1.173-.429-.313-1.097-.567-2.006-.762l-3.622-.684c-2.064-.378-3.628-1.082-4.693-2.111-1.051-1.043-1.57-2.366-1.557-3.968 0-1.395.37-2.6 1.11-3.616.752-1.03 1.83-1.812 3.232-2.346 1.402-.534 3.05-.801 4.946-.801 1.869 0 3.498.28 4.887.84 1.389.548 2.467 1.336 3.233 2.365.778 1.03 1.207 2.242 1.285 3.636h-6.095ZM137.134 34.025h-6.563V5.723h6.348v10.926h.215c.493-1.303 1.285-2.313 2.375-3.03 1.091-.73 2.415-1.094 3.972-1.094 1.48 0 2.772.332 3.875.997 1.117.651 1.973 1.576 2.571 2.775.61 1.2.915 2.593.915 4.183v13.545h-6.562V21.751c0-.795-.137-1.48-.409-2.053a2.883 2.883 0 0 0-1.207-1.31c-.52-.312-1.143-.468-1.87-.468-.727 0-1.363.162-1.908.488a3.269 3.269 0 0 0-1.285 1.368c-.312.587-.467 1.284-.467 2.092v12.157ZM154.591 12.799h6.562v21.226h-6.562V12.8Zm3.271-2.541a3.49 3.49 0 0 1-1.714-.43 3.657 3.657 0 0 1-1.246-1.154 2.863 2.863 0 0 1-.467-1.583c0-.573.156-1.1.467-1.583a3.59 3.59 0 0 1 1.246-1.173 3.49 3.49 0 0 1 1.714-.43c.61 0 1.175.144 1.694.43a3.37 3.37 0 0 1 1.246 1.173c.312.482.467 1.01.467 1.583 0 .574-.155 1.101-.467 1.583a3.428 3.428 0 0 1-1.246 1.154 3.447 3.447 0 0 1-1.694.43ZM176.857 17.646h-13.513v-4.847h13.513v4.847Zm-10.612-6.02c0-1.577.292-2.906.876-3.988.597-1.081 1.428-1.889 2.493-2.423 1.077-.547 2.356-.821 3.836-.821.739 0 1.408.032 2.005.098.597.065 1.194.162 1.792.293v4.867a19.568 19.568 0 0 1-1.441-.137c-.091.013-.163.02-.215.02a.626.626 0 0 0-.155-.02c-.87.013-1.526.202-1.967.567-.441.351-.662.912-.662 1.68v22.263h-6.562v-22.4ZM183.449 42c-1.597-.026-2.694-.065-3.291-.117v-5.004c.571.04 1.434.065 2.59.078.415 0 .772-.039 1.071-.117.298-.065.558-.209.779-.43.233-.209.441-.534.623-.977l.272-.665-7.535-21.97h6.854l4.011 15.227h.234l4.03-15.226H200l-8.003 23.298c-.649 1.877-1.649 3.323-2.999 4.34-1.35 1.029-3.2 1.55-5.549 1.563Z'
    />
  </svg>
);

export { Logo, Logo80, LogoText, FullLogo };
