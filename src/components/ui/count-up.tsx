import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CountUpProps {
  value: number;
  duration?: number;
  separator?: string;
  className?: string;
  suffix?: string;
  prefix?: string;
  colorScheme?: "default" | "gradient" | "primary";
}

export const CountUp: React.FC<CountUpProps> = ({
  value,
  duration = 2,
  separator = "",
  className = "",
  suffix = "",
  prefix = "",
  colorScheme = "default",
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const increment = value / (duration * 60);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isVisible, value, duration]);

  const formatNumber = (num: number) => {
    const numStr = num.toString();
    if (!separator) return numStr;
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  };

  const colorClasses = {
    default: "text-foreground",
    gradient: "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
    primary: "text-primary",
  };

  return (
    <span
      ref={ref}
      className={cn("font-bold", colorClasses[colorScheme], className)}
    >
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
};
