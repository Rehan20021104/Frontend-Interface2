import React, { useEffect, useState } from 'react';
import { ArrowRight, Menu, Waves, ChevronUp, ChevronDown } from 'lucide-react';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80'
  ];

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1
    });

    document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
      observer.observe(el);
    });

    // Auto-advance slider
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Waves className="h-8 w-8" />
            <button className="flex items-center gap-2 text-sm">
              <Menu className="h-5 w-5" />
              explore
            </button>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-black hover:text-gray-600">Home</a>
            <a href="#" className="text-gray-500 hover:text-gray-600">Projects</a>
            <a href="#" className="text-gray-500 hover:text-gray-600">About us</a>
            <a href="#" className="text-gray-500 hover:text-gray-600">Blog</a>
            <button className="px-6 py-2 border border-black rounded-full hover:bg-black hover:text-white transition-colors">
              Contact us
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="fade-in">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Creative Landscaping you can rely on
              </h1>
              <p className="text-gray-600 mb-8 text-lg">
                Our creative landscape solutions create an aesthetically stunning garden or lawn design and inspire you to create magical moments that you will cherish!
              </p>
              <button className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2 mx-auto">
                Order a project
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Image Slider Section */}
      <section className="slider-section">
        <div className="slider-container">
          <div className="slider-controls">
            <div className="slider-arrows">
              <button className="slider-arrow" onClick={prevSlide}>
                <ChevronUp className="h-5 w-5" />
              </button>
              <button className="slider-arrow" onClick={nextSlide}>
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>
            <div className="slider-dots">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
          <div className="slider">
            {slides.map((slide, index) => (
              <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
                <img src={slide} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 fade-in">Our services</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-orange-500 p-8 rounded-lg fade-in">
              <Waves className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-4">Lighting design</h3>
              <p className="text-sm opacity-80">Professional outdoor lighting solutions to enhance your garden's ambiance and security.</p>
            </div>
            {['Garden maintenance', 'Landscaping', 'Engineering works'].map((service, index) => (
              <div key={service} className="group relative overflow-hidden rounded-lg fade-in">
                <img 
                  src={`https://images.unsplash.com/photo-${index + 1}?auto=format&fit=crop&q=80`}
                  alt={service}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-end p-6">
                  <h3 className="text-xl font-bold">{service}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-12 fade-in">A few nice words</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((testimonial) => (
              <div key={testimonial} className="bg-gray-50 p-6 rounded-lg fade-in">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={`https://i.pravatar.cc/150?img=${testimonial}`}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-bold">John Doe</h4>
                    <p className="text-sm text-gray-500">2 months ago</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Exceptional service! They transformed our backyard into a stunning oasis. Highly recommended!"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="fade-in">
              <Waves className="h-8 w-8 mb-4" />
              <p className="text-gray-400">Creating beautiful outdoor spaces since 2010</p>
            </div>
            {['Menu', 'Services', 'Connect'].map((column) => (
              <div key={column} className="fade-in">
                <h3 className="font-bold mb-4">{column}</h3>
                <ul className="space-y-2 text-gray-400">
                  {[1, 2, 3, 4].map((item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-white transition-colors">
                        Link {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;