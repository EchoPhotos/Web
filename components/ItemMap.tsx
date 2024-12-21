'use client'

import { useEffect, useState } from "react";
import ngeohash from "ngeohash";
import { AlbumItem } from "@/utils/types";
import { Marker, Map, CoordinateRegion } from "mapkit-react";
import { current } from "@/utils/ClientConfiguration";

type Annotation = {
  latitude: number;
  longitude: number;
  item: AlbumItem;
};


function ItemMap({ items, initialRegion, onItemSelect }: { items: AlbumItem[], initialRegion: CoordinateRegion, onItemSelect?: (item: AlbumItem) => void}) {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  // const mapRef = useRef<mapkit.Map>(null);

  useEffect(() => {
    const decodedAnnotations = items.map((item) => {
      if (!item.contentLocationHash) {
        return undefined;
      }
      const { latitude, longitude } = ngeohash.decode(item.contentLocationHash);
      return {
        latitude,
        longitude,
        item,
      } as Annotation;
    });

    const annotations: Annotation[] = [];

    for (const annotation of decodedAnnotations) {
      if (annotation) {
        annotations.push(annotation);
      }
    }
    setAnnotations(annotations);
  }, [items]);

  return (
    <Map token={current.appleMapsToken} initialRegion={initialRegion}>
      {annotations.map((annotation, index) => (
        <Marker
          key={index}
          latitude={annotation.latitude}
          longitude={annotation.longitude}
          glyphText={"📸"}
          color="#555"
          onSelect={() => {
            onItemSelect?.(annotation.item);
          }}
        />
      ))}
    </Map>
  );
}

export default ItemMap;
import { useRef } from "react";
