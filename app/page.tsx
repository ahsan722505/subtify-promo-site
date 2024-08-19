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
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Navigation */}
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold mb-4 sm:mb-0">Subtify</h1>
          <div className="flex flex-col sm:flex-row items-center">
            <a href="#features" className="mb-2 sm:mb-0 sm:mr-4">
              Features
            </a>
            <a href="#how-it-works" className="mb-2 sm:mb-0 sm:mr-4">
              How It Works
            </a>
            <a
              href="https://github.com/ahsan722505/subtify-app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center mb-2 sm:mb-0"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-blue-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            Create AI-Powered Subtitles with Ease
          </h1>
          <p className="text-xl mb-8">
            Import, Generate, Edit, and Style Your Subtitles in Minutes
          </p>
          <div className="flex justify-center space-x-4 px-4">
            <DownloadButton platform="Windows" icon="🪟" url={win} />
            <DownloadButton platform="Linux" icon="🐧" url={linux} />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="AI-Powered Subtitles"
              description="Generate accurate subtitles using advanced AI technology"
              icon="🤖"
            />
            <FeatureCard
              title="Multiple Import Options"
              description="Import audio/video files or existing subtitle files"
              icon="📁"
            />
            <FeatureCard
              title="Advanced Styling"
              description="Customize fonts, colors, and positioning of your subtitles"
              icon="🎨"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-gray-200 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Step number={1} title="Import Your Media">
              Upload your audio or video file to get started.
            </Step>
            <Step number={2} title="Generate or Add Subtitles">
              Use AI to create subtitles, upload existing ones, or type
              manually.
            </Step>
            <Step number={3} title="Edit and Style">
              Fine-tune your subtitles and apply custom styling options.
            </Step>
          </div>
        </div>
      </section>

      {/* App Screenshot */}
      <section className="py-20">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-8">See Subtify in Action</h2>
          <div className="grid grid-cols-1 gap-8">
            <AppScreenshot
              src="https://github.com/user-attachments/assets/3881abd7-ff81-4067-9a4d-cdef5f42046c"
              alt="Subtify main interface"
            />
            <AppScreenshot
              src="https://github.com/user-attachments/assets/cbb56916-f5d0-483d-9827-c7c3cd131d64"
              alt="AI subtitle generation"
            />
            <AppScreenshot
              src="https://github.com/user-attachments/assets/478c340b-7fbf-4f4d-824c-c7a81001ceba"
              alt="Subtitle styling options"
            />
          </div>
        </div>
      </section>

      {/* Styling Options */}
      <section className="bg-blue-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Styling Options
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StyleOption icon="🖋️" title="400+ Fonts" />
            <StyleOption icon="🎭" title="Custom Colors" />
            <StyleOption icon="📐" title="Adjustable Positioning" />
            <StyleOption icon="🔄" title="Rotation & Transformation" />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Create Amazing Subtitles?
          </h2>
          <p className="text-xl mb-8">
            Download Subtify now and bring your videos to life!
          </p>
          <div className="flex justify-center space-x-4">
            <DownloadButton platform="Windows" icon="🪟" url={win} />
            <DownloadButton platform="Linux" icon="🐧" url={linux} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Subtify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const FeatureCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Step = ({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: string;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="text-3xl font-bold text-blue-600 mb-4">Step {number}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{children}</p>
  </div>
);

const StyleOption = ({ icon, title }: { icon: string; title: string }) => (
  <div className="bg-white p-4 rounded-lg shadow-md text-center">
    <div className="text-3xl mb-2">{icon}</div>
    <h4 className="font-semibold">{title}</h4>
  </div>
);
const DownloadButton = ({
  platform,
  icon,
  url,
}: {
  platform: string;
  icon: string;
  url: string;
}) => (
  <a
    href={url} // Replace with actual download link
    className="bg-white text-blue-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-100 transition duration-300 flex items-center"
  >
    <span className="mr-2">{icon}</span>
    Download for {platform}
  </a>
);

const AppScreenshot = ({ src, alt }: { src: string; alt: string }) => (
  <div className="flex flex-col items-center">
    <div className="bg-gray-300 w-full aspect-video rounded-lg shadow-lg overflow-hidden">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  </div>
);
