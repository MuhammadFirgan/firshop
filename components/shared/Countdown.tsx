'use client'

import { useEffect, useState } from "react"
import { intervalToDuration, isFuture, isPast } from 'date-fns';

interface CountdownProps {
  promotionStartDate?: Date,
  promotionEndDate?: Date
}

export default function Countdown({ promotionStartDate, promotionEndDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    status: 'upcoming' | 'active' | 'ended';
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  }>({
    status: 'ended',
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  if (!promotionStartDate || !promotionEndDate) {
    return null;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      if (isFuture(promotionStartDate)) {
        const difference = intervalToDuration({ start: now, end: promotionStartDate });
        setTimeLeft({
          status: 'upcoming',
          days: String(difference.days).padStart(2, "0"),
          hours: String(difference.hours).padStart(2, "0"),
          minutes: String(difference.minutes).padStart(2, "0"),
          seconds: String(difference.seconds).padStart(2, "0")
        });
      } else if (isFuture(promotionEndDate)) {
        const difference = intervalToDuration({ start: now, end: promotionEndDate });
        setTimeLeft({
          status: 'active',
          days: String(difference.days).padStart(2, "0"),
          hours: String(difference.hours).padStart(2, "0"),
          minutes: String(difference.minutes).padStart(2, "0"),
          seconds: String(difference.seconds).padStart(2, "0")
        });
      } else {
        clearInterval(interval);
        setTimeLeft({
          status: 'ended',
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
        });
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [promotionStartDate, promotionEndDate]);

  if (timeLeft.status === 'ended') {
    return null;
  }

  const timeParts = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <>
      {/* <div>
        <span className="inline-block px-4 py-2 text-sm font-medium bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent border border-orange-500/30 rounded-full backdrop-blur-sm animate-glow ">
          {status === 'upcoming' ? 'Upcoming' : 'Active'}
        </span>
      </div> */}
      <div className="flex gap-4 ">
        {timeParts.map(({ label, value }, idx) => (
          <div
            key={idx}
            className="p-3 bg-white rounded-full aspect-square flex flex-col justify-center items-center"
          >
            
            <span className="text-xl font-bold text-gray-900">{value}</span>
            <span className="text-xs text-gray-900">{label}</span>
          </div>
        ))}
      </div>
    </>
  );
}