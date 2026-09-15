"use client";

import React, { useState, useRef, ChangeEvent, DragEvent } from "react";
import { UploadCloud, CheckCircle2, X, FileText } from "lucide-react";

interface FileUploadProps {
  label?: string;
  sublabel?: string;
  accept?: string;
  value?: File | null;
  onChange: (file: File | null) => void;
  required?: boolean;
  className?: string;
}

export function FileUpload({
  label = "UNGGAH FILE / DOKUMEN",
  sublabel = "Klik atau seret file gambar (JPG, PNG, WEBP) ke area ini",
  accept = "image/png, image/jpeg, image/webp",
  value,
  onChange,
  required = false,
  className = "",
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate image preview whenever value changes
  React.useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      return;
    }

    if (value.type.startsWith("image/")) {
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [value]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      onChange(file);
      e.dataTransfer.clearData();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#666666]">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <span className="text-[10px] text-[#888888] font-medium">Drag & Drop Didukung</span>
        </div>
      )}

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-4 md:p-5 transition-all cursor-pointer text-center group ${
          isDragging
            ? "border-[#121212] bg-[#FAF8F5] scale-[1.01]"
            : value
            ? "border-[#4A6B5D] bg-[#F4F7F5]"
            : "border-[#D1CCC4] bg-[#FAF8F5] hover:border-[#121212] hover:bg-[#F5F2EB]"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />

        {value ? (
          <div className="flex items-center gap-3 text-left">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview File"
                className="w-14 h-14 rounded-xl object-cover border border-[#4A6B5D] shrink-0 shadow-xs"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-[#4A6B5D]/10 text-[#4A6B5D] flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#4A6B5D]">
                <CheckCircle2 className="w-4 h-4 text-[#4A6B5D] shrink-0" />
                <span>File Siap Diunggah</span>
              </div>
              <p className="text-xs font-medium text-[#121212] truncate mt-0.5">
                {value.name}
              </p>
              <p className="text-[10px] text-[#666666] font-mono">
                {formatFileSize(value.size)}
              </p>
            </div>

            <button
              type="button"
              onClick={handleRemove}
              className="p-2 rounded-xl bg-white border border-[#EBE7DF] text-[#666666] hover:text-red-600 hover:bg-red-50 transition-colors shadow-xs"
              title="Hapus / Ganti File"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-2 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#EBE7DF] flex items-center justify-center text-[#121212] shadow-xs group-hover:scale-110 group-hover:bg-[#121212] group-hover:text-white transition-all">
              <UploadCloud className="w-6 h-6" />
            </div>

            <div className="space-y-0.5">
              <p className="text-xs font-bold text-[#121212] tracking-tight">
                <span className="text-[#4A6B5D] underline underline-offset-2 font-extrabold">Klik di sini</span> atau tarik file Anda ke box ini
              </p>
              <p className="text-[11px] text-[#666666]">{sublabel}</p>
            </div>

            <span className="inline-block text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-white border border-[#EBE7DF] rounded-full text-[#121212] shadow-2xs">
              Pilih File Dari Perangkat
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
