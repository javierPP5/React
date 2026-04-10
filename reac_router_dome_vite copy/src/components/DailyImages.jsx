export default function DailyImage({
  images,
  alt = "Imagen diaria",
  className = "",
  testDate = null,
}) {
  const getDailyImage = () => {
    if (!images || images.length === 0) {
      return "/daily-image.jpg";
    }

    //const today = new Date();
    const today = testDate ? new Date(testDate) : new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / 86400000);
    const index = dayOfYear % images.length;

    return images[index];
  };

  return <img src={getDailyImage()} alt={alt} className={className} />;
}