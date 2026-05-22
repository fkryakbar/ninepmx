"use client";

import React from "react";

// Easily configurable social links - update these strings with your actual URLs
const SOCIAL_LINKS = {
  threads: "https://threads.net/@fkryakbar",    // e.g., "https://threads.net/@your-username"
  github: "https://github.com/fkryakbar",     // e.g., "https://github.com/your-github-username"
  instagram: "https://www.instagram.com/fkryakbar/",  // e.g., "https://instagram.com/your-instagram-username"
};

export default function ContactForm() {
  return (
    <div className="glass-panel rounded-xl p-8 md:p-12 text-center border border-card-border space-y-8 max-w-lg mx-auto">
      <div className="space-y-2">
        <h4 className="text-xl md:text-2xl font-extrabold tracking-wide font-sans text-foreground">
          Keep in touch
        </h4>
        <div className="h-0.5 w-12 bg-cyber-orange mx-auto rounded-full"></div>
      </div>

      <div className="flex justify-center items-center gap-6">
        {/* Threads Uplink */}
        <a
          href={SOCIAL_LINKS.threads}
          target="_blank"
          rel="noopener noreferrer"
          title="Threads Node"
          className="flex items-center justify-center w-16 h-16 rounded-xl border border-card-border bg-black/5 dark:bg-black/25 text-foreground/80 hover:text-cyber-orange hover:border-cyber-orange hover:bg-card hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,85,0,0.25)] transition-all duration-300 group"
        >
          <svg
            aria-label="Threads"
            viewBox="0 0 192 192"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
          >
            <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
          </svg>
        </a>

        {/* GitHub Uplink */}
        <a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub Node"
          className="flex items-center justify-center w-16 h-16 rounded-xl border border-card-border bg-black/5 dark:bg-black/25 text-foreground/80 hover:text-cyber-orange hover:border-cyber-orange hover:bg-card hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,85,0,0.25)] transition-all duration-300 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
            />
          </svg>
        </a>

        {/* Instagram Uplink */}
        <a
          href={SOCIAL_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram Node"
          className="flex items-center justify-center w-16 h-16 rounded-xl border border-card-border bg-black/5 dark:bg-black/25 text-foreground/80 hover:text-cyber-orange hover:border-cyber-orange hover:bg-card hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,85,0,0.25)] transition-all duration-300 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
      </div>

      <div className="font-mono text-[9px] text-foreground/50 tracking-wider">
        ACTIVE_CHANNELS // CONNECTIVITY: SECURE
      </div>
    </div>
  );
}

