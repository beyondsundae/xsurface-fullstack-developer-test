import type { AppProps } from 'next/app';
import { Prompt } from 'next/font/google';
import { ConfigProvider } from 'antd';
import '../app/globals.css';

const promptFont = Prompt({
  weight: ['400', '500', '600', '700'],
  variable: '--font-prompt',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${promptFont.className} ${promptFont.variable}`}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily:
              'var(--font-prompt), system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
          },
        }}
      >
        <Component {...pageProps} />
      </ConfigProvider>
    </div>
  );
}
