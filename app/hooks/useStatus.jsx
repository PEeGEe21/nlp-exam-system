"use client"

import { useState, useEffect, useRef } from "react"

export function useStatus(record) {
    const [status, setStatus] = useState('');
    const intervalRef = useRef(null);

    useEffect(() => {
        const getStatus = () => {
        const now = Date.now();
        const start_date = new Date(record?.startDate);
        const end_date = new Date(record?.endDate);

        if (start_date.getTime() <= now && now <= end_date.getTime()) {
            return "In Progress";
        }
        if (now > end_date.getTime()) {
            return "Ended";
        }
        return "Upcoming";
        };

        // Set initial status
        setStatus(getStatus());

        // Update status every second
        intervalRef.current = setInterval(() => {
        setStatus(getStatus());
        }, 1000);

        // Cleanup
        return () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        };
    }, [record]);
  
    return status;
  };
