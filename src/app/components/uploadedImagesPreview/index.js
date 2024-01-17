import Image from "next/image";
export default function UploadImagesPreview({ images }) {
  return (
    <div className="flex gap-1">
      {images.map((imageUrl) => {
        return (
          <div className="border-2 border-gray-500">
            <Image
              src={imageUrl}
              width={80}
              height={80}
              key={imageUrl}
              alt="product image"
            />
          </div>
        );
      })}
    </div>
  );
}
