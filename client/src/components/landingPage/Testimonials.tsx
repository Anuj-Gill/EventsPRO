import { useState, useEffect } from "react";
import { AnimatedTestimonials } from "../ui/animated-testimonials";
import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision";
import { getFeedbacksApi } from "../../api/userApi";

export function AnimatedTestimonialsDemo() {
  const [testimonials, setTestimonials] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getFeedbacksApi();
      if (response.status === 200) {
        // Filter testimonials to get only high-quality ones (rating 4 or 5)
        const highQualityTestimonials = response?.data?.feedbacks
          .filter(testimonial => testimonial.rating >= 4);

        // Randomly select 5 testimonials, with preference for higher ratings
        const selectedTestimonials = selectRandomTestimonials(highQualityTestimonials, 5);

        setTestimonials(selectedTestimonials);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  }

  // Function to randomly select testimonials with weight towards higher ratings
  const selectRandomTestimonials = (testimonials, count) => {
    if (testimonials.length <= count) return testimonials;

    // Create a weighted array that gives more chances to 5-star ratings
    const weightedTestimonials = testimonials.flatMap(testimonial => {
      // Repeat 5-star testimonials more times to increase their selection probability
      const repeats = testimonial.rating === 5 ? 3 :
        testimonial.rating === 4 ? 2 : 1;
      return Array(repeats).fill(testimonial);
    });

    // Shuffle the weighted array
    const shuffled = weightedTestimonials.sort(() => 0.5 - Math.random());

    // Select unique testimonials
    const selected = [];
    const usedIndices = new Set();

    while (selected.length < count && shuffled.length > 0) {
      const index = Math.floor(Math.random() * shuffled.length);
      const testimonial = shuffled[index];

      if (!usedIndices.has(testimonial.id)) {
        selected.push(testimonial);
        usedIndices.add(testimonial.id);
      }

      // Remove the selected item to avoid duplicates
      shuffled.splice(index, 1);
    }

    return selected;
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="max-w-6xl mx-auto">
      <BackgroundBeamsWithCollision>
        <div className="flex flex-col">
          <p className="text-3xl md:text-5xl text-center">Featured Testimonials</p>
          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}
