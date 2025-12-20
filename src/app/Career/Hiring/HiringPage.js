'use client';

import { useState } from 'react';
import { HeroSection } from '@/component/Hiring/HeroSection';
import { WhyWorkWithUs } from '@/component/Hiring/WhyWorkWithUs';
import { OpenPositions } from '@/component/Hiring/OpenPositions';
import ApplicationForm from '@/component/Hiring/ApplicationForm';


export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState('');

  const handleApplyClick = (position) => {
    if (position) {
      setSelectedPosition(position);
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedPosition('');
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection onApplyClick={() => handleApplyClick()} />
      <WhyWorkWithUs />
      <OpenPositions onApplyClick={handleApplyClick} />
      

      <ApplicationForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        selectedPosition={selectedPosition}
      />
    </div>
  );
}
