export default function AccommodationImg({ accommodation, index = 0, className = null }) {
    if (!accommodation.photos?.length) {
        return '';
    }
    if (!className) {
        className = 'object-cover';
    }
    return (
        <img className={className} src={'http://localhost:4000/' + accommodation.photos[index]} alt="" />
    );
}