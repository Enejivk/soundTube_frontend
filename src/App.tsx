import { AiOutlineArrowUp } from "solid-icons/ai";
import { FaBrandsGithub, FaBrandsLinkedin } from "solid-icons/fa";
import { FaSolidHeadphones } from "solid-icons/fa";
import { RiMediaMusicFill } from "solid-icons/ri";
import { createSignal } from "solid-js";
import axios from "axios";
import { z } from "zod";

const App = () => {
  const [url, setUrl] = createSignal("");
  const [error, setError] = createSignal("");
  const [loading, setLoading] = createSignal(false);

  function getYoutubeThumbnail(url: string, quality = "hqdefault") {
    try {
      const parsedUrl = new URL(url);

      // Case 1: youtu.be short link
      if (parsedUrl.hostname === "youtu.be") {
        const videoId = parsedUrl.pathname.slice(1);
        return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
      }

      // Case 2: youtube.com/watch?v=ID
      if (parsedUrl.searchParams.has("v")) {
        const videoId = parsedUrl.searchParams.get("v");
        return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
      }

      // Case 3: embed link
      const paths = parsedUrl.pathname.split("/");
      const videoId = paths[paths.length - 1];
      return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
    } catch (e) {
      console.error("Invalid YouTube URL:", url);
      return null;
    }
  }

  const youtubeSchema = z
    .string()
    .url()
    .refine(
      (val) =>
        val.includes("youtube.com/watch?v=") ||
        val.includes("youtu.be/") ||
        val.includes("https://youtube.com/shorts/"),
      {
        message: "Please enter a valid YouTube URL",
      }
    );

  const handleOnsubmit = async () => {
    setError("");
    const result = youtubeSchema.safeParse(url());
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    } else {
      setError("");
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("url", url());

    try {
      const response = await axios.post(
        "http://localhost:8000/download_audio/",
        formData,
        {
          responseType: "blob",
        }
      );

      const blob = response.data;
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "music.mp3";
      document.body.appendChild(a);

      a.click();
      a.remove();
    } catch (err) {
      setError("Failed to download audio. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (e: InputEvent) => {
    const input = e.currentTarget as HTMLInputElement;
    const value = input.value;
    const result = youtubeSchema.safeParse(value);
    if (!result.success) {
      setError(result.error.issues[0].message);
    } else {
      setError("");
    }
    setUrl(value);
  };

  return (
    <div class="relative w-full h-screen flex items-center justify-center flex-col gap-4 border-white border">
      <div class="bg-[url('/594.jpg')] absolute inset-0 bg-center bg-cover blur-lg brightness-100 -z-10"></div>

      {/* App Logo/Brand */}
      <div class="absolute top-6 left-6">
        <div class="flex flex-col gap-1">
          <div class="app-logo bg-gradient-to-r from-gray-800 to-gray-700 text-gray-200 p-2 px-4 rounded-lg shadow-lg flex items-center gap-2">
            <div class="logo-icon-container relative">
              <FaSolidHeadphones size={20} class="text-blue-400" />
              <RiMediaMusicFill
                size={12}
                class="absolute -top-1 -right-1 text-red-400"
              />
            </div>
            <div class="logo-text">
              <span class="font-extrabold text-xl tracking-tight">
                <span class="text-blue-400">Sound</span>
                <span class="text-red-400">Tube</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div class="absolute top-6 right-6 flex gap-4">
        <a
          href="https://github.com/Enejivk/soundTube_backend.git"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          class="social-icon github-icon bg-gray-800 text-gray-200 p-3 rounded-full hover:bg-gray-700 transition-all duration-300 shadow-lg flex items-center justify-center"
        >
          <FaBrandsGithub size={22} />
        </a>
        <a
          href="https://www.linkedin.com/in/enejivic/"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
          class="social-icon linkedin-icon bg-gray-800 text-gray-200 p-3 rounded-full hover:bg-gray-700 transition-all duration-300 shadow-lg flex items-center justify-center"
        >
          <FaBrandsLinkedin size={22} />
        </a>
       
      </div>

      {/* Main Headline */}
      <div class="text-center mb-8 z-10 px-4 max-w-4xl headline-container">
        <div class="headline-overlay"></div>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-lg relative">
          YouTube to MP3 Converter
        </h1>
        <p class="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-md leading-relaxed">
          Download high-quality audio from any YouTube video with just one click
        </p>
      </div>

      <div class="h-70 w-[90vw] md:w-[47vw] lg:[30vw] bg-gray-900 rounded-4xl flex flex-col items-center justify-center gap-4 p-3">
        <div class="w-[100%] h-[50%] rounded-t-4xl bg-gray-800 flex items-center justify-center flex-col gap-4">
          <h1 class="h-1/3 text-2xl text-gray-300 font-bold">
            Enter your Youtube url
          </h1>
          <p class="text-gray-500 text-center">
            Paste a YouTube video URL to download its audio as MP3.
          </p>
        </div>

        <div class="h-1/3 w-[100%] flex flex-col gap-2">
          <input
            oninput={handleOnChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleOnsubmit();
              }
            }}
            value={url()}
            type="text"
            name="url"
            id="url"
            autocomplete="off"
            autocorrect="off"
            class="w-[100%] h-full outline-none text-gray-400 px-8 placeholder:text-gray-700"
            placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
          />
          {error() && <p class="text-red-500 text-sm text-center">{error()}</p>}
        </div>
        <div class="h-1/3 w-[100%] flex items-center justify-end">
          <button
            class="bg-gray-300 rounded-full p-4 hover:bg-gray-400 transition-all duration-300 ease-in-out flex items-center justify-center"
            classList={{
              "bg-gray-400 cursor-not-allowed opacity-50": loading() || !url(),
            }}
            onclick={handleOnsubmit}
            disabled={loading()}
          >
            <AiOutlineArrowUp />
          </button>
        </div>
      </div>
      <div class="h-40">
        {url() && (
          <img
            src={getYoutubeThumbnail(url()) || undefined}
            alt=""
            class="h-full rounded"
          />
        )}

        {loading() && (
          <div class="flex flex-col items-center justify-center w-full mt-4">
            <div class="flex gap-1 h-8 items-end">
              <div
                class="animate-bar bg-blue-400 w-2 rounded"
                style="height: 60%"
              ></div>
              <div
                class="animate-bar bg-blue-500 w-2 rounded"
                style="height: 80%"
              ></div>
              <div
                class="animate-bar bg-blue-600 w-2 rounded"
                style="height: 100%"
              ></div>
              <div
                class="animate-bar bg-blue-500 w-2 rounded"
                style="height: 80%"
              ></div>
              <div
                class="animate-bar bg-blue-400 w-2 rounded"
                style="height: 60%"
              ></div>
            </div>
            <span class="text-gray-900 text-xs mt-2 animate-pulse p">
              Preparing your music...
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
