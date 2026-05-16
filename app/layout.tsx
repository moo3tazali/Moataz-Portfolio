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
  title: 'Moataz Ali | Senior Power Platform & Dynamics 365 Developer',
  description:
    'Senior Power Platform & Dynamics 365 Developer specializing in enterprise ERP solutions, full-stack web development, and process automation. Expert in D365 CE/FO, Dataverse, NestJS, React/Next.js, and Power Platform. Available for freelance projects on Upwork.',
  keywords: [
    'Dynamics 365 Developer',
    'Power Platform',
    'Dataverse',
    'D365 FO',
    'D365 CE',
    'NestJS Developer',
    'React Developer',
    'Next.js Developer',
    'ERP Integration',
    'Process Automation',
    'Full-Stack Developer',
    'Freelance Developer',
    'Upwork Developer',
  ],
  authors: [{ name: 'Moataz Ali' }],
  openGraph: {
    title: 'Moataz Ali | Senior Power Platform & Dynamics 365 Developer',
    description:
      'Enterprise ERP solutions, D365 customizations, full-stack web apps, and process automation. 4+ enterprise platforms delivered across healthcare, logistics, and finance.',
    type: 'website',
  },
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
