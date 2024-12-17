import React, { useEffect, useState } from 'react';
import { SpriteAnimator } from 'react-sprite-animator';

// Tipe props yang diterima
interface AnimationProps {
  roleId: number;  // ID dari role yang ingin dipanggil animasinya
  animationType: 'attack' | 'breath';  // Jenis animasi yang dipilih
}

const Animation: React.FC<AnimationProps> = ({ roleId, animationType }) => {
  const [animationPath, setAnimationPath] = useState<string | null>(null);

  useEffect(() => {
    // Ambil animasi dari backend sesuai dengan animationType
    const fetchAnimation = async () => {
      try {
        const response = await fetch(`/api/roles/${roleId}/animation?animation_type=${animationType}`);
        const data = await response.json();
        
        if (data.animation) {
          setAnimationPath(data.animation);
        } else {
          console.error('Animasi tidak ditemukan');
        }
      } catch (error) {
        console.error('Terjadi kesalahan saat mengambil animasi:', error);
      }
    };

    fetchAnimation();
  }, [roleId, animationType]);

  return (
    <div className="animation-container">
      {animationPath ? (
        <SpriteAnimator
          sprite={animationPath}  // Path animasi dari backend
          width={100}             // Lebar gambar sprite
          height={100}            // Tinggi gambar sprite
          fps={10}                // Kecepatan animasi
        />
      ) : (
        <p>Loading animation...</p>
      )}
    </div>
  );
};

export default Animation;
