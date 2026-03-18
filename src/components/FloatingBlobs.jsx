import React from 'react';
import './FloatingBlobs.css';

export default function FloatingBlobs() {
  return (
    <div className="floating-blobs" aria-hidden="true">
      {/* Large slow-moving blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="blob blob-4" />
      <div className="blob blob-5" />
      <div className="blob blob-6" />
      <div className="blob blob-7" />
    </div>
  );
}
