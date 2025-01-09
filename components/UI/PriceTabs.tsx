import React, { useState } from 'react';
import Card from './Card';

const PlanFeature = ({ feature }) => (
  <li className="mb-2 flex items-center">
    <svg
      className="mr-2 h-4 w-4 text-green-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
    {feature}
  </li>
);

const PricingTab = ({ plan, onSelect, isSelected }) => (
  <Card>
    <div
      className={`h-full overflow-hidden rounded-3xl ${
        plan.name === 'Premium' ? 'ring-4 ring-blue-500' : ''
      }`}
    >
      <div className="p-6">
        <div className="flex flex-row justify-between">
          <h2 className="mb-2 text-2xl font-bold">{plan.name}</h2>
          {plan.badge && (
            <div className="m-1 inline-flex items-center justify-center rounded-full bg-blue-500 px-3 text-sm font-medium text-white">
              {plan.badge}
            </div>
          )}
        </div>
        <p className="mb-4 h-16 text-gray-600">{plan.description}</p>
        <div className="mb-4">
          <span className="text-4xl font-bold">{plan.price}</span>
          <span className="text-gray-500">{plan.period}</span>
        </div>
        <button
          onClick={onSelect}
          className={`w-full rounded-md px-4 py-2 ${
            isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          } transition duration-150 hover:bg-opacity-90`}
        >
          {isSelected ? 'Selected' : 'Select'}
        </button>
      </div>
      <ul className="px-6 pb-6 text-sm font-light">
        {plan.features.map((feature, index) => (
          <PlanFeature key={index} feature={feature} />
        ))}
      </ul>
    </div>
  </Card>
);

const BillingToggle = ({ isMonthly, setIsMonthly }) => (
  <div className="mb-8 flex justify-center">
    <div className="inline-flex rounded-lg bg-gray-200 p-0.5">
      <button
        onClick={() => setIsMonthly(true)}
        className={`rounded-md px-4 py-2 ${
          isMonthly ? 'bg-white text-blue-600 shadow' : 'text-gray-600'
        }`}
      >
        Monthly
      </button>
      <button
        onClick={() => setIsMonthly(false)}
        className={`rounded-md px-4 py-2 ${
          !isMonthly ? 'bg-white text-blue-600 shadow' : 'text-gray-600'
        }`}
      >
        Annually (Save 20%)
      </button>
    </div>
  </div>
);

type Props = {
  onSelectPlan: (input: string) => void;
  selectedPlan: string;
};

export default function PriceTabs({ onSelectPlan, selectedPlan }: Props) {
  const plans = [
    {
      name: 'Free',
      description: 'For small groups and quick photo sharing.',
      price: '$0',
      period: 'forever',
      features: [
        'Up to 20 members',
        'Full resolution storage for 6 month',
        'Eternal free high resolution storage',
        'Comments and likes',
        'Invite members through link and QR code',
        'Free mobile app',
      ],
    },
    {
      name: 'Premium',
      description: 'For big events with many guests and unforgettable memories.',
      price: '$30',
      period: 'per Album',
      features: [
        'Eternal photo and video storage',
        'Unlimited members',
        'Original photo and video file quality',
        'Download links for all photos at once',
        'Ideal for weddings',
      ],
      badge: 'For Events',
    },
  ];

  return (
    <div className="h-full">
      <div className="mx-auto h-full max-w-xl">
        <div className="flex h-full flex-col gap-8 md:flex-row">
          {plans.map((plan) => (
            <PricingTab
              key={plan.name}
              plan={plan}
              isSelected={plan.name == selectedPlan}
              onSelect={() => {
                onSelectPlan(plan.name);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
