import React from "react";
import { useState, useEffect } from 'react';
import useSWR from 'swr'
import Map from '../components/map'
import Panel from '../components/panel'

export default function Index(){
  const citiesViewport = {
    'paris': { latitude: 48.856614, longitude: 2.3522219, zoom: 12 },
    'lyon': { latitude: 45.750000, longitude: 4.850000, zoom: 12 },
    'stetienne': { latitude: 45.439695, longitude: 4.3871779, zoom: 12 }
  }
    
  const [location, setLocation] = useState([]);
  const [city, setCity] = useState('paris');
  const [viewport, setViewport] = useState(citiesViewport[city]);
  const [searchMode, setSearchMode] = useState('bike');
  
  useEffect(() => {
    setViewport(citiesViewport[city])
  }, [city])
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
        setLocation([pos.coords.latitude, pos.coords.longitude])
    }, console.log);
  }, [])
  
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR(`/api/stations/search?city=${city}&mode=${searchMode}&location=${location.join(',')}`, fetcher)
  
  const context = {
    ...citiesViewport,
    viewport,
    setViewport,
    city,
    setCity, 
    searchMode,
    setSearchMode,
    data,
    error
  }
  
  return (
    <>
      <Map context={context} />
      <Panel context={context} />
    </>
  );
}