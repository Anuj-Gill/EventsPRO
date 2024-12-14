import { useState, useEffect } from "react";
import { AnimatedTestimonials } from "../ui/animated-testimonials";

import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision";
import { getFeedbacksApi } from "../../api/userApi";

export function AnimatedTestimonialsDemo() {
  const [testimonials, setTestimonials] = useState([])

  const fetchData = async () => {
    try {
      const response = await getFeedbacksApi();
      if (response.status == 200) {
        setTestimonials(response?.data?.feedbacks);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="max-w-6xl mx-auto ">
      <BackgroundBeamsWithCollision >
        <div className="flex flex-col ">
          <p className="text-6xl text-center">Testimonials</p>
          <AnimatedTestimonials testimonials={testimonials} />

        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}
