import '@src/NewTab.css';
import '@src/NewTab.scss';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import { Button } from '@extension/ui';
import { t } from '@extension/i18n';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const NewTab = () => {
  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'light';

  const slides = [
    {
      title: 'Welcome to Chrome Extension',
      description: 'A powerful boilerplate for your next chrome extension',
      image: 'https://placehold.co/600x400/2563eb/ffffff',
    },
    {
      title: 'Built with React & Vite',
      description: 'Modern tools for modern development',
      image: 'https://placehold.co/600x400/22c55e/ffffff',
    },
    {
      title: 'Easy to Customize',
      description: 'Modify and extend as you need',
      image: 'https://placehold.co/600x400/9333ea/ffffff',
    },
  ];

  return (
    <div className={`App ${isLight ? 'bg-slate-50' : 'bg-gray-800'}`}>
      <header className={`App-header ${isLight ? 'text-gray-900' : 'text-gray-100'}`}>
        <div className="w-full max-w-3xl mx-auto px-4 my-8">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="rounded-xl overflow-hidden shadow-xl">
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-[400px]">
                  <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white p-12">
                    <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>
                    <p className="text-xl">{slide.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <Button className="mt-4" onClick={exampleThemeStorage.toggle} theme={theme}>
          {t('toggleTheme')}
        </Button>
      </header>
    </div>
  );
};

export default withErrorBoundary(withSuspense(NewTab, <div>{t('loading')}</div>), <div> Error Occur </div>);
