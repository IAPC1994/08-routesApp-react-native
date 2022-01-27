import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../screens/LoadingScreen';
import { FabIcon } from './FabIcon';



interface Props {
    markers?: Marker[];
}

export const Maps = ({ markers }: Props) => {

    const [showPolyline, setShowPolyline] = useState(true);

    const { hasLocation, initialPosition, getCurrentLocation, followUserLocation, userLocation, stopFollowUserLocation, routeLines } = useLocation();

    const following = useRef<boolean>(true);

    const mapViewRef = useRef<MapView>();

    const { latitude, longitude } = initialPosition;

    const centerPosition = async() => {
        const location = await getCurrentLocation();

        following.current = true;

        mapViewRef.current?.animateCamera({
            center: location
        });
    }

    useEffect(() => {
        followUserLocation();

        return () => {
            stopFollowUserLocation();
        }
    }, []);

    useEffect(() => {

        if( !following.current ) return;

        const { latitude, longitude } = userLocation;
        mapViewRef.current?.animateCamera({
            center: {
                latitude, longitude
            }
        });
    }, [ userLocation ]);
    
    

    if( !hasLocation ){
        return <LoadingScreen />
    }

    return (
        <>
            <MapView
                ref={ (element) => mapViewRef.current = element! }
                style={{ flex: 1}}
                provider={ PROVIDER_GOOGLE }
                showsUserLocation
                initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
                onTouchStart={ () => following.current = false }
            >
                {
                    showPolyline && (
                        <Polyline 
                            coordinates={ routeLines }
                            strokeColor='black'
                            strokeWidth={ 3 }
                        />
                    )
                }
                
                {/* <Marker
                    image={ require('../assets/custom-marker.png')}
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    title="Marker Title"
                    description="Marken Description"
                /> */}
            </MapView>

            <FabIcon 
                iconName='compass-outline'
                onPress={ centerPosition }
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20
                }} 
            />

            <FabIcon 
                iconName='brush-outline'
                onPress={ () => setShowPolyline( !showPolyline ) }
                style={{
                    position: 'absolute',
                    bottom: 80,
                    right: 20
                }} 
            />
        </>
    );
};
