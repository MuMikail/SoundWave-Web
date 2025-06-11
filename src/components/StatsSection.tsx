'use client';

import { motion } from 'framer-motion';
import { Users, Music, Headphones, Award } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '2M+',
    label: 'Active Users',
    color: 'text-blue-400'
  },
  {
    icon: Music,
    value: '50K+',
    label: 'Songs Available',
    color: 'text-purple-400'
  },
  {
    icon: Headphones,
    value: '1B+',
    label: 'Hours Streamed',
    color: 'text-green-400'
  },
  {
    icon: Award,
    value: '100+',
    label: 'Awards Won',
    color: 'text-pink-400'
  }
];

export default function StatsSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Trusted by Millions
          </h2>
          <p className="text-gray-300 text-lg">
            Join the liquid music revolution
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-effect rounded-xl p-6 text-center hover:bg-white/10 transition-all"
            >
              <motion.div
                className={`${stat.color} mb-4 flex justify-center`}
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                <stat.icon size={40} />
              </motion.div>
              <motion.div
                className="text-3xl font-bold text-white mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-300 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
