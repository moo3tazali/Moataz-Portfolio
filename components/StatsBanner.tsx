'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { statsData } from '@/lib/data';

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, {
    duration: 2000,
    bounce: 0,
  });

  const displayValue = useTransform(springValue, (latest) =>
    Math.floor(latest)
  );

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value);
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated, springValue, value]);

  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const unsubscribe = displayValue.on('change', (latest) => {
      setCurrentValue(latest);
    });
    return () => unsubscribe();
  }, [displayValue]);

  return (
    <span ref={ref}>
      {currentValue}
      {suffix}
    </span>
  );
}

export default function StatsBanner() {
  return (
    <section className='w-full max-w-[65rem] mb-16 sm:mb-0'>
      <motion.div
        className='grid grid-cols-2 md:grid-cols-4 gap-4'
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, staggerChildren: 0.1 }}
      >
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.label}
            className='relative overflow-hidden rounded-2xl border border-black/5 bg-white/60 px-4 py-6 text-center backdrop-blur-sm dark:bg-white/5 dark:border-white/10'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12, duration: 0.5 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className='absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 transition-opacity hover:opacity-100' />
            <div className='text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl'>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <div className='mt-1 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 sm:text-sm'>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
