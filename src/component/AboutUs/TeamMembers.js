"use client";
import { useRef, useEffect, useState } from "react";

export default function TeamMember({ image, name, role, description }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
  }, []);

  return (
    <div
      ref={ref}
      className={`team-card ${visible ? "visible" : ""}`}
    >
      <img className="avatar" src={image} alt={name} />
      <h3>{name}</h3>
      <p className="role">{role}</p>
      <p className="desc">{description}</p>
    </div>
  );
}
