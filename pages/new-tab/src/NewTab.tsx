import '@src/NewTab.css';
import '@src/NewTab.scss';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import { Button } from '@extension/ui';
import { t } from '@extension/i18n';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCreative } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { PuzzleView } from './components/PuzzleView';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface StorageItem {
  kind: string;
  imgUrl: string;
  name: string;
  timeCreated: string;
}

interface StorageResponse {
  kind: string;
  items: StorageItem[];
}

const NewTab = () => {
  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'light';
  const [slides, setSlides] = useState<{ title: string; description: string; image: string }[]>([]);
  const [selectedImage, setSelectedImage] = useState<{ title: string; description: string; image: string } | null>(
    null,
  );

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://storage.googleapis.com/storage/v1/b/everyday-wallpaper/o');
        const data: StorageResponse = await response.json();

        const newSlides = data.items.map(item => ({
          title: item.name.replace(/\.[^/.]+$/, ''), // Remove file extension
          description: new Date(item.timeCreated).toLocaleDateString(),
          image: `https://storage.googleapis.com/everyday-wallpaper/${item.name}`,
        }));

        setSlides(newSlides);
      } catch (error) {
        console.error('Error fetching images:', error);
        // Fallback to default slides if fetch fails
        setSlides([
          {
            title: 'Error Loading Images',
            description: 'Please try again later',
            image: 'https://placehold.co/600x400/ff0000/ffffff',
          },
        ]);
      }
    };

    fetchImages();
  }, []);

  if (selectedImage) {
    return (
      <PuzzleView
        imageUrl={selectedImage.image}
        title={selectedImage.title}
        description={selectedImage.description}
        theme={theme}
        onBack={() => setSelectedImage(null)}
      />
    );
  }

  return (
    <div className={`App ${isLight ? 'bg-slate-50' : 'bg-gray-800'}`}>
      <header className={`App-header ${isLight ? 'text-gray-900' : 'text-gray-100'}`}>
        <div className="w-full max-w-3xl mx-auto px-4 my-8">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCreative]}
            grabCursor={true}
            effect={'creative'}
            creativeEffect={{
              prev: {
                shadow: true,
                translate: [0, 0, -400],
              },
              next: {
                translate: ['100%', 0, 0],
              },
            }}
            navigation
            className="rounded-xl overflow-hidden shadow-xl">
            {slides.map((slide, index) => (
              <SwiperSlide key={index} onClick={() => setSelectedImage(slide)}>
                <div className="relative h-[500px] cursor-pointer">
                  <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                    <h3 className="text-lg font-semibold">{slide.title}</h3>
                    <p className="text-sm opacity-80">{slide.description}</p>
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
