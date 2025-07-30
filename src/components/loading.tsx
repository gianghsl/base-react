import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

const LoadingPage = () => {
  return (
    <div className="flex-1 flex-center">
      <LoaderCircle className="animate-spin text-primary" size={50} />
    </div>
  );
};

const LoadingComponent = ({
  start,
  center,
  size = 20,
}: {
  start?: boolean;
  center?: boolean;
  size?: number;
}) => {
  return (
    <div
      className={cn(
        "flex w-full py-3",
        start && "justify-start",
        center && "justify-center",
      )}
    >
      <LoaderCircle className="animate-spin" size={size} />
    </div>
  );
};

const Spinner = ({
  size = 20,
  className,
}: {
  size?: number;
  className?: string;
}) => {
  return <LoaderCircle className={cn("animate-spin", className)} size={size} />;
};

export { LoadingPage, LoadingComponent, Spinner };
