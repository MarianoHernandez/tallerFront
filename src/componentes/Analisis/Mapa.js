import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useSelector } from "react-redux";

delete L.Icon.Default.prototype._getIconUrl;

//sacar los default
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Mapa = () => {

    const countrys = useSelector(state => state.country.countrys);
    const people = useSelector(state => state.people.peoples);

    const peopleCounts = countrys.map(country => {
        const countryPeople = people.filter(person => person.departamento === country.id);
        return {
            cantidad:countryPeople.length,
            ...country
        }
    });
    return (
        <div className='card'>
            <MapContainer center={[-33, -56]} zoom={7} scrollWheelZoom={false} style={{ height: "400px", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {peopleCounts.map((country) => <Marker key={country.id} position={[country.latitud, country.longitud]}>
                    <Popup>
                        <b>{country.cantidad}</b> Personas censadas.
                    </Popup>
                </Marker>)}
            </MapContainer>
        </div>
    )
}

export default Mapa