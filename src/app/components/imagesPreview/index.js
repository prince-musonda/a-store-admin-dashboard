import Image from "next/image";

export default function ImagesPreview({ file }) {
  // convent selected file to urls that can be used
  // by the images element
  if (!file) {
    return;
  }
  const image = URL.createObjectURL(file);
  return <Image src={image} width={150} height={150} alt="product image" />;
}
