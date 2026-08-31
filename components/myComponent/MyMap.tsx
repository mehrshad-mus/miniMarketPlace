"use client"

import { useRef, useState } from "react"

import { Map } from "@neshan-maps-platform/ol"
import Feature from "@neshan-maps-platform/ol/Feature"
import Point from "@neshan-maps-platform/ol/geom/Point"
import VectorLayer from "@neshan-maps-platform/ol/layer/Vector"
import VectorSource from "@neshan-maps-platform/ol/source/Vector"
import Style from "@neshan-maps-platform/ol/style/Style"
import Icon from "@neshan-maps-platform/ol/style/Icon"
import { toLonLat } from "@neshan-maps-platform/ol/proj"

import NeshanMap, {
    NeshanMapRef,
} from "@neshan-maps-platform/react-openlayers"
import { useMutation } from "@tanstack/react-query"
import { address } from "@/lib/queries"
import { useRouter } from "next/navigation"


const MyMap = () => {

    const mapRef = useRef<NeshanMapRef | null>(null)
    const markerRef = useRef<Feature<Point> | null>(null)

    const [location, setLocation] = useState<{
        latitude: number
        longitude: number
    } | null>(null)

    const router = useRouter()
    
    const {mutate , isPending , isError} = useMutation({
        mutationKey : ["createAddress"],
        mutationFn : address.createAddress,
        onSuccess : () => {
            router.refresh()
        }
    })

    const onInit = (map: Map) => {
        map.setMapType("dreamy")
        const svg = `
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 16 16"
            >
                <path
                    fill="#dc2626"
                    d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"
                />
            </svg>
        `

        const svgUrl =
            `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`


        const marker = new Feature<Point>({
            geometry: new Point(
                map.getView().getCenter()!
            ),
        })


        marker.setStyle(
            new Style({
                image: new Icon({
                    src: svgUrl,
                    anchor: [0.5, 1],

                    anchorXUnits: "fraction",
                    anchorYUnits: "fraction",

                    scale: 1,
                }),
            })
        )


        markerRef.current = marker

        const vectorSource = new VectorSource({
            features: [],
        })


        vectorSource.addFeature(marker)


        const vectorLayer = new VectorLayer({
            source: vectorSource,
        })

        map.addLayer(vectorLayer)

        map.on("singleclick", (event) => {

            const coordinate = event.coordinate

            marker.setGeometry(
                new Point(coordinate)
            )

            const [longitude, latitude] =
                toLonLat(coordinate)

            setLocation({
                latitude,
                longitude,
            })

            mutate({
                latitude,
                longitude
            })
        })
    }


    return (
        <div className="w-full">
            <div className="w-full h-100">
                <NeshanMap
                    ref={mapRef}
                    className="w-full h-full"
                    mapKey="web.d1f6657ad2bd43ed8360dee188b2a246"
                    center={{
                        latitude: 35.7665394,
                        longitude: 51.4749824,
                    }}
                    zoom={14}
                    onInit={onInit}
                />
            </div>

            {location && (
                <div className="mt-4 p-4 rounded-lg border">
                    <p>
                        Latitude: {location.latitude}
                    </p>
                    <p>
                        Longitude: {location.longitude}
                    </p>
                </div>
            )}
        </div>
    )
}
export default MyMap