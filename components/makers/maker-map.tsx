"use client"

import { useEffect, useRef } from "react"
import "leaflet/dist/leaflet.css"
import type { Maker } from "@/lib/data"

// 東京23区の中心付近
const CENTER: [number, number] = [35.69, 139.75]

export const MakerMap = ({
  makers,
  className = "h-96",
}: {
  makers: Maker[]
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let map: import("leaflet").Map | undefined
    let cancelled = false
    import("leaflet").then((L) => {
      if (cancelled || !ref.current) return
      map = L.map(ref.current, { scrollWheelZoom: false }).setView(CENTER, 11)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map)
      const points = makers.filter((m) => m.latitude && m.longitude)
      for (const m of points) {
        const popup = document.createElement("a")
        popup.href = `/makers/${m.id}/`
        popup.textContent = m.name
        L.circleMarker([m.latitude!, m.longitude!], {
          radius: 8,
          color: m.category === "distillery" ? "#b4532a" : "#1c1b19",
          fillOpacity: 0.8,
        })
          .bindPopup(popup)
          .addTo(map)
      }
      if (points.length === 1)
        map.setView([points[0].latitude!, points[0].longitude!], 15)
      else if (points.length > 1)
        map.fitBounds(
          points.map((m) => [m.latitude!, m.longitude!]),
          {
            padding: [40, 40],
            maxZoom: 14,
          }
        )
    })
    return () => {
      cancelled = true
      map?.remove()
    }
  }, [makers])

  return (
    <div
      ref={ref}
      role="region"
      aria-label="醸造所・蒸留所の地図"
      className={`z-0 w-full bg-line ${className}`}
    />
  )
}
