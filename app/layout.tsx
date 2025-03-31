import Header from '@/components/Header';
import './globals.css';
import { Inter } from 'next/font/google';
import ActiveSectionContextProvider from '@/context/activeSectionContext';
import { Toaster } from 'react-hot-toast';
import Footer from '@/components/Footer';
import ThemeSwitch from '@/components/ThemeSwitch';
import ThemeContextProvider from '@/context/themeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Moataz | Portfolio',
  description:
    'Frontend Developer with 2 years of experience in building high-performance, scalable web applications using React, Next.js, and TypeScript. Skilled in UI/UX best practices, performance optimization, and modern state management solutions like Redux and Zustand. Procient in TypeScript, ensuring type safety and maintainability across complex projects. Experienced in integrating frontend applications with backend services using Node.js, NestJS, and Prisma. While my core expertise lies in React and Next.js, I actively explore frameworks like SvelteKit, Vue, and Angular, allowing me to adapt quickly to evolving technologies. Successfully transitioned from a ve-year banking career to software development, leveraging strong analytical and problem-solving skills to deliver impactful solutions. Passionate about continuous learning and collaborating with innovative teams in dynamic environments to create efcient and user-centric applications.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='!scroll-smooth'>
      <body
        className={`${inter.className} bg-gray-50 text-gray-950 relative pt-28 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
      >
        <div className='bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]'></div>
        <div className='bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]'></div>
        <ActiveSectionContextProvider>
          <Header />
          <ThemeContextProvider>
            {children}
            <ThemeSwitch />
          </ThemeContextProvider>
          <Footer />
          <Toaster position='top-right' />
        </ActiveSectionContextProvider>
      </body>
    </html>
  );
}
