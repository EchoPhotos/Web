'use client';
import { useEffect } from 'react';
import { clarity } from 'react-microsoft-clarity';

export default function Clarity() {
  useEffect(() => {
    if (window.location.href.includes('echophotos.io')) {
      clarity.init('l9xrwqeki0');
    }
  }, []);

  return <div></div>;
}
