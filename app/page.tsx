import React from "react";

async function getLatestWindowAndLinuxApp(
  owner: string,
  repo: string
): Promise<{ win: string; linux: string }> {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch latest release: ${response.statusText}`);
    }

    const releaseData = await response.json();
    const assets = releaseData.assets;

    if (assets.length === 0) {
      throw new Error("No assets found for the latest release.");
    }
    return {
      win: assets.find((asset: any) => asset.name.endsWith(".exe"))
        .browser_download_url,
      linux: assets.find((asset: any) => asset.name.endsWith(".deb"))
        .browser_download_url,
    };
  } catch (error) {
    throw error;
  }
}

export default async function Home() {
  const { linux, win } = await getLatestWindowAndLinuxApp(
    "ahsan722505",
    "subtify-releases"
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-black">
          AI Subtitle Creator
        </h1>
        <p className="text-lg text-gray-700">
          Create audio/video subtitles with AI
        </p>
      </header>

      <div className="flex flex-col items-center">
        <p className="text-xl mb-8 text-black">Download for your platform:</p>

        <div className="flex space-x-4">
          <a
            href={linux}
            className="bg-blue-500 text-center text-white py-2 px-4 rounded shadow hover:bg-blue-600"
          >
            Download for Linux
          </a>
          <a
            href={win}
            className="bg-blue-500 text-center text-white py-2 px-4 rounded shadow hover:bg-blue-600"
          >
            Download for Windows
          </a>
        </div>
      </div>
    </div>
  );
}
