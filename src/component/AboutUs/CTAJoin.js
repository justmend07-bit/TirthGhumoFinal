"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { finalCTA } from "@/data/AboutUsData";

export default function CTAJoin() {
  return (
    <section className="py-16 px-6 bg-orange-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800">
          {finalCTA.title}
        </h2>

        <p className="text-gray-600 mt-3">{finalCTA.description}</p>

        <Link
          href={finalCTA.button.link}
          className="mt-6 inline-block bg-orange-600 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-700"
        >
          {finalCTA.button.label}
        </Link>
      </motion.div>
    </section>
  );
}
