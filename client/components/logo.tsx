const LaunchioLogo = ({ size = 28 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Rocket body */}
    <path
      d="M14 2C10.5 4.5 8 8.5 8 13V19.5L14 22.5L20 19.5V13C20 8.5 17.5 4.5 14 2Z"
      className="fill-primary"
    />
    {/* Porthole */}
    <circle
      cx="14"
      cy="12.5"
      r="2.5"
      className="fill-background"
      opacity="0.6"
    />
    {/* Left fin */}
    <path d="M8 17L5 22L8 20.5V17Z" className="fill-primary" opacity="0.7" />
    {/* Right fin */}
    <path d="M20 17L23 22L20 20.5V17Z" className="fill-primary" opacity="0.7" />
    {/* Exhaust flame */}
    <path
      d="M11.5 22.5L10.5 26.5L14 25L17.5 26.5L16.5 22.5"
      fill="orange"
      opacity="0.8"
    />
  </svg>
);

const Logo = ({ size = 28 }: { size?: number }) => (
  <div className="flex items-center gap-2">
    <LaunchioLogo size={size} />
  </div>
);

export default Logo;
