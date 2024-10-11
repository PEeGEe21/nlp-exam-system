import { useCallback, useEffect, useState } from "react";
import { calculateCompletionPercentage } from "../lib/utils";

function useCountdown(startDate, endDate) {
  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    // console.log('Now:', now);
    // console.log('Start:', start);
    // console.log('End:', end);

    let difference = 0;
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    // If the current time is between the start and end date
    if (now >= start && now <= end) {
      difference = +end - +now;

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
    }

    return timeLeft;
  }, [startDate, endDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, calculateTimeLeft]);

  return timeLeft;
}
export default useCountdown;


// function useCountdown(targetDate) {
//   const calculateTimeLeft = useCallback(() => {
//     const difference = +new Date(targetDate) - +new Date();
//     let timeLeft = {
//       days: 0,
//       hours: 0,
//       minutes: 0,
//       seconds: 0,
//     };

//     if (difference > 0) {
//       timeLeft = {
//         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//         minutes: Math.floor((difference / 1000 / 60) % 60),
//         seconds: Math.floor((difference / 1000) % 60),
//       };
//     }

//     return timeLeft;
//   }, [targetDate]);

//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [timeLeft, calculateTimeLeft]);

//   return timeLeft;
// }

// export default useCountdown;
