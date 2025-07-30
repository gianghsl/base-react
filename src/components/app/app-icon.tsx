export interface AppIconProps extends React.SVGAttributes<SVGSVGElement> {
  src: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}

function AppIcon(props: AppIconProps) {
  const { src, className = "", width = 20, height = width, ...other } = props;

  return (
    <svg width={width} height={height} className={className} {...other}>
      <use href={src} width={width} height={height} />
    </svg>
  );
}

export default AppIcon;
