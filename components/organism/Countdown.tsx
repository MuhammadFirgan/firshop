'use client'

import { useEffect, useState } from "react"



export default function Countdown() {
    const targetTime = new Date("2025-06-30T00:00:00")

    const [timeLeft, setTimeLeft] = useState({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00"
    })

    useEffect(() => {
        const interval = setInterval(() => {
          const now = new Date();
          const difference = targetTime.getTime() - now.getTime();
    
          if (difference <= 0) {
            clearInterval(interval);
            setTimeLeft({
              days: "00",
              hours: "00",
              minutes: "00",
              seconds: "00"
            });
            return;
          }
    
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / 1000 / 60) % 60);
          const seconds = Math.floor((difference / 1000) % 60);
    
          setTimeLeft({
            days: String(days).padStart(2, "0"),
            hours: String(hours).padStart(2, "0"),
            minutes: String(minutes).padStart(2, "0"),
            seconds: String(seconds).padStart(2, "0")
          });
        }, 1000);
    
        return () => clearInterval(interval);
      }, [targetTime]);
  return (
    <div className="flex gap-4">
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Seconds", value: timeLeft.seconds },
      ].map(({ label, value }, idx) => (
        <div
          key={idx}
          className="bg-white rounded-full aspect-square w-16 flex flex-col justify-center items-center"
        >
          <span className="gradient-text font-semibold text-sm">{value}</span>
          <span className="gradient-text text-xs">{label}</span>
        </div>
      ))}
    </div>
  )
}
