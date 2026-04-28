'use client';

import { useState, useEffect } from 'react';

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        { src: '/images/resume.jpg', alt: 'AI Resume Builder Banner' },
        { src: '/images/cover_letter.jpg', alt: 'AI Cover Letter Builder Banner' },
        { src: '/images/interview_preparation.jpg', alt: 'AI Interview Preparation Banner' }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 4000); // Change slide every 4 seconds

        return () => clearInterval(timer);
    }, [slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
      <section className="w-full pt-36 md:pt-48 pb-10">
        <div className="container mx-auto px-4">
            <div className="text-center">
                <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-tight">
                    YOUR AI COMPANION FOR
                    <br />
                    PROFESSIONAL SUCCESS
                </h1>
                <p>
                    Build your career with personalised guidance,perfect resume, craft compelling cover letters, 
                    and prepare for interviews with AI-powered tools designed to boost your career.
                </p>
                <div className="mt-8 md:mt-12 relative">
                    <div className="relative overflow-hidden rounded-lg shadow-lg max-w-4xl mx-auto">
                        {slides.map((slide, index) => (
                            <img
                                key={index}
                                src={slide.src}
                                alt={slide.alt}
                                className={`w-full h-auto transition-opacity duration-500 ${
                                    index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'
                                }`}
                            />
                        ))}
                    </div>
                    {/* Slide indicators */}
                    <div className="flex justify-center mt-4 space-x-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${
                                    index === currentSlide ? 'bg-primary' : 'bg-gray-300'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </section>
    );
};

export default HeroSection;
