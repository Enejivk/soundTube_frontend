from fastapi import FastAPI, Form
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import yt_dlp
import os
import uuid
import re
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def sanitize_filename(name):
    return re.sub(r'[\\/*?:"<>|]', "_", name)

@app.post("/download_audio/")
async def download_audio(url: str = Form(...)):
    # return FileResponse("da0e48ab-f53e-4c22-b702-0af7e5967c3b.mp3.mp3", media_type="audio/mpeg", filename="testing.mp3")
    # Step 1: Get info first (no download)
    with yt_dlp.YoutubeDL({}) as ydl:
        info = ydl.extract_info(url, download=False)
        title = info.get('title', 'music')
        safe_title = sanitize_filename(title)
        output_filename = f"{safe_title}.mp3"

    # Step 2: Download with sanitized filename
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': safe_title,  # No extension, ffmpeg will add .mp3
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])

    return FileResponse(output_filename, media_type="audio/mpeg", filename=output_filename)

if __name__ == '__main__':
    import uvicorn

    uvicorn.run("main:app", reload=True)