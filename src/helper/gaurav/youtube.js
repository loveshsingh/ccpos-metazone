import constant from '../constants/constant.json';

/**
 * Get Youtube video ID from Youtube URL
 * @param {string} youtubeUrl
 * @returns {string}
 */
export function getYoutubeId(youtubeUrl) {
  let youtubeId = '';
  if (!youtubeUrl) return youtubeId;
  let url = new URL(youtubeUrl);
  if (url.searchParams.get('v')) {
    youtubeId = url.searchParams.get('v');
  }
  return youtubeId;
}

/**
 * Format Youtube embed URL with Youtube ID
 * @param {string} youtubeId
 * @returns {string|`https://www.youtube.com/embed/${string}`}
 */
export function formatYoutubeEmbedUrl(youtubeId) {
  let youtubeEmbedUrl = '';
  if (!youtubeId) return youtubeEmbedUrl;
  youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeId}`;
  return youtubeEmbedUrl;
}

/**
 * Get embedded video ID from video URL
 * eg. Wistia - (https://support.wistia.com/medias/h1z3uqsjal)
 * eg. Vimeo - (https://vimeo.com/403530213)
 * @param {string} embedUrl
 * @param {string} videoType
 * @returns {string}
 */
export function getEmbeddedId(embedUrl, videoType) {
  let embedID = '';
  if (!embedUrl) return embedUrl;
  switch (videoType) {
    case constant.UPLOAD.TYPE.PROJECT_MEDIA_VIMEO:
      embedID = embedUrl.split('/')[embedUrl.split('/').length - 1];
      break;
    case constant.UPLOAD.TYPE.PROJECT_MEDIA_WISTIA:
      embedID = embedUrl.split('/')[embedUrl.split('/').length - 1];
      break;
    default:
  }
  return embedID;
}

/**
 * Format Vimeo embed URL with Vimeo ID
 * @param {string} vimeoId
 * @returns {string|`https://player.vimeo.com/video/${string}`}
 */
export function formatVimeoEmbedUrl(vimeoId) {
  let vimeoEmbedUrl = '';
  if (!vimeoId) return vimeoEmbedUrl;
  vimeoEmbedUrl = `https://player.vimeo.com/video/${vimeoId}`;
  return vimeoEmbedUrl;
}

/**
 * Format Vimeo filename in correct format
 * @param {string} vimeoId
 * @returns {string|`https://vimeo.com/${string}`}
 */
export function formatVimeoFilename(vimeoId) {
  let vimeoEmbedUrl = '';
  if (!vimeoId) return vimeoEmbedUrl;
  vimeoEmbedUrl = `https://vimeo.com/${vimeoId}`;
  return vimeoEmbedUrl;
}

/**
 * Format Wistia embed URL with Wistia ID
 * @param {string} wistiaId
 * @returns {string|`//fast.wistia.net/embed/iframe/${string}`}
 */
export function formatWistiaEmbedUrl(wistiaId) {
  let wistiaEmbedUrl = '';
  if (!wistiaId) return wistiaEmbedUrl;
  wistiaEmbedUrl = `//fast.wistia.net/embed/iframe/${wistiaId}`;
  return wistiaEmbedUrl;
}
