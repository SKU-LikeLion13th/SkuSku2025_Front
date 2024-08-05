import React, { useEffect } from 'react';
import Main1 from './Main1';
import Main2 from './Main2';
import Main3 from './Main3';
import Main4 from './Main4';
import Main5 from './Main5';

const Main = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('.snap-section');
    let currentSection = 0;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetIndex = [...sections].indexOf(entry.target);
          if (targetIndex !== currentSection) {
            currentSection = targetIndex;
            window.scrollTo({
              top: entry.target.offsetTop,
              behavior: 'smooth'
            });
          }
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full">
      <Main1 />
      <Main2 />
      <Main3 />
      <div className="container mx-auto">
        <Main4 />
        <Main5 />
      </div>
    </div>
  );
};

export default Main;
