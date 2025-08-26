import type { Component } from "solid-js";
import { useNavigate } from "@solidjs/router";

const LandingPage: Component = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/app");
  };

  return (
    <div class="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div class="container mx-auto px-4 py-16">
        <header class="flex justify-between items-center mb-16">
          <div class="flex items-center">
            <div class="text-3xl font-bold">SoundTube</div>
          </div>
        </header>

        <div class="flex flex-col md:flex-row items-center justify-between gap-8">
          <div class="md:w-1/2">
            <h1 class="text-5xl font-bold mb-4">
              Download YouTube Audio with Ease
            </h1>
            <p class="text-xl mb-8">
              Transform any YouTube video into high-quality MP3 audio in
              seconds. No registration, no limits, completely free.
            </p>
            <button
              onclick={handleGetStarted}
              class="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg"
            >
              Get Started
            </button>
          </div>
          <div class="md:w-1/2">
            <div class="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl">
              <img
                src="/594.jpg"
                alt="SoundTube Preview"
                class="rounded-2xl w-full opacity-90"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div class="bg-gray-900 py-20">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-12">
            Why Choose SoundTube?
          </h2>

          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-gray-900 rounded-2xl p-6 backdrop-blur-md">
              <div class="text-4xl mb-4">🎵</div>
              <h3 class="text-xl font-bold mb-2">High Quality Audio</h3>
              <p>
                Download crystal clear MP3 files from any YouTube video,
                including music, podcasts, and more.
              </p>
            </div>

            <div class="bg-gray-900 rounded-2xl p-6 backdrop-blur-md">
              <div class="text-4xl mb-4">⚡</div>
              <h3 class="text-xl font-bold mb-2">Fast & Simple</h3>
              <p>
                Just paste your YouTube URL and download. No complicated options
                or technical knowledge required.
              </p>
            </div>

            <div class="bg-gray-900 rounded-2xl p-6 backdrop-blur-md">
              <div class="text-4xl mb-4">🔒</div>
              <h3 class="text-xl font-bold mb-2">No Login Required</h3>
              <p>
                Use SoundTube without creating an account. No personal
                information collected, ever.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div class="container mx-auto px-4 py-20 bg-black">
        <h2 class="text-3xl font-bold text-center mb-12">How It Works</h2>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="flex flex-col items-center text-center">
            <div class="bg-indigo-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">
              1
            </div>
            <h3 class="text-xl font-bold mb-2">Paste YouTube URL</h3>
            <p>
              Copy any YouTube video link and paste it into SoundTube's input
              field.
            </p>
          </div>

          <div class="flex flex-col items-center text-center">
            <div class="bg-indigo-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">
              2
            </div>
            <h3 class="text-xl font-bold mb-2">Preview Thumbnail</h3>
            <p>
              Verify you've got the right video with the automatic thumbnail
              preview.
            </p>
          </div>

          <div class="flex flex-col items-center text-center">
            <div class="bg-indigo-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">
              3
            </div>
            <h3 class="text-xl font-bold mb-2">Download MP3</h3>
            <p>
              Click the download button and save your high-quality MP3 file.
            </p>
          </div>
        </div>

        <div class="text-center mt-12">
          <button
            onclick={handleGetStarted}
            class="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg"
          >
            Try It Now
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div class="bg-gray-900 py-20">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div class="max-w-3xl mx-auto space-y-6">
            <div class="bg-black border border-gray-800 rounded-xl p-6">
              <h3 class="text-xl font-bold mb-2">
                Is SoundTube completely free?
              </h3>
              <p>
                Yes, SoundTube is 100% free to use with no hidden fees or
                premium tiers.
              </p>
            </div>

            <div class="bg-black border border-gray-800 rounded-xl p-6">
              <h3 class="text-xl font-bold mb-2">
                What types of YouTube videos can I download?
              </h3>
              <p>
                You can download audio from any YouTube video, including regular
                videos, music videos, and shorts.
              </p>
            </div>

            <div class="bg-black border border-gray-800 rounded-xl p-6">
              <h3 class="text-xl font-bold mb-2">
                Is there a limit to how many files I can download?
              </h3>
              <p>
                No, there's no limit to the number of files you can download
                using SoundTube.
              </p>
            </div>

            <div class="bg-black border border-gray-800 rounded-xl p-6">
              <h3 class="text-xl font-bold mb-2">
                What audio quality do I get?
              </h3>
              <p>
                SoundTube extracts audio at the highest quality available from
                the source video.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer class="bg-black border-t border-gray-800 py-8">
        <div class="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} SoundTube. All rights reserved.</p>
          <p class="text-gray-500 mt-2 text-sm">
            SoundTube is a tool for personal use only. Please respect copyright
            laws.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
