// Responsive Avatar component
type AvatarProps = {
  src: string;
  size: string;
  lgSize: string;
  mdSize: string;
};

export const CustomAvatar: React.FC<AvatarProps> = ({
  src,
  size,
  lgSize,
  mdSize,
}) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Profile"
      style={{
        width: size,
        height: size,
        // Add media queries for different screen sizes
        "@media (min-width: 1200px)": {
          width: lgSize,
          height: lgSize,
        },
        "@media (min-width: 768px) and (max-width: 1199px)": {
          width: mdSize,
          height: mdSize,
        },
      }}
    />
  );
};
