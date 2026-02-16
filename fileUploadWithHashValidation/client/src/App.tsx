import { useMemo, useState } from "react";
import "./App.css";

const UPLOAD_URL = "http://localhost:3000/upload";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<{ filename: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileLabel = useMemo(() => {
    if (!file) return "No file selected";
    const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
    return `${file.name} • ${sizeMb} MB`;
  }, [file]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setResult(null);
    const selected = event.target.files?.[0] ?? null;
    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file || isUploading) return;

    setIsUploading(true);
    setError(null);
    setResult(null);

    try {

      const buffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);

      const formData = new FormData();
      formData.append("video", file);

      const response = await fetch(UPLOAD_URL, {
        method: "POST",
        body: formData,
        headers: {
          "X-File-Hash": Array.from(new Uint8Array(hashBuffer))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join(""),
        },
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Upload failed");
      }

      const data = (await response.json()) as { filename: string };
      setResult(data);
      setFile(null);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Upload failed"
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>MyTube Uploader</h1>
        <p>Upload a video file to the local server.</p>
      </header>

      <section className="upload-card">
        <label className="file-input">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
          />
          <span>Choose video</span>
        </label>

        <div className="file-meta">{fileLabel}</div>

        <button
          className="upload-button"
          onClick={handleUpload}
          disabled={!file || isUploading}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>

        {result && (
          <div className="status success">
            Uploaded as <strong>{result.filename}</strong>
          </div>
        )}

        {error && <div className="status error">{error}</div>}
      </section>
      {result && (
        <>
          <video controls src={`http://localhost:3000/stream/${result.filename}`} width="800" />
          <a href={`http://localhost:3000/download/${result.filename}`} download>
            <button>Download</button>
          </a>
        </>
      )}
    </div>
  );
}

export default App;
