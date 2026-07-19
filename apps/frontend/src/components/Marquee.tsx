import styles from './Marquee.module.css';

interface MarqueeProps {
  text: string;
  bgColor: string;
  textColor: string;
  lgText: string;
  normalTextSize: string;
  direction?: 'left' | 'right';
}

function Marquee({
  text,
  bgColor,
  textColor,
  lgText,
  normalTextSize,
  direction = 'left',
}: MarqueeProps) {
  const trackClass = direction === 'left' ? styles.trackLeft : styles.trackRight;

  return (
    <div className={`${bgColor} ${textColor} overflow-hidden w-full`}>
      <div className={`flex w-fit whitespace-nowrap ${trackClass} font-medium`}>
        <span className={`${normalTextSize} lg:${lgText} tracking-normal`}>{text}</span>
        <span className={`${normalTextSize} lg:${lgText} tracking-normal`}>{text}</span>
      </div>
    </div>
  );
}

export default Marquee;
