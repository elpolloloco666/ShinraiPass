import '@/styles/globals.css';
import { StateContextProvider } from '@/context';
import { AnimatePresence } from 'framer-motion';

import { Roboto_Condensed } from 'next/font/google';

const roboto_condensed = Roboto_Condensed({
  subsets:['latin'],
  weight:['400']
})

export default function App({ Component, pageProps }) {
  return(
    <StateContextProvider>
      <AnimatePresence  >
      <main className={roboto_condensed.className}>
        <Component {...pageProps} />
      </main>
      </AnimatePresence>
    </StateContextProvider>
  ) 
}
