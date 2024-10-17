// StatsCounter.js

import React, { useState, useEffect } from 'react';

const StatsCounter = () => {
    const [stats, setStats] = useState({
        bookings: 0,
        users: 0,
        servicesProvided: 0,
        vendors: 0
    });

    useEffect(() => {
        // Simulate fetching data (replace with actual data fetching logic if needed)
        const fetchData = () => {
            // Example data (you can fetch from API or static data)
            setTimeout(() => {
                setStats({
                    bookings: 1520,
                    users: 2890,
                    servicesProvided: 4120,
                    vendors: 860
                });
            }, 1000); // Simulating async fetch delay
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Counting animation effect
        const animateCounters = () => {
            const counters = document.querySelectorAll('.timer');
            const speed = 1500;

            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-to');
                    const count = +counter.innerText;

                    // Calculate increment step
                    const increment = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 10); // Adjusted timeout for smoother animation
                    } else {
                        counter.innerText = target;
                    }
                };

                updateCount();
            });
        };

        animateCounters();
    }, [stats]); // Run effect whenever stats change

    return (
        <div className="w3-stats pb-5">
            <div className="container pb-lg-5 pb-md-4 pb-2">
                <div className="row text-center">
                    <div className="col-md-3 col-6">
                        <div className="counter">
                            <div className="timer count-title count-number" data-speed="1500" data-to={stats.bookings}>
                                0
                            </div>
                            <p className="count-text">Bookings</p>
                        </div>
                    </div>
                    <div className="col-md-3 col-6">
                        <div className="counter active">
                            <div className="timer count-title count-number" data-speed="1500" data-to={stats.users}>
                                0
                            </div>
                            <p className="count-text">Users</p>
                        </div>
                    </div>
                    <div className="col-md-3 col-6 mt-md-0 mt-4">
                        <div className="counter">
                            <div className="timer count-title count-number" data-speed="1500" data-to={stats.servicesProvided}>
                                0
                            </div>
                            <p className="count-text">Services Provided</p>
                        </div>
                    </div>
                    <div className="col-md-3 col-6 mt-md-0 mt-4">
                        <div className="counter border-right-0">
                            <div className="timer count-title count-number" data-speed="1500" data-to={stats.vendors}>
                                0
                            </div>
                            <p className="count-text">Vendors</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsCounter;
