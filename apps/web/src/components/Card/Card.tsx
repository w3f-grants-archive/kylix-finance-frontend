import {
  FC,
  ComponentType,
  PropsWithChildren,
  SVGProps,
  ReactNode,
} from "react";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

interface Header {
  title?: string;
  icon?: Icon;
  hasIconBackground?: boolean;
  rightComponent?: ReactNode;
  iconColor?: string;
}
interface IconProps {
  icon: Icon;
  iconColor?: string;
}

interface TitleProps {
  title: string;
  hasIconBackground?: boolean;
}

interface Props extends PropsWithChildren, Header {
  className?: string;
}

const IconWithBackground = ({ icon: Icon, iconColor }: IconProps) => (
  <div className="p-2 bg-[#F4FAF9] rounded-lg">
    <Icon
      width="16px"
      height="16px"
      className={`${iconColor ?? "text-primary-500"}`}
    />
  </div>
);

const IconWithoutBackground = ({ icon: Icon, iconColor }: IconProps) => (
  <Icon
    width="16px"
    height="16px"
    className={`${iconColor ?? "text-primary-500"}`}
  />
);

const Title = ({ title, hasIconBackground }: TitleProps) => (
  <p
    className={`font-bold text-sm leading-5 ${hasIconBackground ? "font-medium" : "font-bold"}`}
  >
    {title}
  </p>
);

const Card = ({
  icon: Icon,
  hasIconBackground,
  title,
  children,
  rightComponent: RightComponent,
  className,
  iconColor,
}: Props) => {
  return (
    <div
      className={`shadow-box rounded-lg p-6 bg-white w-full h-full flex flex-col ${className}`}
    >
      <div className="flex justify-between items-center w-full mb-2">
        <div
          className={`flex items-center ${hasIconBackground ? "gap-2" : "gap-1"}`}
        >
          {Icon &&
            (hasIconBackground ? (
              <IconWithBackground icon={Icon} iconColor={iconColor} />
            ) : (
              <IconWithoutBackground icon={Icon} iconColor={iconColor} />
            ))}
          {title && (
            <Title title={title} hasIconBackground={hasIconBackground} />
          )}
        </div>
        {RightComponent}
      </div>
      {children}
    </div>
  );
};

export default Card;
