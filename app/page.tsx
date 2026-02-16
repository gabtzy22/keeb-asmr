'use client';

import { useState } from 'react';
import Keyboard from './components/Keyboard';
import SoundProfileDropdown from './components/SoundProfileDropdown';
import LayoutSelector from './components/LayoutSelector';
import ThemeToggle from './components/ThemeToggle';
import VolumeControl from './components/VolumeControl';
import { SOUND_PROFILES, KEYBOARD_SIZES } from './lib/constants';

export default function Home() {
  const [selectedProfileId, setSelectedProfileId] = useState('thock');
  const [selectedLayoutId, setSelectedLayoutId] = useState('60');
  const [volume, setVolume] = useState(0.5);

  const selectedProfile = SOUND_PROFILES.find(
    (p) => p.id === selectedProfileId,
  )!;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">

      <div className="flex flex-col items-center gap-3">
        <h1 className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
          Keeb.ASMR
        </h1>
        <p className="text-sm text-zinc-500">
          A bored GabTzy project.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <SoundProfileDropdown
          profiles={SOUND_PROFILES}
          selectedId={selectedProfileId}
          onSelect={(profile) => setSelectedProfileId(profile.id)}
        />
        <LayoutSelector
          sizes={KEYBOARD_SIZES}
          selectedId={selectedLayoutId}
          onSelect={(size) => setSelectedLayoutId(size.id)}
        />
        <VolumeControl
          volume={volume}
          onVolumeChange={setVolume}
        />
        <ThemeToggle />
      </div>

      <Keyboard
        soundFile={selectedProfile.soundFile}
        layoutId={selectedLayoutId}
        volume={volume}
      />

      <p className="animate-pulse text-xs tracking-wide text-zinc-400 dark:text-zinc-600">
        Press any key or click the keyboard…
      </p>
    </div>
  );
}
