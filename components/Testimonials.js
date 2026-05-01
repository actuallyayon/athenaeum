"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    id: 1,
    quote: "Athenaeum has completely transformed how I consume literature. The curated selections are consistently brilliant.",
    author: "Elena R.",
    role: "Literary Critic"
  },
  {
    id: 2,
    quote: "The distraction-free environment and premium typography make digital reading feel as intimate as holding a physical book.",
    author: "Julian M.",
    role: "Professor of Philosophy"
  },
  {
    id: 3,
    quote: "I found rare scientific texts here that were unavailable anywhere else. A true sanctuary for the curious mind.",
    author: "Dr. Sarah K.",
    role: "Research Scientist"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl text-[#111827] mb-4">Reader Testimonials</h2>
        <p className="text-gray-500 font-sans">What our community is saying about the Athenaeum experience.</p>
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full pb-12"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="bg-white p-10 rounded-2xl premium-shadow border border-gray-100 text-center mx-4 my-2">
              <svg className="w-10 h-10 mx-auto text-[#D4AF37] mb-6 opacity-50" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="text-xl md:text-2xl text-gray-700 italic mb-8 font-serif leading-relaxed max-w-3xl mx-auto">
                "{testimonial.quote}"
              </p>
              <div>
                <h4 className="text-base font-semibold text-[#111827] font-sans">{testimonial.author}</h4>
                <p className="text-sm text-gray-500 font-sans">{testimonial.role}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
