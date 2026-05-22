"use client";

import { useState, useRef } from "react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(file: File) {
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload/image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success && data.url) {
        onChange(data.url);
      } else {
        setError(data.error || "Upload failed");
      }
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  }

  return (
    <div className="space-y-2">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-all ${
          dragOver
            ? "border-cyber-cyan bg-cyber-cyan/5"
            : value
            ? "border-cyber-green/30 bg-cyber-green/5"
            : "border-card-border hover:border-foreground/30 bg-card/40"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {uploading ? (
          <div className="space-y-2">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-cyber-cyan border-t-transparent" />
            <p className="font-mono text-xs text-foreground/50">
              UPLOADING...
            </p>
          </div>
        ) : value ? (
          <div className="space-y-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Thumbnail preview"
              className="mx-auto max-h-32 rounded-lg object-cover"
            />
            <p className="font-mono text-[10px] text-foreground/40">
              Click or drag to replace
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-3xl text-foreground/20">⬆</div>
            <p className="font-mono text-xs text-foreground/50">
              Drop image here or click to upload
            </p>
            <p className="font-mono text-[10px] text-foreground/30">
              JPEG, PNG, WebP, GIF, SVG • Max 5MB
            </p>
          </div>
        )}
      </div>

      {error && (
        <p className="font-mono text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
