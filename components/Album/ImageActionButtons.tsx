import { useState } from 'react';
import * as IoIcons from 'react-icons/io5';
import { AlbumItem } from 'app/Models';
import downloadPhoto from '@utils/old/downloadPhoto';
import { getImagePublicUrl, getImageOriginalUrl } from '@utils/API';

interface ImageActionButtonsProps {
  item: AlbumItem;
  index: number;
}

export default function ImageActionButtons({ item, index }: ImageActionButtonsProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async (item: AlbumItem) => {
    if (downloading) return;
    
    setDownloading(true);
    try {
      // Get public URL from API
      const url = await getImagePublicUrl(item.image);
      const filename = `image-${index + 1}.${item.video ? 'mp4' : 'jpg'}`;
      
      // Download the file
      downloadPhoto(url, filename);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback to direct download
      const fallbackUrl = await getImageOriginalUrl(item.image, item.video);
      downloadPhoto(fallbackUrl, `image-${index + 1}.${item.video ? 'mp4' : 'jpg'}`);
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async (item: AlbumItem) => {
    try {
      // Get public URL from API
      const url = await getImagePublicUrl(item.image);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Share failed:', error);
      // Fallback to direct URL
      const fallbackUrl = await getImageOriginalUrl(item.image, item.video);
      window.open(fallbackUrl, '_blank');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleShare(item)}
        className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
        title="Open fullsize version"
      >
        <IoIcons.IoShareOutline className="h-5 w-5" />
      </button>
      <button
        onClick={() => handleDownload(item)}
        disabled={downloading}
        className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white disabled:opacity-50"
        title="Download fullsize version"
      >
        {downloading ? (
          <IoIcons.IoHourglass className="h-5 w-5 animate-spin" />
        ) : (
          <IoIcons.IoArrowDownCircleOutline className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}