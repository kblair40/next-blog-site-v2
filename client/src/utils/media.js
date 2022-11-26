import { getStrapiURL } from "./api";

export function getStrapiMedia(media) {
  if (!media || !media.data) {
    console.log("\n\nNO DATA ON MEDIA OBJECT:", media, "\n\n");
    return "";
  }

  const { url } = media.data.attributes;
  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
  return imageUrl;
}
