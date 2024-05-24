"use client"
import { motion } from "framer-motion"

import Link from "next/link"
export default function CategoryCard({ name, index, slug, emoji }) {
    return (
        <motion.div
            key={slug}
            initial={{ opacity: 0, scale: .6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={
                {
                    duration: 0.5,
                    delay: Number("0." + index)
                }}>
            <Link href={`/quiz/${slug}`} className="card">
                <div className="p-4 bg-gray-200 border-3 rounded-2xl">
                    <span className="capitalize flex items-center gap-4 text-xl font-bold">{emoji}
                        <span>
                            {name}
                        </span>
                    </span>
                </div>
            </Link>
        </motion.div>
    )
}
